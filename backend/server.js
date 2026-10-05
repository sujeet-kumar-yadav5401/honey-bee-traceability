import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import hiveRoutes from './routes/hiveRoutes.js';
import harvestRoutes from './routes/harvestRoutes.js';
import productRoutes from './routes/productRoutes.js';
import batchRoutes from './routes/batchRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import blockchainRoutes from './routes/blockchainRoutes.js';

// Error handlers
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000',
];
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (Postman, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: Origin "${origin}" not allowed.`));
    },
    credentials: true,
  })
);

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health / root ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: '🍯 Blockchain Honey Traceability API is running',
    project: 'Blockchain-Based Honey Traceability & Smart Beekeeping',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      hives: '/api/hives',
      harvest: '/api/harvest',
      products: '/api/products',
      batches: '/api/batches',
      verification: '/api/products/verify/:batchId  (public)',
      dashboard: '/api/dashboard',
      admin: '/api/admin',
      blockchain: '/api/blockchain',
    },
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'OK', timestamp: new Date().toISOString() });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/hives', hiveRoutes);
app.use('/api/harvest', harvestRoutes);
app.use('/api/products', productRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/blockchain', blockchainRoutes);

// ── Error handling middleware (must be LAST) ──────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Server startup ────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '5000', 10);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌐 Frontend URL:  ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`🔑 JWT Secret:    ${process.env.JWT_SECRET ? '✅ Set' : '⚠️  Not set (using fallback)'}`);
      console.log(`\n📋 Quick test:`);
      console.log(`   curl http://localhost:${PORT}/api/products/verify/HNY-2026-001`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();