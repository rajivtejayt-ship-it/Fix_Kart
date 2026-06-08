# FixKart API - Node.js Backend (Dockerless)

**Native Node.js + Express + PostgreSQL backend** for FixKart service booking platform.

This is a complete rewrite of the original .NET backend, maintaining **100% API contract compatibility** with the frontend while removing all Docker dependencies for simpler PaaS deployment.

---

## 🚀 Features

- ✅ **Zero Docker** — Runs directly on Node.js runtime
- ✅ **Identical API routes** — Drop-in replacement for .NET backend
- ✅ **PostgreSQL native** — Uses Prisma ORM for type-safe queries
- ✅ **Render-ready** — One-click deployment via `render.yaml`
- ✅ **Seed data included** — 10 workers (8 verified, 2 pending)

---

## 📋 API Contract (100% Compatible)

### Workers Endpoints
- `GET /api/Workers?category=&location=&verifiedOnly=` — List workers
- `GET /api/Workers/{id}` — Get worker details
- `POST /api/Workers` — Register new worker (pending approval)

### Bookings Endpoints
- `POST /api/Bookings` — Create booking
- `GET /api/Bookings/{id}` — Get booking details
- `POST /api/Bookings/{id}/release` — Release escrow

### Admin Endpoints
- `GET /api/Admin/pending-approvals` — List pending workers
- `POST /api/Admin/approve/{id}` — Approve worker
- `POST /api/Admin/reject/{id}` — Reject & delete worker
- `GET /api/Admin/metrics` — Dashboard metrics

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- PostgreSQL 14+ ([download](https://www.postgresql.org/download/))

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/fixkart
PORT=5000
NODE_ENV=development
```

3. **Initialize database:**
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Create tables
npm run db:seed      # Seed initial data
```

4. **Start server:**
```bash
npm start            # Production
npm run dev          # Development (hot reload)
```

Server runs at: `http://localhost:5000`

---

## 🌐 Deploy to Render (Recommended)

### Option A: Blueprint Deploy (Easiest)

1. **Push code to GitHub**
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **"New +"** → **"Blueprint"**
4. Connect your repository
5. Render will auto-detect `render.yaml` and provision:
   - PostgreSQL database
   - Node.js web service
   - Environment variables

**Done!** Your API will be live at `https://fixkart-api.onrender.com`

### Option B: Manual Setup

1. **Create PostgreSQL Database:**
   - New → PostgreSQL
   - Name: `fixkart-db`
   - Plan: Free
   - Copy the **Internal Database URL**

2. **Create Web Service:**
   - New → Web Service
   - Connect your repository
   - **Runtime:** Node
   - **Build Command:**
     ```bash
     npm install && npx prisma generate && npx prisma db push && npm run db:seed
     ```
   - **Start Command:**
     ```bash
     npm start
     ```
   - **Environment Variables:**
     - `NODE_ENV` = `production`
     - `DATABASE_URL` = `[paste Internal Database URL]`

3. **Deploy!**

---

## 🌍 Deploy to Railway

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
railway login
```

2. **Initialize project:**
```bash
railway init
```

3. **Add PostgreSQL:**
```bash
railway add --plugin postgresql
```

4. **Set environment variables:**
```bash
railway variables set NODE_ENV=production
```

5. **Deploy:**
```bash
railway up
```

Railway auto-connects `DATABASE_URL` from the PostgreSQL plugin.

---

## 📦 Project Structure

```
backend-node/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Seed data (10 workers)
├── routes/
│   ├── workers.js         # Workers API endpoints
│   ├── bookings.js        # Bookings API endpoints
│   └── admin.js           # Admin API endpoints
├── server.js              # Express app entry point
├── package.json
├── .env.example
├── render.yaml            # Render IaC config
└── README.md
```

---

## 🔄 Migration from .NET Backend

### What Changed?
- **.NET → Node.js** (C# → JavaScript)
- **Entity Framework → Prisma ORM**
- **Docker → Native runtime**
- **SQLite dev fallback → PostgreSQL only**

### What Stayed the Same?
- ✅ All API routes (`/api/Workers`, `/api/Bookings`, `/api/Admin`)
- ✅ Request/response JSON structures
- ✅ Query parameters and filters
- ✅ HTTP status codes
- ✅ Database schema and seed data
- ✅ CORS policy (allow all origins)

**Your frontend requires ZERO changes.**

---

## 🧪 Testing the API

```bash
# Health check
curl http://localhost:5000/

# List verified workers
curl http://localhost:5000/api/Workers?verifiedOnly=true

# Get specific worker
curl http://localhost:5000/api/Workers/elec-1

# Create booking
curl -X POST http://localhost:5000/api/Bookings \
  -H "Content-Type: application/json" \
  -d '{
    "workerId": "elec-1",
    "customerName": "John Doe",
    "customerPhone": "+91 98765 43210",
    "location": "Indiranagar, Bangalore",
    "description": "Kitchen socket not working"
  }'

# Get admin metrics
curl http://localhost:5000/api/Admin/metrics
```

---

## 🐛 Troubleshooting

### Database connection errors on Render
Render provides an **Internal Database URL** for production. Make sure you're using that, not the external one.

### Prisma client not generated
Run: `npx prisma generate`

### Port already in use
Change `PORT` in `.env` or kill the process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Seed script fails
Make sure database is empty or run:
```bash
npx prisma db push --force-reset
npm run db:seed
```

---

## 📄 License

MIT

---

## 🤝 Support

For issues specific to this Node.js backend, check:
- [Prisma Docs](https://www.prisma.io/docs)
- [Express Docs](https://expressjs.com/)
- [Render Docs](https://render.com/docs)
