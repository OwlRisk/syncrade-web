# Deployment Guide v1

**Status: Frozen (Engineering Boundary)**

This guide covers deployment of Syncrade v1 components: frontend (static site) and backend API (if applicable).

⸻

## 1. Frontend Deployment

### 1.1 Next.js + Vercel (Recommended)

**Setup:**
- Framework: Next.js
- Platform: Vercel
- Auto-deploy: On push to main/develop branch

**Steps:**

1. **Connect repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure build settings:**
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install`

3. **Environment variables:**
   - Add in Vercel dashboard: Settings → Environment Variables
   - Required variables (see `docs/environment-config-v1.md`):
     ```
     NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
     NEXT_PUBLIC_API_VERSION=v1
     ```

4. **Deploy:**
   - Push to main/develop → Auto-deploy
   - Or manually deploy from Vercel dashboard

**Vercel Configuration (`vercel.json`):**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

⸻

### 1.2 GitHub Pages (Alternative - Static Export)

**If using Next.js static export:**
- Add to `next.config.js`: `output: 'export'`
- Build output: `out/`
- Deploy: `gh-pages -d out`

**Steps:**
```bash
npm install
npm run build
npm run deploy
```

⸻

### 1.3 Server Deployment (Static Files)

If deploying to your own server:

**Option A: Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/syncrade-web/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Option B: Apache**
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/syncrade-web/dist

    <Directory /path/to/syncrade-web/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # SPA routing
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</VirtualHost>
```

**Option C: Docker (Static)**
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

⸻

## 2. Backend API Deployment (Python)

Backend implements the API contract (`docs/api-contract-v1.md`) using Python (FastAPI recommended).

### 2.1 Python Backend Setup

**Recommended stack:**
- Framework: FastAPI (or Flask)
- ASGI Server: Uvicorn (for FastAPI) or Gunicorn (for Flask)
- Python: 3.11+

**Project structure:**
```
syncrade-api/
  app/
    __init__.py
    main.py              # FastAPI app entry
    routes/
      query.py          # POST /query
      render.py         # POST /render
      replay.py         # GET /replay/:replay_key
    services/
      intent_parser.py  # LLM intent parsing
      pipeline.py       # Deterministic pipeline
      renderer.py       # LLM rendering
    validators/
      io_validator.py   # Intelligence Object validation
      failure_validator.py
    utils/
      replay.py         # Replay hash generation
  requirements.txt
  Dockerfile
  .env.example
```

⸻

### 2.2 Environment Variables

**Required (minimum):**
```bash
# API Configuration
API_PORT=8000
API_HOST=0.0.0.0

# Data Sources
ETHEREUM_RPC_URL=...
BASE_RPC_URL=...
PRICE_API_KEY=...

# LLM (if used)
LLM_API_KEY=...
LLM_MODEL=gpt-4-turbo-preview
LLM_MAX_TOKENS=2000

# Resource Limits (from security-abuse-protocol-v1.md)
MAX_TOOL_CALLS_PER_REQUEST=8
MAX_WINDOW_SPAN_DAYS=180
MAX_RETURNED_OBJECTS=25

# Storage
DATABASE_URL=postgresql://...  # if using database
REDIS_URL=redis://...          # if using cache

# Observability
LOG_LEVEL=info
TRACE_ENABLED=true
```

**See:** `docs/environment-config-v1.md` for complete list.

⸻

### 2.3 Docker Deployment (Python Backend)

**Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')" || exit 1

# Start with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**requirements.txt:**
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
pydantic-settings==2.1.0
httpx==0.25.2
openai==1.3.0  # if using OpenAI
python-dotenv==1.0.0
jsonschema==4.20.0  # for schema validation
```

**Docker Compose example:**
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - API_PORT=8000
      - DATABASE_URL=${DATABASE_URL}
    env_file:
      - .env
    restart: unless-stopped
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: syncrade
      POSTGRES_USER: syncrade
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

⸻

### 2.4 Systemd Service (Linux - Python)

**Service file:** `/etc/systemd/system/syncrade-api.service`
```ini
[Unit]
Description=Syncrade API v1 (Python)
After=network.target

