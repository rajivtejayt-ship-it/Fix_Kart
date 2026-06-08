# 🚀 Deployment Quick Start

## Option 1: Render (Recommended - Easiest)

### Using render.yaml (Blueprint Deploy)

1. **Push to GitHub:**
```bash
cd backend-node
git init
git add .
git commit -m "Initial commit: Node.js FixKart API"
git branch -M main
git remote add origin https://github.com/yourusername/fixkart-api.git
git push -u origin main
```

2. **Deploy on Render:**
   - Go to [render.com/dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository
   - Select the `backend-node` folder (if monorepo) or root
   - Click **"Apply"**

Render will automatically:
- ✅ Create PostgreSQL database
- ✅ Create Node.js web service
- ✅ Set `DATABASE_URL` environment variable
- ✅ Run build commands (install + migrate + seed)
- ✅ Start your API

**Your API will be live at:** `https://fixkart-api.onrender.com`

---

### Manual Render Setup (Alternative)

1. **Create Database:**
   - Dashboard → **New +** → **PostgreSQL**
   - Name: `fixkart-db`
   - Plan: **Free**
   - Region: **Oregon**
   - Click **Create Database**
   - Copy the **Internal Database URL** (starts with `postgresql://`)

2. **Create Web Service:**
   - Dashboard → **New +** → **Web Service**
   - Connect your repository
   - **Name:** `fixkart-api`
   - **Region:** Oregon
   - **Branch:** main
   - **Runtime:** Node
   - **Build Command:**
     ```
     npm install && npx prisma generate && npx prisma db push && npm run db:seed
     ```
   - **Start Command:**
     ```
     npm start
     ```
   - **Environment Variables:**
     - `NODE_ENV` = `production`
     - `DATABASE_URL` = `[paste Internal Database URL from step 1]`

3. **Deploy:**
   - Click **Create Web Service**
   - Wait 2-3 minutes for first deploy
   - Check logs for "✅ FixKart API listening on port 5000"

---

## Option 2: Railway

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login:**
```bash
railway login
```

3. **Initialize project:**
```bash
cd backend-node
railway init
```

4. **Add PostgreSQL:**
```bash
railway add --plugin postgresql
```

5. **Deploy:**
```bash
railway up
```

Railway automatically:
- ✅ Detects Node.js
- ✅ Sets `DATABASE_URL` from PostgreSQL plugin
- ✅ Runs build and start commands
- ✅ Generates a public URL

**Check your deployment:**
```bash
railway status
railway logs
```

---

## Option 3: Heroku

1. **Install Heroku CLI:**
```bash
# Windows (using chocolatey)
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login and create app:**
```bash
heroku login
cd backend-node
heroku create fixkart-api
```

3. **Add PostgreSQL:**
```bash
heroku addons:create heroku-postgresql:mini
```

4. **Set environment variables:**
```bash
heroku config:set NODE_ENV=production
```

5. **Deploy:**
```bash
git push heroku main
```

6. **Run database setup:**
```bash
heroku run npx prisma db push
heroku run npm run db:seed
```

**Your API:** `https://fixkart-api.herokuapp.com`

---

## Option 4: DigitalOcean App Platform

1. **Create account:** [cloud.digitalocean.com](https://cloud.digitalocean.com/)

2. **Create App:**
   - Click **Apps** → **Create App**
   - Connect GitHub repository
   - Select `backend-node` folder

3. **Configure:**
   - **Type:** Web Service
   - **Build Command:**
     ```
     npm install && npx prisma generate
     ```
   - **Run Command:**
     ```
     npm start
     ```

4. **Add Database:**
   - Click **Add Resource** → **Database**
   - Select **PostgreSQL**
   - Plan: **Basic ($7/mo)** or Dev ($0 for 3 months)

5. **Set environment variables:**
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = `${db.DATABASE_URL}` (auto-populated)

6. **Deploy:**
   - Click **Create Resources**

---

## Verify Deployment

After deployment, test these endpoints:

### 1. Health Check
```bash
curl https://your-api-url.com/
```
Expected: `{"status":"FixKart API Running","version":"2.0.0"}`

### 2. List Workers
```bash
curl https://your-api-url.com/api/Workers?verifiedOnly=true
```
Expected: Array of 8 verified workers

### 3. Get Admin Metrics
```bash
curl https://your-api-url.com/api/Admin/metrics
```
Expected:
```json
{
  "totalWorkers": 8,
  "totalBookings": 0,
  "pendingApprovals": 2,
  "activeDispatches": 142,
  "dailyTransactionEscrow": 184320,
  "platformDisputeRate": "0.42%",
  "averageServiceETA": "11.8 Mins"
}
```

### 4. Create Test Booking
```bash
curl -X POST https://your-api-url.com/api/Bookings \
  -H "Content-Type: application/json" \
  -d '{
    "workerId": "elec-1",
    "customerName": "Test User",
    "customerPhone": "+91 98765 43210",
    "location": "Bangalore",
    "description": "Test booking"
  }'
```
Expected: 201 Created with booking details

---

## Update Frontend API URL

Once deployed, update your frontend's API base URL:

### React (.env):
```env
VITE_API_URL=https://your-api-url.onrender.com
```

### Next.js (.env):
```env
NEXT_PUBLIC_API_URL=https://your-api-url.onrender.com
```

### Vanilla JS:
```javascript
const API_BASE_URL = 'https://your-api-url.onrender.com';
```

---

## Common Deployment Issues

### ❌ "Prisma client not generated"

**Solution:**
Add `npx prisma generate` to build command:
```bash
npm install && npx prisma generate && npx prisma db push
```

---

### ❌ "Database connection error"

**Solution:**
1. Check `DATABASE_URL` environment variable is set
2. Ensure it starts with `postgresql://` (not `postgres://`)
3. If using Render, use the **Internal Database URL**, not External

---

### ❌ "Port already in use"

**Solution:**
Make sure your `server.js` reads `PORT` from environment:
```javascript
const PORT = process.env.PORT || 5000;
```

Most PaaS platforms inject their own `PORT` env var.

---

### ❌ "Application failed to respond"

**Solution:**
Ensure server listens on `0.0.0.0`, not `localhost`:
```javascript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### ❌ "Seed data not loading"

**Solution:**
Run seed manually:
```bash
# Render Shell
npm run db:seed

# Railway
railway run npm run db:seed

# Heroku
heroku run npm run db:seed
```

---

## Monitoring & Logs

### Render
```
Dashboard → Service → Logs
```

### Railway
```bash
railway logs
```

### Heroku
```bash
heroku logs --tail
```

---

## Custom Domain Setup

### Render
1. Dashboard → Service → Settings
2. Click **Add Custom Domain**
3. Enter: `api.yourdomain.com`
4. Add CNAME record in your DNS:
   ```
   CNAME api.yourdomain.com → fixkart-api.onrender.com
   ```

### Railway
```bash
railway domain
```

### Heroku
```bash
heroku domains:add api.yourdomain.com
```

---

## Scaling (If Needed)

### Render
- Free tier: 512MB RAM, spins down after 15 min inactivity
- Starter ($7/mo): Always on, 512MB RAM
- Standard ($25/mo): 2GB RAM, autoscaling

### Railway
- Free tier: $5 credit/month
- Pro: Pay per resource usage (~$5-20/mo for this app)

### Heroku
- Free tier: Deprecated
- Eco ($5/mo): 512MB RAM
- Basic ($7/mo): 512MB RAM, always on

---

## Security Checklist

- [ ] Never commit `.env` file (already in `.gitignore`)
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (automatic on Render/Railway/Heroku)
- [ ] Add rate limiting for production (future enhancement)
- [ ] Set up database backups (Render: automatic on paid plans)

---

## Next Steps

1. ✅ Deploy backend
2. ✅ Verify all endpoints work
3. ✅ Update frontend API URL
4. ✅ Test complete booking flow
5. ✅ Monitor logs for errors
6. ✅ Set up custom domain (optional)
7. ✅ Delete old .NET backend (after 48h)

**You're done! 🎉**
