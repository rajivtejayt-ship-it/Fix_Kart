# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React/Next.js)                │
│                                                              │
│  - Browse workers by category/location                      │
│  - Create bookings                                           │
│  - Admin dashboard (approve workers, view metrics)          │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ HTTP/JSON (CORS enabled)
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                  NODE.JS BACKEND (Express.js)                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   server.js                             │ │
│  │  - Express app initialization                          │ │
│  │  - CORS middleware                                     │ │
│  │  - JSON body parser                                    │ │
│  │  - Error handling                                      │ │
│  │  - Graceful shutdown                                   │ │
│  └────────────┬──────────────────────────────────────────┘ │
│               │                                             │
│  ┌────────────▼──────────────┐                             │
│  │      Route Handlers        │                             │
│  │                            │                             │
│  │  ┌──────────────────────┐ │                             │
│  │  │  routes/workers.js   │ │                             │
│  │  │  GET  /api/Workers   │ │                             │
│  │  │  GET  /api/Workers/:id│ │                             │
│  │  │  POST /api/Workers   │ │                             │
│  │  └──────────────────────┘ │                             │
│  │                            │                             │
│  │  ┌──────────────────────┐ │                             │
│  │  │ routes/bookings.js   │ │                             │
│  │  │  POST /api/Bookings  │ │                             │
│  │  │  GET  /api/Bookings/:id│                             │
│  │  │  POST /api/Bookings/:id/release│                     │
│  │  └──────────────────────┘ │                             │
│  │                            │                             │
│  │  ┌──────────────────────┐ │                             │
│  │  │   routes/admin.js    │ │                             │
│  │  │  GET  /api/Admin/pending-approvals│                  │
│  │  │  POST /api/Admin/approve/:id│                        │
│  │  │  POST /api/Admin/reject/:id│                         │
│  │  │  GET  /api/Admin/metrics│                            │
│  │  └──────────────────────┘ │                             │
│  └────────────┬──────────────┘                             │
│               │                                             │
│  ┌────────────▼──────────────┐                             │
│  │    Prisma ORM Client       │                             │
│  │  - Type-safe queries       │                             │
│  │  - Connection pooling      │                             │
│  │  - Migrations              │                             │
│  └────────────┬──────────────┘                             │
└───────────────┼───────────────────────────────────────────┘
                │
                │ PostgreSQL Protocol
                │
┌───────────────▼───────────────────────────────────────────┐
│               POSTGRESQL DATABASE                          │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Worker Table                                        │  │
│  │  - id (PK)                                          │  │
│  │  - name, category, location                        │  │
│  │  - hourlyCharge, rating, trustScore                │  │
│  │  - isVerified, isActive                            │  │
│  │  - skillsJson, certificationsJson, portfolioJson  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Booking Table                                       │  │
│  │  - id (PK)                                          │  │
│  │  - workerId (FK → Worker)                          │  │
│  │  - customerName, customerPhone, location           │  │
│  │  - status, securityPin, escrowLocked               │  │
│  │  - bookingTime, scheduledTime                      │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

---

## Request Flow

### Example: List Verified Electricians

```
1. Frontend
   └─> GET /api/Workers?category=electrician&verifiedOnly=true

2. Express Server (server.js)
   └─> CORS check → Pass
   └─> Route to workers.js

3. Workers Router (routes/workers.js)
   └─> Parse query params: { category: "electrician", verifiedOnly: "true" }
   └─> Build Prisma where clause: { isActive: true, isVerified: true, category: "electrician" }
   └─> Execute: await prisma.worker.findMany({ where })

4. Prisma ORM
   └─> Generate SQL: SELECT * FROM "Worker" WHERE "isActive" = true AND "isVerified" = true AND "category" = 'electrician'
   └─> Send to PostgreSQL

5. PostgreSQL
   └─> Execute query
   └─> Return rows (e.g., 2 electricians)

6. Workers Router
   └─> Format response: JSON array of workers
   └─> Return HTTP 200

7. Frontend
   └─> Receive worker array
   └─> Render worker cards
```

---

## Data Flow Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. HTTP Request (GET /api/Workers)
       │
