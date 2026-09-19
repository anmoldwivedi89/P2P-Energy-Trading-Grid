# GridP2P — Complete Data Schema & API Requirements

This document outlines all exact database models, JSON request/response structures, and IoT/AI telemetry data required by the GridP2P application.

---

## 1. Energy Listings (`/api/listings`)

Used by **Marketplace**, **Seller Hub**, and **Buyer Dashboard**.

### Schema Fields:
| Field Name | Type | Required | Description | Example |
|---|---|---|---|---|
| `id` | `String / UUID` | Yes | Unique listing identifier | `"LST-001"` |
| `sellerId` | `String` | Yes | User ID of the prosumer | `"USR-984"` |
| `sellerName` | `String` | Yes | Display name / Microgrid cluster | `"GreenRoof Solar Array #4"` |
| `location` | `String` | Yes | Local grid zone, node ID, or address | `"Sector 14, Node 08, Microgrid North"` |
| `energyType` | `Enum` | Yes | Source of clean energy (`Solar`, `Wind`, `Hydro`, `Biomass`, `BatteryStorage`) | `"Solar"` |
| `amount` | `Number` | Yes | Available energy in **Kilowatt-hours (kWh)** | `150.0` |
| `pricePerKwh` | `Number` | Yes | Unit price per kWh (in ₹ or $) | `0.12` |
| `smartMeterId` | `String` | Yes | Hardware IoT meter serial number | `"SM-IN-8892-A"` |
| `status` | `Enum` | Yes | Current status (`Active`, `Sold`, `Reserved`, `Expired`) | `"Active"` |
| `validUntil` | `ISO Date` | Yes | Listing expiry timestamp | `"2026-09-20T18:00:00Z"` |
| `createdAt` | `ISO Date` | Yes | Creation timestamp | `"2026-09-19T10:00:00Z"` |

### JSON Payload Example:
```json
{
  "sellerName": "Alice Rooftop Solar",
  "location": "Zone 4, Node 12",
  "energyType": "Solar",
  "amount": 150.0,
  "pricePerKwh": 0.12,
  "smartMeterId": "SM-4482-SOLAR",
  "validUntil": "2026-09-20T18:00:00Z"
}
```

---

## 2. Energy Orders & Transactions (`/api/orders`, `/api/transactions`)

Used for **P2P Settlements**, **Purchase Modals**, and **Billing Records**.

### Schema Fields:
| Field Name | Type | Required | Description | Example |
|---|---|---|---|---|
| `id` | `String / UUID` | Yes | Transaction / Order ID | `"TXN-99402"` |
| `listingId` | `String` | Yes | Associated listing ID | `"LST-001"` |
| `buyerId` | `String` | Yes | User ID of buyer | `"USR-102"` |
| `sellerId` | `String` | Yes | User ID of seller | `"USR-984"` |
| `amountKwh` | `Number` | Yes | Energy quantity purchased (kWh) | `50.0` |
| `pricePerKwh` | `Number` | Yes | Unit rate at transaction time | `0.12` |
| `totalPrice` | `Number` | Yes | Total settlement amount (`amountKwh * pricePerKwh`) | `6.00` |
| `status` | `Enum` | Yes | `Pending`, `Dispatched`, `Completed`, `Failed` | `"Completed"` |
| `gridNodeRoute` | `String` | No | Virtual microgrid routing path | `"Node-12 -> Inverter-4 -> Meter-99"` |
| `carbonOffsetKg` | `Number` | Yes | Carbon offset in kg CO₂ (`amountKwh * 0.536`) | `26.8` |
| `timestamp` | `ISO Date` | Yes | Transaction timestamp | `"2026-09-19T14:30:00Z"` |

---

## 3. IoT Smart Meter Telemetry (`/api/meters/telemetry`)

Real-time telemetry streamed via WebSocket or polled periodically.

```json
{
  "smartMeterId": "SM-4482-SOLAR",
  "prosumerId": "USR-984",
  "currentGenerationKw": 4.85,
  "currentConsumptionKw": 1.20,
  "netSurplusKw": 3.65,
  "batteryStoragePercent": 84.5,
  "gridVoltage": 230.4,
  "frequencyHz": 50.02,
  "timestamp": "2026-09-19T16:15:00Z"
}
```

---

## 4. AI Pricing & Demand Prediction (`/api/ai/predict-price`)

Used by the **AI Dynamic Tariff Engine** in `energy_ai`.

### Request:
```json
{
  "location": "Zone 4",
  "historicalAvgConsumptionKwh": 320.0,
  "currentSolarIrradianceWPerM2": 850.0,
  "temperatureCelsius": 32.5,
  "gridLoadFactor": 0.78,
  "timeOfDay": "14:00"
}
```

### Response:
```json
{
  "recommendedPricePerKwh": 0.118,
  "predictedDemandTrend": "Peak Rising (+14%)",
  "confidenceScore": 0.94,
  "suggestedAction": "Hold surplus battery reserve for evening peak tariff (18:00 - 21:00)"
}
```

---

## 5. User Authentication Profile (`/api/auth/profile`)

```json
{
  "id": "USR-984",
  "name": "Anmol Dwivedi",
  "email": "anmoldwivedi2002@outlook.com",
  "role": "seller",
  "location": "Microgrid Node 12, Zone 4",
  "smartMeterId": "SM-4482-SOLAR",
  "totalEnergySoldKwh": 1420.5,
  "totalEarnings": 170.46,
  "carbonOffsetKg": 761.4
}
```
