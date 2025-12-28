# Deployment Guide v1

**Status: Frozen (Engineering Boundary)**

This guide covers deployment of Syncrade v1 components: frontend (static site) and backend API (if applicable).

⸻

## 1. Frontend Deployment (Static Site)

### 1.1 GitHub Pages (Current)

**Current setup:**
- Build output: `dist/`
- Base path: `/synctrade-static/`
- Deploy command: `npm run deploy`

**Steps:**
```bash
npm install
npm run build
npm run deploy
```

**Requirements:**
- GitHub repository with `gh-pages` branch
- GitHub Pages enabled in repository settings

⸻

### 1.2 Server Deployment (Static Files)

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

## 2. Backend API Deployment

If you have a backend server implementing the API contract (`docs/api-contract-v1.md`):

### 2.1 Environment Variables

**Required (minimum):**
```bash
# API Configuration
API_PORT=3000
API_HOST=0.0.0.0

# Data Sources
ETHEREUM_RPC_URL=...
BASE_RPC_URL=...
PRICE_API_KEY=...

# LLM (if used)
LLM_API_KEY=...
LLM_MODEL=...
LLM_MAX_TOKENS=...

# Resource Limits (from security-abuse-protocol-v1.md)
MAX_TOOL_CALLS_PER_REQUEST=8
MAX_WINDOW_SPAN_DAYS=180
MAX_RETURNED_OBJECTS=25

# Storage
DATABASE_URL=...  # if using database
REDIS_URL=...     # if using cache

# Observability
LOG_LEVEL=info
TRACE_ENABLED=true
```

**See:** `docs/environment-config-v1.md` (if created)

⸻

### 2.2 Docker Deployment (Backend)

**Example Dockerfile:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js || exit 1

# Start
CMD ["node", "server.js"]
```

**Docker Compose example:**
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - API_PORT=3000
      - DATABASE_URL=${DATABASE_URL}
    env_file:
      - .env
    restart: unless-stopped

  # Add other services (database, cache, etc.) as needed
```

⸻

### 2.3 Systemd Service (Linux)

**Service file:** `/etc/systemd/system/syncrade-api.service`
```ini
[Unit]
Description=Syncrade API v1
After=network.target

[Service]
Type=simple
User=syncrade
WorkingDirectory=/opt/syncrade-api
Environment="NODE_ENV=production"
EnvironmentFile=/opt/syncrade-api/.env
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Commands:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable syncrade-api
sudo systemctl start syncrade-api
```

⸻

## 3. Frontend-Backend Integration

### 3.1 API Endpoint Configuration

**Frontend environment variables:**
```bash
# .env.production
VITE_API_BASE_URL=https://api.your-domain.com
VITE_API_VERSION=v1
```

**Update `vite.config.js` if needed:**
```javascript
export default defineConfig({
  base: '/synctrade-static/',
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
  },
})
```

⸻

### 3.2 CORS Configuration (Backend)

If frontend and backend are on different domains:

**Backend must allow:**
- Frontend origin (e.g., `https://your-domain.com`)
- Methods: `GET`, `POST`
- Headers: `Content-Type`, `Authorization` (if used)

**Example (Express.js):**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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

