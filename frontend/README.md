# Syncrade Frontend

React + Vite frontend for Syncrade Market Intelligence System.

⸻

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

⸻

## Project Structure

```
frontend/
  ├── src/
  │   ├── components/     # React components
  │   ├── pages/          # Page components
  │   ├── App.jsx         # Main app component
  │   └── main.jsx        # Entry point
  ├── public/             # Static assets
  ├── package.json
  └── vite.config.js
```

⸻

## Development

Frontend runs on `http://localhost:5173` by default.

Backend API should be running on `http://localhost:8000`.

See `../docs/development-setup-v1.md` for full setup instructions.

⸻

## API Integration

Frontend communicates with backend via:
- `POST /v1/query` - Main query endpoint
- `POST /v1/render` - Render Intelligence Objects
- `GET /v1/replay/:replay_key` - Replay judgments

See `../docs/api-contract-v1.md` for API specification.

⸻

## See Also

- `../docs/` - Frozen specifications
- `../schemas/` - JSON Schemas (SSOT)
- `../backend/` - Python backend API

