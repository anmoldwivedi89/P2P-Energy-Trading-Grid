# GRID P2P — Express.js Backend Service

Main REST API backend for the **AI-Powered Decentralized Peer-to-Peer Energy Trading Marketplace**.

---

## 🛠️ Tech Stack
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (v4)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **ML Integration:** HTTP client connecting to `energy_ai` FastAPI microservice

---

## 📁 Architecture & Folder Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection & disconnect lifecycle
│   │   └── env.js                # Centralized environment variable loader
│   ├── controllers/
│   │   ├── auth.controller.js    # Register, login, current profile, logout
│   │   ├── listing.controller.js # CRUD for energy listings with seller ownership
│   │   ├── order.controller.js   # Order processing, status updates, transaction logs
│   │   └── ai.controller.js      # Demand, generation, price prediction proxy
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification & role authorization (buyer/seller/admin)
│   │   ├── error.middleware.js   # 404 handler and centralized JSON error formatting
│   │   └── validate.middleware.js# Required field validator for request payloads
│   ├── models/
│   │   ├── User.js               # User accounts, hashed passwords, roles, and grid metrics
│   │   ├── Listing.js            # Energy listings, source types, rates, status
│   │   └── Order.js              # P2P purchase settlements, carbon offset, grid routes
│   ├── routes/
│   │   ├── auth.routes.js        # /api/auth
│   │   ├── listing.routes.js     # /api/listings
│   │   ├── order.routes.js       # /api/orders
│   │   ├── transaction.routes.js # /api/transactions
│   │   └── ai.routes.js          # /api/ai
│   ├── services/
│   │   ├── ai.service.js         # Integration client for Python energy_ai service
│   │   └── order.service.js      # Atomic database execution to prevent overselling
│   ├── utils/
│   │   ├── errors.js             # Custom AppError, BadRequest, Unauthorized, NotFound
│   │   └── response.js           # Uniform JSON response builders
│   ├── app.js                    # Express application configuration & middleware
│   └── server.js                 # Database startup & HTTP listener
├── .env.example                  # Template configuration
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Setup & Execution Instructions

### 1. Install Dependencies
From the repository root or inside `backend/`:
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Express HTTP port | `5000` |
| `NODE_ENV` | Runtime mode | `development` |
| `MONGODB_URI` | MongoDB connection string (Local or Atlas) | `mongodb://127.0.0.1:27017/p2p_energy` |
| `JWT_SECRET` | Secret key for signing JWT tokens | (Set your own secure random key) |
| `JWT_EXPIRES_IN` | Token duration | `7d` |
| `AI_SERVICE_URL` | Base URL of the Python `energy_ai` service | `http://127.0.0.1:8000` |
| `FRONTEND_URL` | Allowed frontend origin for CORS | `http://localhost:5173` |

### 3. Start the Backend Server
```bash
# Development mode with hot-reloading:
npm run dev

# Production start:
npm start
```

### 4. Start the Python AI Microservice (Parallel)
From the `energy_ai/` folder:
```bash
cd ../energy_ai
uvicorn api.main:app --port 8000 --reload
```

---

## 🔌 API Endpoint Reference

### Health
- `GET /api/health` — Service health, timestamp, and uptime.

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new prosumer or buyer.
  - Body: `{ name, email, password, role ("buyer"|"seller"|"admin"), location, smartMeterId }`
- `POST /api/auth/login` — Login with credentials, returns JWT token and user profile.
  - Body: `{ email, password }`
- `GET /api/auth/me` *(Protected)* — Get logged-in user profile.
- `POST /api/auth/logout` *(Protected)* — Invalidate session.

### Marketplace Listings (`/api/listings`)
- `GET /api/listings` — Browse listings (filters: `energyType`, `search`, `minPrice`, `maxPrice`, `status`).
- `GET /api/listings/:id` — View details of a specific energy listing.
- `GET /api/listings/seller/my-listings` *(Protected: Seller/Admin)* — Get all listings created by the authenticated user.
- `POST /api/listings` *(Protected: Seller/Admin)* — Publish a new surplus energy listing.
  - Body: `{ energyType, amount, pricePerKwh, durationHours, location }`
- `PUT /api/listings/:id` *(Protected: Seller/Admin)* — Update listing price or availability.
- `DELETE /api/listings/:id` *(Protected: Seller/Admin)* — Cancel energy listing.

### Orders & Transactions (`/api/orders`, `/api/transactions`)
- `POST /api/orders` *(Protected)* — Instant P2P energy purchase.
  - Body: `{ listingId, amountKwh }`
  - *Guarantees atomic stock decrement preventing duplicate purchases or overselling.*
- `GET /api/orders/:id` *(Protected)* — Get order details.
- `GET /api/orders/buyer/my-orders` *(Protected)* — View energy purchases by current buyer.
- `GET /api/orders/seller/my-orders` *(Protected: Seller/Admin)* — View orders fulfilled by current seller.
- `PATCH /api/orders/:id/status` *(Protected)* — Update dispatch status or cancel order.
- `GET /api/transactions/user` *(Protected)* — User ledger of all purchases and sales.
- `GET /api/transactions` *(Protected: Admin)* — Global audit ledger of all microgrid trades.

### AI Prediction Proxy (`/api/ai`)
- `POST /api/ai/predict-price` — Model pricing prediction based on market demand/generation.
  - Body: `{ demand_kwh, generation_kwh, hour, day_of_week, previous_price }`
- `POST /api/ai/predict-demand` — Forecast upcoming community demand.
  - Body: `{ hour, day_of_week, temperature, humidity, previous_demand, holiday }`
- `POST /api/ai/predict-generation` — Forecast solar power generation.
  - Body: `{ temperature, humidity, cloud_cover, solar_irradiance, hour, month }`
- `GET /api/ai/price-recommendation` — Prosumer dynamic pricing bridge with contextual auto-fill.
- `GET /api/ai/health` — Checks status and availability of the Python inference service.
