# AgriTrace — Blockchain-Based Honey Traceability and Smart Beekeeping Management System

Frontend prototype and UI for a college engineering capstone project.

## 🚀 Overview

**AgriTrace** is a modern agricultural technology platform combining **Smart Beekeeping IoT Telemetry**, **Honey Provenance**, **Decentralized Blockchain Records**, and **Customer QR Verification**.

The system is built primarily around **Raw & Forest Honey**, while featuring a modular multi-crop architecture supporting:
- 🍯 **Honey** (Primary detailed system with hive biology & pollen analysis)
- 🌾 **Organic Rice** & **Wheat**
- ☕ **Single Origin Arabica Coffee**
- 🌶 **Tellicherry Black Pepper & Spices**
- 🥭 **GI-Tagged Alphonso Mangoes**
- 🍅 **Greenhouse Vegetables**

> **Disclaimer**: This is a **Frontend Prototype & UI Demonstration**. Blockchain transactions, SHA-256 hashes, and IoT telemetry are realistically simulated with mock state for college demonstration.

---

## 🛠 Technology Stack

- **Framework**: [React.js 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚡ How to Run

1. Open PowerShell / Command Prompt in this folder:
   ```bash
   cd "c:\Users\Sujeet kumar yadav\OneDrive\Desktop\honey_bee"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

5. Build for production preview:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🧭 Routes Map

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Hero, 7-stage workflow, feature cards, quick verifier |
| `/login` | Login UI | Role switcher (Beekeeper, Admin, Customer) & 1-click demo login |
| `/register` | Register UI | Producer & Beekeeper onboarding form |
| `/dashboard` | Beekeeper Dashboard | 5 KPI stat cards, 3 visual charts, Recent Honey Batches |
| `/hives` | Hive Management | "My Hives", search, health filter tabs, IoT cards |
| `/hives/create` | Add Hive Form | Register new hive colony with IoT sensor parameters |
| `/hives/:id` | Hive Details | Overview, telemetry, inspection logs, lifecycle timeline |
| `/harvest` | Honey Harvest Logs | Extraction yield table, moisture logs, KPI cards |
| `/harvest/create` | Record Harvest | Extraction form with **Live Preview Card** |
| `/products` | Agricultural Catalog | Multi-crop catalog with Primary Honey spotlight |
| `/products/create` | Add Product | Register new crop commodity taxonomy |
| `/batches` | Batches Directory | Batch cards with multi-crop category filters |
| `/batches/create` | 6-Step Batch Wizard | Product selection → Production → Processing → Quality → Packaging → Blockchain preview |
| `/batches/:id` | Batch Details | Blockchain Record Card, specifications, traceability timeline |
| `/traceability` | Traceability Explorer | Interactive supply chain timeline with batch switcher |
| `/qr` | QR Code Generator | SVG QR code label generator with Download & Print actions |
| `/verification` | Customer Verification | Dual-mode: QR scanner simulation OR Batch ID input |
| `/verify/:batchId` | Direct Verification URL | Verified authenticity view with purity lab test report |
| `/admin` | Admin Dashboard | 8 global KPI cards, User Management & Batch monitoring tables |
| `/profile` | Profile & Identity | Producer credentials, edit modal, and password change modal |

---

## 🔑 Demo Credentials

| Role | Email | Password | Quick Note |
|---|---|---|---|
| **Beekeeper / Producer** | `beekeeper@coorgapiary.com` | `password123` | Sujeet Kumar Yadav (Coorg Apiary Director) |
| **Admin** | `admin@agritrace.org` | `password123` | Dr. Rajesh Sharma (Consortium System Admin) |
| **Customer** | `anita.verma@gmail.com` | `password123` | Anita Verma (Retail Shopper / Consumer) |

*You can also switch roles with 1-click anywhere using the top navigation bar or the Login page!*

---

## 🧪 Demo Presentation Flow

1. **Public Landing** (`/`) → View Hero, 7-stage workflow, and enter `HNY-2026-001` in quick search.
2. **Login** (`/login`) → 1-click login as **Beekeeper**.
3. **Dashboard** (`/dashboard`) → Inspect 5 KPI cards, Honey Production bar chart, Hive health donut, and Recent Honey Batches.
4. **Hives** (`/hives`) → Filter by `Healthy` / `Attention Required` / `Inspection Due`.
5. **Hive Detail** (`/hives/HIVE-001`) → Inspect telemetry sensors, inspection logs, and lifecycle timeline.
6. **Harvest** (`/harvest/create`) → Fill honey extraction details and observe the **Live Preview Card**.
7. **Create Batch** (`/batches/create`) → Walk through the 6-step wizard and click **"Generate Product Batch"**.
8. **Batch Details** (`/batches/HNY-2026-001`) → Inspect the **Blockchain Record Card** with SHA-256 data hash and transaction ID.
9. **Traceability** (`/traceability`) → Toggle between **Workflow View** and **Detailed Log**.
10. **QR Generator** (`/qr`) → Download or print QR code label.
11. **Customer Verification** (`/verification`) → Verify `HNY-2026-001` for **Success** and `INVALID-001` for **Failure Demo**.
12. **Multi-Crop Showcase** (`/products`) → Switch between Honey, Rice, Coffee, Spices, and Mango.
13. **Admin Console** (`/admin`) → Inspect 8 system counters and user management tables.
