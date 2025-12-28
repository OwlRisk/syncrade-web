# Environment Configuration v1

**Status: Frozen (Engineering Boundary)**

This document defines all environment variables and configuration keys for Syncrade v1.

⸻

## 1. Frontend Environment Variables

### 1.1 Development

**File:** `.env.development` (optional, defaults work for local dev)

```bash
# API endpoint (if backend exists)
VITE_API_BASE_URL=http://localhost:3000
VITE_API_VERSION=v1

# Feature flags (if any)
VITE_ENABLE_DEBUG=true
```

⸻

### 1.2 Production

**File:** `.env.production`

```bash
# API endpoint
VITE_API_BASE_URL=https://api.your-domain.com
VITE_API_VERSION=v1

# Feature flags
VITE_ENABLE_DEBUG=false
```

**Note:** Vite requires `VITE_` prefix for client-side variables.

⸻

## 2. Backend Environment Variables

### 2.1 Server Configuration

```bash
# Server
API_PORT=3000
API_HOST=0.0.0.0
NODE_ENV=production

# Base URL (for CORS, links, etc.)
API_BASE_URL=https://api.your-domain.com
FRONTEND_URL=https://your-domain.com
```

⸻

### 2.2 Data Sources

```bash
# Blockchain RPC
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
BASE_RPC_URL=https://mainnet.base.org
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Price Data
PRICE_API_KEY=your_price_api_key
PRICE_API_URL=https://api.coingecko.com/v3

# Onchain Data (if using indexer)
INDEXER_API_URL=https://indexer.your-domain.com
INDEXER_API_KEY=your_indexer_key
```

**See:** `docs/supported-sources-v1.md` for supported chains/domains.

⸻

### 2.3 LLM Configuration

```bash
# LLM Provider (if using)
LLM_PROVIDER=openai  # or anthropic, etc.
LLM_API_KEY=sk-...
LLM_MODEL=gpt-4-turbo-preview
LLM_MAX_TOKENS=2000
LLM_TEMPERATURE=0.0  # deterministic

# LLM Budget (from llm-usage-contract-v1.md)
LLM_MAX_CALLS_PER_REQUEST=2  # intent + render
LLM_FALLBACK_ENABLED=true
```

**See:** `docs/llm-usage-contract-v1.md`

⸻

### 2.4 Resource Limits

```bash
# From security-abuse-protocol-v1.md
MAX_TOOL_CALLS_PER_REQUEST=8
MAX_WINDOW_SPAN_DAYS=180
MAX_RETURNED_OBJECTS=25
MAX_REQUEST_SIZE_KB=100
```

⸻

### 2.5 Rate Limiting

```bash
# Rate limits (from security-abuse-protocol-v1.md)
RATE_LIMIT_WINDOW_MS=60000  # 1 minute
RATE_LIMIT_MAX_REQUESTS=60  # per window
RATE_LIMIT_BURST=10

# Per-IP limits
RATE_LIMIT_IP_MAX=100
RATE_LIMIT_IP_WINDOW_MS=60000
```

⸻

### 2.6 Storage

```bash
# Database (if using)
DATABASE_URL=postgresql://user:pass@localhost:5432/syncrade
DATABASE_POOL_SIZE=10

# Cache (if using Redis)
REDIS_URL=redis://localhost:6379
REDIS_TTL_SECONDS=3600

# Object Storage (for snapshots, if using)
S3_BUCKET=syncrade-snapshots
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

⸻

### 2.7 Observability

```bash
# Logging
LOG_LEVEL=info  # debug, info, warn, error
LOG_FORMAT=json  # or text
LOG_FILE=/var/log/syncrade/api.log

# Tracing
TRACE_ENABLED=true
TRACE_SAMPLE_RATE=1.0  # 0.0 to 1.0
TRACE_EXPORTER=console  # or jaeger, datadog, etc.

# Metrics
METRICS_ENABLED=true
METRICS_PORT=9090
```

**See:** `docs/observability-spec-v1.md`

⸻

### 2.8 Security

```bash
# API Keys (if using)
API_KEY_HEADER=X-API-Key
API_KEYS=key1,key2,key3  # comma-separated

# CORS
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
CORS_METHODS=GET,POST
CORS_HEADERS=Content-Type,Authorization

# HTTPS (if terminating at app)
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
```

⸻

## 3. Configuration Validation

**On startup, backend must validate:**
- Required environment variables are set
- Data source URLs are reachable (optional health check)
- Resource limits are positive numbers
- Rate limits are reasonable

**Example validation:**
```javascript
const required = [
  'API_PORT',
  'ETHEREUM_RPC_URL',
  'LLM_API_KEY',
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env: ${key}`);
  }
}
```

⸻

## 4. Secrets Management

**Do NOT commit `.env` files to git.**

**Options:**
- Use `.env.example` as template (with placeholder values)
- Use secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.)
- Use Docker secrets (if using Docker Swarm)
- Use Kubernetes secrets (if using K8s)

**Example `.env.example`:**
```bash
# Copy this to .env and fill in real values
API_PORT=3000
ETHEREUM_RPC_URL=https://...
LLM_API_KEY=sk-...
```

⸻

## 5. Environment-Specific Configs

**Development:**
- Lower rate limits
- Debug logging enabled
- Mock data sources (optional)

**Staging:**
- Production-like limits
- Real data sources (testnet/mainnet)
- Full observability

**Production:**
- Full rate limits
- Production data sources
- Optimized logging
- Full observability