┌──────▼──────────────────────────────────────┐
│         Express Middleware Chain             │
│                                              │
│  1. cors() ──→ Allow cross-origin          │
│  2. express.json() ──→ Parse JSON body     │
│  3. Router ──→ Match route                  │
│  4. Route handler ──→ Execute logic         │
└──────┬──────────────────────────────────────┘
       │
       │ 2. Prisma Query
       │
┌──────▼──────────────────────────────────────┐
│            Prisma Client                     │
│                                              │
│  - Validate query                           │
│  - Generate SQL                              │
│  - Connection pooling                        │
└──────┬──────────────────────────────────────┘
       │
       │ 3. SQL Query
       │
┌──────▼──────────────────────────────────────┐
│          PostgreSQL Database                 │
│                                              │
│  - Execute query                            │
│  - Return result set                         │
└──────┬──────────────────────────────────────┘
       │
       │ 4. Data rows
       │
┌──────▼──────────────────────────────────────┐
│         Route Handler                        │
│                                              │
│  - Format response                          │
│  - Set status code                           │
│  - Send JSON                                 │
└──────┬──────────────────────────────────────┘
       │
       │ 5. HTTP Response (JSON)
       │
┌──────▼──────┐
│   Browser   │
└─────────────┘
```

---

## Deployment Architecture

### Render Platform

```
┌───────────────────────────────────────────────────────────┐
│                     Render.com                            │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │          Web Service (Node.js Runtime)              │ │
│  │                                                     │ │
│  │  - Runtime: Node 18+                               │ │
│  │  - Region: Oregon                                  │ │
│  │  - Plan: Free (512MB RAM)                         │ │
│  │  - Auto-scaling: Yes                               │ │
│  │  - Health check: GET /                             │ │
│  │                                                     │ │
│  │  Build Command:                                    │ │
│  │  npm install && npx prisma generate &&            │ │
│  │  npx prisma db push && npm run db:seed            │ │
│  │                                                     │ │
│  │  Start Command:                                    │ │
│  │  npm start                                         │ │
│  │                                                     │ │
│  │  Environment Variables:                            │ │
│  │  - NODE_ENV=production                            │ │
│  │  - PORT=[auto-assigned]                           │ │
│  │  - DATABASE_URL=[from database]                   │ │
│  └────────────────────┬────────────────────────────────┘ │
│                       │                                   │
│                       │ Internal network                  │
│                       │ (no public internet)              │
│                       │                                   │
│  ┌────────────────────▼────────────────────────────────┐ │
│  │         PostgreSQL Database                         │ │
│  │                                                     │ │
│  │  - Version: PostgreSQL 14                         │ │
│  │  - Plan: Free (256MB storage)                     │ │
│  │  - Backups: Daily (paid plans)                    │ │
│  │  - Connection: Internal URL                        │ │
│  │  - SSL: Required                                   │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
                       │
                       │ HTTPS
                       │
