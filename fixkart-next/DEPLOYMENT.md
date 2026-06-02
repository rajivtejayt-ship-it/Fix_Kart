# FixKart Production Deployment Guide

Deploy the **multi-page Next.js app** (`fixkart-next/`) on **Vercel** and the **.NET API + SQLite** (`backend/`) on **Render**. No local servers required after setup.

## Architecture

```
Browser → https://your-app.vercel.app (Next.js)
              ↓ server-side API routes (/api/*)
         https://your-api.onrender.com (.NET + SQLite on persistent disk)
```

Set `BACKEND_URL` on Vercel to your Render API URL. Next.js proxies all data operations to Render.

---

## Part 1 — GitHub

### 1.1 Expected repository layout

Your repo root should look like this (landing files at root + new Next app):

```text
your-github-repo/
├── backend/           ← .NET API (copy from this project's backend/ or fixkart-landing/backend/)
├── frontend/          ← old Vite app (can keep, not used in production)
├── fixkart-next/      ← NEW production frontend
├── index.html         ← legacy (optional)
└── ...
```

### 1.2 Push changes

```bash
cd path/to/your-github-repo-clone

# Copy backend + fixkart-next from this workspace if needed, then:
git add backend fixkart-next
git status
git commit -m "Production: Next.js multi-page app + .NET API with Location and full CRUD"
git push origin main
```

---

## Part 2 — Render (Backend API)

### 2.1 Create or update Web Service

1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Open your **existing** FixKart API service **or** **New → Web Service**.
3. Connect the same GitHub repository.

### 2.2 Service settings

| Setting | Value |
|---------|--------|
| **Name** | `fixkart-api` (any name) |
| **Root Directory** | `backend` |
| **Runtime** | Docker *(if you use the included Dockerfile)* **or** .NET |
| **Branch** | `main` |

**Docker (recommended — matches existing setup):**

| Setting | Value |
|---------|--------|
| Dockerfile Path | `backend/Dockerfile` |
| Docker Build Context | `backend` |

**Environment variables:**

| Key | Value |
|-----|--------|
| `ASPNETCORE_ENVIRONMENT` | `Production` |

Render sets `PORT` automatically.

### 2.3 Persistent disk (required for SQLite data)

1. Service → **Disks** → **Add Disk**.
2. **Mount path:** `/data`
3. **Size:** 1 GB (minimum).
4. Save — `appsettings.Production.json` stores SQLite at `/data/fixkart.db`.

> **First deploy with new schema:** If you had an old database without `Location`, delete `/data/fixkart.db` once from the Render shell or remount a fresh disk so `EnsureCreated` seeds correctly.

### 2.4 Deploy and copy API URL

1. Click **Manual Deploy → Deploy latest commit**.
2. Wait until status is **Live**.
3. Copy the URL, e.g. `https://fixkart-api-xxxx.onrender.com`.

### 2.5 Verify API

Open in browser:

- `https://YOUR-API.onrender.com/api/Workers?verifiedOnly=true`
- `https://YOUR-API.onrender.com/api/Admin/pending-approvals`

You should see JSON (pending list includes `pending-1` and `pending-2`).

---

## Part 3 — Vercel (Frontend)

### 3.1 Project settings

1. [vercel.com](https://vercel.com) → your FixKart project (or **Add New → Project**).
2. Import the GitHub repository.

| Setting | Value |
|---------|--------|
| **Root Directory** | `fixkart-next` |
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` |
| **Output Directory** | *(leave default)* |

### 3.2 Environment variable

**Settings → Environment Variables → Production:**

| Name | Value |
|------|--------|
| `BACKEND_URL` | `https://YOUR-API.onrender.com` |

No trailing slash. Apply to **Production** (and Preview if you want).

### 3.3 Deploy

1. **Deployments → Redeploy** (or push to GitHub for auto-deploy).
2. Open `https://your-app.vercel.app`.

### 3.4 Custom domain (optional)

**Settings → Domains** → add your domain → follow DNS instructions.

---

## Part 4 — Production smoke test

Use **only live URLs** (not localhost):

| Step | URL / action |
|------|----------------|
| 1 | Home loads, worker showcase shows data |
| 2 | `/workers` — list filters by location |
| 3 | `/workers/elec-1` — profile loads |
| 4 | **Book** → `/book?worker=elec-1` → submit → security PIN |
| 5 | `/join` — register partner → success message |
| 6 | `/login` — `admin@fixkart.in` / `Admin123` (8+ chars, upper+lower) |
| 7 | `/admin` — approve `pending-1` |
| 8 | `/workers` — approved worker appears; refresh still shows data |

---

## Part 5 — What to disable

| Service | Action |
|---------|--------|
| Old Vercel root `frontend/` build | Root Directory must be `fixkart-next`, not `frontend` |
| Old `VITE_API_URL` | Not used by Next app |

---

## Local development (optional)

```bash
# Terminal 1 — API
cd backend
dotnet run

# Terminal 2 — Next (uses local JSON file, no BACKEND_URL)
cd fixkart-next
npm run dev

# Or point Next at local API:
# fixkart-next/.env.local
BACKEND_URL=http://localhost:5000
npm run dev
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Vercel shows old single-page site | Root Directory = `fixkart-next` |
| Empty workers on production | Check `BACKEND_URL`; test Render `/api/Workers` |
| Join/approve not persisting | Render disk mounted at `/data`; redeploy backend |
| Render API slow first request | Free tier cold start (~30–60s) |
| Admin page blocked | Login with email containing `admin` |
| 500 on POST worker | Check Render logs; ensure DB has new schema |

---

## Summary checklist

- [ ] `backend/` and `fixkart-next/` pushed to GitHub
- [ ] Render: root `backend`, disk `/data`, Production env
- [ ] Render API URL works in browser
- [ ] Vercel: root `fixkart-next`, `BACKEND_URL` set
- [ ] Full smoke test on live Vercel URL