[Service]
Type=simple
User=syncrade
WorkingDirectory=/opt/syncrade-api
Environment="PYTHONUNBUFFERED=1"
EnvironmentFile=/opt/syncrade-api/.env
ExecStart=/opt/syncrade-api/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Setup with virtual environment:**
```bash
# Create virtual environment
python3.11 -m venv /opt/syncrade-api/venv
source /opt/syncrade-api/venv/bin/activate
pip install -r requirements.txt

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable syncrade-api
sudo systemctl start syncrade-api
```

⸻

### 2.5 Cloud Deployment Options

**Option A: Railway**
- Connect GitHub repo
- Auto-detect Python
- Set environment variables in dashboard
- Auto-deploy on push

**Option B: Render**
- Create new Web Service
- Connect GitHub repo
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Option C: Fly.io**
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Launch app
fly launch
# Follow prompts, then:
fly deploy
```

**Option D: AWS/GCP/Azure**
- Use container services (ECS, Cloud Run, Container Apps)
- Or serverless (Lambda, Cloud Functions) with API Gateway

⸻

## 3. Frontend-Backend Integration

### 3.1 API Endpoint Configuration

**Next.js environment variables:**
```bash
# .env.local (development)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=v1

# .env.production (production)
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
NEXT_PUBLIC_API_VERSION=v1
```

**In Next.js code:**
```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.your-domain.com';
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';

export const apiClient = {
  query: async (userInput: string) => {
    const response = await fetch(`${API_BASE_URL}/${API_VERSION}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input: userInput }),
    });
    return response.json();
  },
};
```

**Vercel environment variables:**
- Add in Vercel dashboard: Settings → Environment Variables
- Use `NEXT_PUBLIC_` prefix for client-side variables

⸻

### 3.2 CORS Configuration (Backend)

If frontend and backend are on different domains:

**Backend must allow:**
- Frontend origin (e.g., `https://your-domain.com`)
- Methods: `GET`, `POST`
- Headers: `Content-Type`, `Authorization` (if used)

**Example (FastAPI):**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "https://your-domain.com")],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)
```

⸻

## 4. Health Checks & Monitoring

### 4.1 Frontend Health

**Simple check:**
- Verify `index.html` loads
- Verify API connectivity (if backend exists)

⸻

### 4.2 Backend Health

**Health endpoint (recommended):**
```
GET /health
```

**FastAPI health endpoint:**
```python
from fastapi import FastAPI
from datetime import datetime

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "version": "v1",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "checks": {
            "database": "ok",  # check database connection
            "data_sources": "ok"  # check RPC endpoints
        }
    }
```

**Response:**
```json
{
  "status": "healthy",
  "version": "v1",
  "timestamp": "2026-01-03T12:00:00Z",
  "checks": {
    "database": "ok",
    "data_sources": "ok"
  }
}
```

**See:** `docs/observability-spec-v1.md`

⸻

## 5. Security Checklist

Before deploying to production:

- [ ] Environment variables secured (not in code)
- [ ] Rate limiting enabled (see `docs/security-abuse-protocol-v1.md`)
- [ ] Input validation enabled
- [ ] CORS configured correctly
- [ ] HTTPS enabled (if public)
- [ ] Error messages don't leak sensitive info
- [ ] Logs don't contain sensitive data (see `docs/observability-spec-v1.md`)

⸻

## 6. Rollback Strategy

**Frontend:**
- Keep previous `dist/` build
- Git tag releases
- GitHub Pages: revert to previous commit

**Backend:**
- Docker: tag images, rollback to previous tag
- Systemd: keep previous binary, restart with old version
- Database: version migrations (see `docs/versioning-migration-rules-v1.md`)

⸻

## 7. Post-Deployment Verification

**Checklist:**
- [ ] Frontend loads correctly
- [ ] API endpoints respond (if backend)
- [ ] Health checks pass
- [ ] Error handling works (test with invalid input)
- [ ] Rate limiting works (test with rapid requests)
- [ ] Replay endpoint works (test with known replay_key)
- [ ] Logs are being generated (if observability enabled)