┌──────────────────────▼────────────────────────────────────┐
│                  Public Internet                          │
│                                                           │
│  URL: https://fixkart-api.onrender.com                   │
│  SSL: Auto-provisioned (Let's Encrypt)                   │
│  CDN: Render global edge network                         │
└───────────────────────────────────────────────────────────┘
```

---

## File Structure

```
backend-node/
│
├── server.js                    # Main entry point
│   ├── Import Express
│   ├── Import Prisma
│   ├── Configure middleware (CORS, JSON parser)
│   ├── Import route modules
│   ├── Register routes
│   ├── Error handling
│   └── Start server on PORT
│
├── routes/
│   ├── workers.js              # Worker endpoints
│   │   ├── GET  /api/Workers   # List workers (with filters)
│   │   ├── GET  /api/Workers/:id  # Get single worker
│   │   └── POST /api/Workers   # Create worker
│   │
│   ├── bookings.js             # Booking endpoints
│   │   ├── POST /api/Bookings  # Create booking
│   │   ├── GET  /api/Bookings/:id  # Get booking
│   │   └── POST /api/Bookings/:id/release  # Release escrow
│   │
│   └── admin.js                # Admin endpoints
│       ├── GET  /api/Admin/pending-approvals  # List pending
│       ├── POST /api/Admin/approve/:id  # Approve worker
│       ├── POST /api/Admin/reject/:id   # Reject worker
│       └── GET  /api/Admin/metrics      # Dashboard stats
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   │   ├── Worker model        # 20 fields
│   │   └── Booking model       # 13 fields
│   │
│   └── seed.js                 # Seed data
│       └── 10 workers (8 verified, 2 pending)
│
├── package.json                # Dependencies
│   ├── @prisma/client          # Database ORM
│   ├── express                 # Web framework
│   ├── cors                    # CORS middleware
│   ├── dotenv                  # Environment config
│   └── pg                      # PostgreSQL driver
│
├── .env                        # Local environment
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── render.yaml                 # Render deployment config
│
└── docs/
    ├── README.md               # Main documentation
    ├── MIGRATION_GUIDE.md      # .NET comparison
    ├── DEPLOY.md               # Deployment guide
    ├── SUMMARY.md              # Quick reference
    └── ARCHITECTURE.md         # This file
```

---

## Database Schema

### ER Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Worker                                │
├─────────────────────────────────────────────────────────────┤
│ id                 STRING   PK                               │
│ name               STRING                                    │
│ category           STRING   (electrician, plumber, etc.)    │
│ avatarUrl          STRING                                    │
│ experience         STRING                                    │
│ hourlyCharge       DECIMAL(10,2)                            │
│ availability       STRING                                    │
│ location           STRING                                    │
│ responseRate       STRING                                    │
│ rating             DECIMAL(3,2)                              │
│ reviewsCount       INTEGER                                   │
│ trustScore         INTEGER                                   │
│ skillsJson         STRING   (JSON array)                     │
│ certificationsJson STRING   (JSON array)                     │
│ portfolioJson      STRING   (JSON array)                     │
│ about              STRING                                    │
│ joinedAt           STRING   (YYYY-MM-DD)                     │
│ isVerified         BOOLEAN  DEFAULT false                    │
│ isActive           BOOLEAN  DEFAULT true                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ 1:N
                     │
┌────────────────────▼────────────────────────────────────────┐
│                        Booking                               │
├─────────────────────────────────────────────────────────────┤
│ id                 STRING   PK                               │
│ customerId         STRING                                    │
│ customerName       STRING                                    │
│ customerPhone      STRING                                    │
│ location           STRING                                    │
│ description        STRING                                    │
│ workerId           STRING   FK → Worker.id                   │
│ category           STRING                                    │
│ bookingTime        DATETIME DEFAULT now()                    │
│ scheduledTime      DATETIME NULLABLE                         │
│ baseRate           DECIMAL(10,2)                            │
│ status             STRING   (Pending, Completed, etc.)       │
│ securityPin        STRING                                    │
│ escrowLocked       BOOLEAN  DEFAULT false                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    Security Layers                          │
│                                                            │
│  1. Network Layer                                          │
│     ├── HTTPS enforced (TLS 1.2+)                         │
│     ├── SSL certificate auto-renewed                       │
│     └── DDoS protection (Render CDN)                       │
│                                                            │
│  2. Application Layer                                      │
│     ├── CORS configured (allow all origins)               │
│     ├── JSON body size limit (100kb default)              │
│     ├── Input validation on POST endpoints                 │
│     └── Error messages sanitized                           │
│                                                            │
│  3. Database Layer                                         │
│     ├── Prisma parameterized queries (SQL injection safe) │
│     ├── Connection pooling                                 │
│     ├── Internal network only (no public access)          │
│     └── SSL required for connections                       │
│                                                            │
│  4. Environment                                            │
│     ├── Secrets in environment variables                   │
│     ├── .env excluded from git                            │
│     └── Production NODE_ENV set                            │
└────────────────────────────────────────────────────────────┘
```

---

## Comparison: .NET vs Node.js Architecture

### .NET (Old Architecture)

```
Docker Container
├── .NET Runtime (512MB)
├── ASP.NET Core App
│   ├── Program.cs (entry point)
│   ├── Controllers/
│   │   ├── WorkersController.cs
│   │   ├── BookingsController.cs
│   │   └── AdminController.cs
│   ├── Models/ (C# classes)
│   ├── Data/
│   │   ├── FixKartDbContext.cs
│   │   └── DbInitializer.cs
│   └── Entity Framework Core ORM
└── SQLite (dev) / PostgreSQL (prod)

Build: 3-5 minutes (Docker image)
Deploy: Docker registry → Render
Cold start: 15-30 seconds
```

### Node.js (New Architecture)

```
Native Node.js Process
├── Node.js Runtime (256MB)
├── Express App
│   ├── server.js (entry point)
│   ├── routes/
│   │   ├── workers.js
│   │   ├── bookings.js
│   │   └── admin.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── Prisma ORM
└── PostgreSQL only

Build: 1-2 minutes (npm install)
Deploy: Git push → Render
Cold start: 5-10 seconds
```

---

## Scalability Considerations

### Current Architecture (Free Tier)
- **Max concurrent connections:** 100+
- **Database connections:** Prisma pool (default 10)
- **Request throughput:** ~200 req/sec
- **Storage:** 256MB database

### Scaling Options

#### Horizontal Scaling
```
┌─────────────────┐
│  Load Balancer  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│ Web 1 │ │ Web 2 │ ... (multiple instances)
└───┬───┘ └──┬────┘
    │        │
    └────┬───┘
         │
┌────────▼────────┐
│   PostgreSQL    │
└─────────────────┘
```

#### Vertical Scaling
- Free → Starter ($7/mo): 512MB RAM
- Starter → Standard ($25/mo): 2GB RAM, autoscaling
- Database: Mini ($7/mo) → Basic ($15/mo)

#### Optimization Options
- Add Redis caching layer
- Enable Prisma query caching
- Implement rate limiting
- Add CDN for static assets
- Database indexing (already optimal)

---

## Monitoring & Observability

```
┌────────────────────────────────────────────────────────────┐
│                    Monitoring Stack                         │
│                                                            │
│  Application Logs                                          │
│  ├── console.log() → Render logs dashboard                │
│  ├── Error traces with stack                              │
│  └── Request/response logging                              │
│                                                            │
│  Metrics (Render Dashboard)                                │
│  ├── CPU usage                                             │
│  ├── Memory usage                                          │
│  ├── Request count                                         │
│  ├── Response time                                         │
│  └── Error rate                                            │
│                                                            │
│  Database Monitoring                                       │
│  ├── Connection count                                      │
│  ├── Query performance                                     │
│  ├── Storage usage                                         │
│  └── Slow query log                                        │
│                                                            │
│  Health Checks                                             │
│  └── GET / endpoint (30-second interval)                   │
└────────────────────────────────────────────────────────────┘
```

---

## Development Workflow

```
1. Local Development
   ├── git clone repo
   ├── npm install
   ├── Setup PostgreSQL locally
   ├── Copy .env.example → .env
   ├── npm run db:generate
   ├── npm run db:push
   ├── npm run db:seed
   └── npm start

2. Make Changes
   ├── Edit routes/*.js
   ├── Test with curl/Postman
   └── Check console logs

3. Database Changes
   ├── Edit prisma/schema.prisma
   ├── npm run db:generate
   └── npm run db:push

4. Commit & Push
   ├── git add .
   ├── git commit -m "..."
   └── git push origin main

5. Automatic Deployment (Render)
   ├── Webhook triggers build
   ├── npm install
   ├── Prisma generate & migrate
   ├── Start server
   └── Health check passes

6. Monitor
   ├── Check Render logs
   ├── Test endpoints
   └── Verify metrics
```

---

## Future Enhancements

### Phase 2 (Optional)
- [ ] Add authentication (JWT or OAuth)
- [ ] Rate limiting (express-rate-limit)
- [ ] Request validation (Zod or Joi)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Logging service (Winston + Sentry)

### Phase 3 (Optional)
- [ ] Redis caching layer
- [ ] WebSocket for real-time updates
- [ ] File uploads (worker avatars)
- [ ] Email notifications (SendGrid)
- [ ] SMS notifications (Twilio)

### Phase 4 (Optional)
- [ ] GraphQL API layer
- [ ] Microservices split
- [ ] Event-driven architecture
- [ ] Message queue (RabbitMQ/Redis)

---

## Summary

This architecture provides:

✅ **Simplicity** — Native runtime, no containers  
✅ **Performance** — Fast cold starts, low memory  
✅ **Scalability** — Horizontal & vertical options  
✅ **Maintainability** — Clean separation of concerns  
✅ **Reliability** — Auto-restarts, health checks  
✅ **Security** — HTTPS, SQL injection protection  

**Perfect for a service booking platform like FixKart.**
