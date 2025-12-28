# Development Setup Guide v1

**Status: Frozen (Engineering Boundary)**

This guide helps developers set up a local development environment for Syncrade v1.

⸻

## 1. Prerequisites

**Required:**
- Node.js 20+ (LTS recommended)
- npm 10+ (or yarn/pnpm)
- Git

**Optional (if developing backend):**
- Docker & Docker Compose
- PostgreSQL (if using database)
- Redis (if using cache)

⸻

## 2. Frontend Setup

### 2.1 Clone & Install

```bash
git clone <repository-url>
cd syncrade-web
npm install
```

⸻

### 2.2 Development Server

```bash
npm run dev
```

**Access:** `http://localhost:5173`

**Hot reload:** Enabled by default (Vite)

⸻

### 2.3 Build & Preview

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

⸻

### 2.4 Linting

```bash
npm run lint
```

**See:** `eslint.config.js` for rules.

⸻

## 3. Backend Setup (If Applicable)

### 3.1 Environment Variables

**Create `.env` file:**
```bash
cp .env.example .env
# Edit .env with your values
```

**See:** `docs/environment-config-v1.md` for all variables.

⸻

### 3.2 Local Development

**Option A: Direct Node.js**
```bash
npm install
npm run dev  # or node server.js
```

**Option B: Docker Compose**
```bash
docker-compose up -d
```

**Option C: Docker (standalone)**
```bash
docker build -t syncrade-api .
docker run -p 3000:3000 --env-file .env syncrade-api
```

⸻

### 3.3 Database Setup (If Using)

**PostgreSQL:**
```bash
# Create database
createdb syncrade_dev

# Run migrations (if you have them)
npm run migrate
```

**Or use Docker:**
```bash
docker run -d \
  --name syncrade-db \
  -e POSTGRES_PASSWORD=dev \
  -p 5432:5432 \
  postgres:15
```

⸻

## 4. Testing

### 4.1 Schema Validation

**Validate Intelligence Objects:**
```bash
# Using schemas from schemas/
node scripts/validate-fixture.js fixtures/v1/case-01.json
```

**See:** `docs/golden-fixtures-v1.md`

⸻

### 4.2 Replay Testing

**Test replay consistency:**
```bash
# Generate replay hash for fixture
node scripts/test-replay.js fixtures/v1/case-01.json
```

⸻

### 4.3 API Testing (If Backend Exists)

**Manual:**
```bash
# Test /query endpoint
curl -X POST http://localhost:3000/query \
  -H "Content-Type: application/json" \
  -d '{"user_input": "0x123..."}'
```

**Automated (if you add tests):**
```bash
npm test
```

⸻

## 5. Code Structure

**Frontend:**
```
src/
  components/     # React components
  pages/          # Route pages
  assets/         # Static assets
  App.jsx         # Main app
  main.jsx        # Entry point
```

**Backend (if exists):**
```
server/
  routes/         # API routes
  services/       # Business logic
  validators/     # Schema validators
  utils/          # Helpers
  server.js       # Entry point
```

⸻

## 6. Development Workflow

### 6.1 Making Changes

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally (`npm run dev` or `npm test`)
4. Lint (`npm run lint`)
5. Commit (follow commit message conventions)
6. Push & create PR

⸻

### 6.2 Schema Changes

**If modifying Intelligence Object schema:**
1. Update `schemas/intelligence-object-v1.schema.json`
2. Update `docs/intelligence-object-schema-v1.md`
3. Update fixtures if needed
4. Run validator on fixtures
5. Document version bump (see `docs/versioning-migration-rules-v1.md`)

⸻

### 6.3 Adding New Docs

**New frozen spec:**
1. Create `docs/your-spec-v1.md`
2. Add link in `README.md` under "Frozen Product Specs"
3. Commit with `docs:` prefix

⸻

## 7. Common Issues

### 7.1 Port Already in Use

**Frontend (5173):**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Backend (3000):**
```bash
lsof -ti:3000 | xargs kill -9
```

⸻

### 7.2 Build Failures

**Clear cache:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

⸻

### 7.3 Schema Validation Failures

**Check:**
- Schema file is valid JSON
- Fixture matches schema
- Required fields are present

**Validate:**
```bash
# Using ajv-cli or similar
npx ajv validate -s schemas/intelligence-object-v1.schema.json -d fixtures/v1/case-01.json
```

⸻

## 8. IDE Setup

### 8.1 VS Code

**Recommended extensions:**
- ESLint
- Prettier (if using)
- JSON Schema Validator

**Settings (`.vscode/settings.json`):**
```json
{
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "javascriptreact"],
  "json.schemas": [
    {
      "fileMatch": ["schemas/*.schema.json"],
      "url": "./schemas/intelligence-object-v1.schema.json"
    }
  ]
}
```

⸻

## 9. Next Steps

**After setup:**
1. Read `README.md` for project overview
2. Review `docs/` for frozen specs
3. Check `schemas/` for executable schemas
4. Review `fixtures/` for example data
5. Start coding!

