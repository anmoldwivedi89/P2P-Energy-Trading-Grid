# P2P Energy Trading Marketplace - Frontend

This is the frontend client application for the **AI-Powered Decentralized Peer-to-Peer Energy Trading Marketplace**.

## 🛠️ Tech Stack
- **Framework:** React.js (v19) with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Realtime (Prepared):** Socket.IO Client
- **Icons:** Lucide React

## 📁 Project Structure
```text
frontend/
├── public/
├── src/
│   ├── assets/          # Images, icons, and logos
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Generic components (Navbar, Footer, Button, Input, Modal, Loader, ProtectedRoute)
│   │   ├── auth/        # Authentication components (LoginForm, RegisterForm, RoleSelector)
│   │   ├── seller/      # Seller components (EnergyListingForm, MyListings, ListingCard, PriceRecommendation)
│   │   ├── buyer/       # Buyer components (MarketplaceCard, EnergyFilters, PurchaseModal)
│   │   ├── dashboard/   # Dashboard widgets (StatsCard, EnergyChart, DemandChart, PriceChart)
│   │   └── admin/       # Admin tables and views (UserTable, ListingTable, TransactionTable)
│   ├── pages/           # Route-level page components
│   │   ├── seller/      # Seller pages (Dashboard, CreateListing, MyListings, SellerOrders)
│   │   ├── buyer/       # Buyer pages (Dashboard, Marketplace, EnergyDetails, MyOrders, Transactions)
│   │   ├── admin/       # Admin pages (Dashboard, Users, Listings, Transactions)
│   │   └── common/      # General pages (Profile, Notifications, NotFound)
│   ├── services/        # API service abstraction and integration hooks
│   ├── context/         # React Context providers (AuthContext, SocketContext)
│   ├── hooks/           # Custom React hooks (useAuth, useSocket, useApi)
│   ├── utils/           # Utilities, constants, validators, formatters, and storage
│   ├── routes/          # Centralized route definitions
│   ├── layouts/         # Layout shells (AuthLayout, DashboardLayout, AdminLayout)
│   ├── App.jsx          # Root application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Tailwind CSS and global design tokens
├── .env.example         # Environment template
└── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
