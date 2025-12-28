# Syncrade Frontend

Next.js frontend for Syncrade Market Intelligence System.

⸻

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Frontend runs on `http://localhost:3000` by default.

⸻

## Project Structure

```
frontend/
  ├── app/                    # Next.js App Router
  │   ├── layout.jsx          # Root layout
  │   ├── page.jsx            # Home page (/)
  │   ├── terms/              # /terms route
  │   ├── privacy/            # /privacy route
  │   ├── disclaimer/         # /disclaimer route
  │   └── globals.css          # Global styles
  ├── components/             # React components
  │   ├── Header.jsx
  │   ├── Footer.jsx
  │   ├── Hero.jsx
  │   └── ...
  ├── next.config.js          # Next.js configuration
  ├── jsconfig.json           # Path aliases (@/)
  └── package.json
```

⸻

## Next.js Features

- **App Router**: File-based routing (Next.js 13+)
- **Server Components**: Default (no 'use client' needed)
- **Client Components**: Use 'use client' directive when needed
- **Path Aliases**: `@/` points to root directory

⸻

## Development

**Local Development:**
```bash
npm run dev
```

**Backend API:**
Backend should be running on `http://localhost:8000`

See `../docs/development-setup-v1.md` for full setup instructions.

⸻

## API Integration

Frontend communicates with backend via:
- `POST /v1/query` - Main query endpoint
- `POST /v1/render` - Render Intelligence Objects
- `GET /v1/replay/:replay_key` - Replay judgments

See `../docs/api-contract-v1.md` for API specification.

⸻

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Vercel auto-detects Next.js
3. Add environment variables:
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_PUBLIC_API_VERSION`

See `../docs/deployment-guide-v1.md` for details.

⸻

## See Also

- `../docs/` - Frozen specifications
- `../schemas/` - JSON Schemas (SSOT)
- `../backend/` - Python backend API
