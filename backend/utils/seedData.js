/**
 * Seed script — populates demo data for the Blockchain Honey Traceability project.
 *
 * Run with:  node utils/seedData.js
 *  or:       npm run seed   (if script added to package.json)
 *
 * This seeds:
 *   - 1 Admin user, 2 Beekeeper users
 *   - 5 Hives
 *   - 6 Batches (4 honey + 1 rice + 1 coffee)
 *   - Full traceability events for each batch
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Hive from '../models/Hive.js';
import ProductBatch from '../models/ProductBatch.js';
import TraceabilityEvent from '../models/TraceabilityEvent.js';
import { generateBatchHash, generateSimulatedTransactionId } from '../services/hashService.js';

// ── Helpers ──────────────────────────────────────────────────────────────────
const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

// ── Demo Users ───────────────────────────────────────────────────────────────
const USERS = [
  {
    name: 'Admin AgriTrace',
    email: 'admin@agritrace.org',
    password: 'admin123',
    role: 'ADMIN',
    phone: '+91-9900000000',
    location: 'Bangalore, Karnataka',
  },
  {
    name: 'Sujeet Kumar Yadav',
    email: 'beekeeper@coorgapiary.com',
    password: 'honey123',
    role: 'BEEKEEPER',
    phone: '+91-9845001234',
    location: 'Coorg, Karnataka',
  },
  {
    name: 'Priya Patel',
    email: 'priya@nilgiribees.org',
    password: 'honey123',
    role: 'BEEKEEPER',
    phone: '+91-9823456789',
    location: 'Ooty, Tamil Nadu',
  },
];

// ── Demo Hives ────────────────────────────────────────────────────────────────
const makeHives = (beekeeperId) => [
  {
    hiveId: 'HIVE-001',
    beekeeperId,
    hiveName: 'Coorg Forest Alpha',
    apiaryLocation: 'Madikeri, Coorg, Karnataka',
    latitude: 12.4244,
    longitude: 75.7382,
    beeSpecies: 'Apis cerana indica',
    queenStatus: 'Active',
    colonyStrength: 'Strong',
    healthStatus: 'Healthy',
    installationDate: daysAgo(400),
    lastInspectionDate: daysAgo(5),
    notes: 'Primary production hive — mountain wildflower source',
  },
  {
    hiveId: 'HIVE-002',
    beekeeperId,
    hiveName: 'Coorg Forest Beta',
    apiaryLocation: 'Virajpet, Coorg, Karnataka',
    latitude: 12.1887,
    longitude: 75.8004,
    beeSpecies: 'Apis mellifera',
    queenStatus: 'Active',
    colonyStrength: 'Strong',
    healthStatus: 'Healthy',
    installationDate: daysAgo(380),
    lastInspectionDate: daysAgo(7),
    notes: 'Coffee plantation proximity — multi-flora',
  },
  {
    hiveId: 'HIVE-003',
    beekeeperId,
    hiveName: 'Nilgiri Highland Hive A',
    apiaryLocation: 'Ooty, Nilgiris, Tamil Nadu',
    latitude: 11.4102,
    longitude: 76.6950,
    beeSpecies: 'Apis cerana indica',
    queenStatus: 'Active',
    colonyStrength: 'Moderate',
    healthStatus: 'Healthy',
    installationDate: daysAgo(300),
    lastInspectionDate: daysAgo(10),
    notes: 'Eucalyptus dominant area',
  },
  {
    hiveId: 'HIVE-004',
    beekeeperId,
    hiveName: 'Deccan Plateau Hive',
    apiaryLocation: 'Dharwad, Karnataka',
    latitude: 15.4589,
    longitude: 75.0078,
    beeSpecies: 'Apis dorsata',
    queenStatus: 'Active',
    colonyStrength: 'Strong',
    healthStatus: 'Healthy',
    installationDate: daysAgo(250),
    lastInspectionDate: daysAgo(3),
    notes: 'Wild giant honey bee colony',
  },
  {
    hiveId: 'HIVE-005',
    beekeeperId,
    hiveName: 'Sunrise Meadow Hive',
    apiaryLocation: 'Hassan, Karnataka',
    latitude: 13.0068,
    longitude: 76.1004,
    beeSpecies: 'Apis mellifera',
    queenStatus: 'Queenless',
    colonyStrength: 'Weak',
    healthStatus: 'Attention Required',
    installationDate: daysAgo(180),
    lastInspectionDate: daysAgo(1),
    notes: 'Colony requeening in progress',
  },
];

// ── Demo Batches ──────────────────────────────────────────────────────────────
const makeBatches = (producerId, producerName) => [
  {
    batchId: 'HNY-2026-001',
    productName: 'Raw Coorg Wildflower Honey',
    productCategory: 'HONEY',
    producerId,
    producerName,
    sourceId: 'HIVE-001',
    hiveId: 'HIVE-001',
    honeyType: 'Raw Wildflower',
    beeSpecies: 'Apis cerana indica',
    floralSource: 'Mountain Wildflower (Coffee + Cardamom + Forest Mix)',
    moistureLevel: '17.2%',
    pollenCount: '48,000 grains/g',
    c4SugarAdulteration: 'Negative (<1.5% delta 13C)',
    hpmfIndex: '7.8 mg/kg',
    antibioticResidue: 'ND (Not Detected)',
    quantity: 85,
    unit: 'KG',
    location: 'Madikeri, Coorg, Karnataka',
    harvestDate: daysAgo(45),
    processingDate: daysAgo(42),
    packagingDate: daysAgo(40),
    qualityGrade: 'Grade A+ Premium',
    processingMethod: 'Cold Settling & Gentle Micro-Mesh Filtration (<38°C)',
    packagingType: '500g Food-Grade Hexagonal Glass Jars',
    expiryDate: daysAgo(-730),
    verificationStatus: 'Verified',
  },
  {
    batchId: 'HNY-2026-002',
    productName: 'Nilgiri Forest Dark Honey',
    productCategory: 'HONEY',
    producerId,
    producerName,
    sourceId: 'HIVE-003',
    hiveId: 'HIVE-003',
    honeyType: 'Forest Dark Honey',
    beeSpecies: 'Apis cerana indica',
    floralSource: 'Nilgiri Eucalyptus & Native Forest Bloom',
    moistureLevel: '18.1%',
    pollenCount: '52,000 grains/g',
    c4SugarAdulteration: 'Negative (<1.5% delta 13C)',
    hpmfIndex: '6.2 mg/kg',
    antibioticResidue: 'ND (Not Detected)',
    quantity: 62,
    unit: 'KG',
    location: 'Ooty, Nilgiris, Tamil Nadu',
    harvestDate: daysAgo(30),
    processingDate: daysAgo(28),
    packagingDate: daysAgo(26),
    qualityGrade: 'Grade A Premium',
    processingMethod: 'Natural Gravity Settling (No Heat)',
    packagingType: '250g Amber Glass Jars',
    expiryDate: daysAgo(-730),
    verificationStatus: 'Verified',
  },
  {
    batchId: 'HNY-2026-003',
    productName: 'Multiflora Acacia Honey',
    productCategory: 'HONEY',
    producerId,
    producerName,
    sourceId: 'HIVE-002',
    hiveId: 'HIVE-002',
    honeyType: 'Acacia Multiflora',
    beeSpecies: 'Apis mellifera',
    floralSource: 'Acacia & Mixed Orchard Bloom',
    moistureLevel: '16.8%',
    pollenCount: '45,000 grains/g',
    c4SugarAdulteration: 'Negative (<1.5% delta 13C)',
    hpmfIndex: '5.9 mg/kg',
    antibioticResidue: 'ND (Not Detected)',
    quantity: 120,
    unit: 'KG',
    location: 'Virajpet, Coorg, Karnataka',
    harvestDate: daysAgo(15),
    processingDate: daysAgo(13),
    packagingDate: daysAgo(12),
    qualityGrade: 'Grade A Standard',
    processingMethod: 'Cold Settling & Micro-Filtration',
    packagingType: '1KG Food-Grade PET Jars',
    expiryDate: daysAgo(-730),
    verificationStatus: 'Processing',
  },
  {
    batchId: 'HNY-2026-004',
    productName: 'Wild Apis dorsata Cliff Honey',
    productCategory: 'HONEY',
    producerId,
    producerName,
    sourceId: 'HIVE-004',
    hiveId: 'HIVE-004',
    honeyType: 'Wild Cliff Honey',
    beeSpecies: 'Apis dorsata',
    floralSource: 'Wild Deccan Meadow & Mixed Savannah Bloom',
    moistureLevel: '19.2%',
    pollenCount: '62,000 grains/g',
    c4SugarAdulteration: 'Negative (<1.5% delta 13C)',
    hpmfIndex: '12.4 mg/kg',
    antibioticResidue: 'ND (Not Detected)',
    quantity: 40,
    unit: 'KG',
    location: 'Dharwad, Karnataka',
    harvestDate: daysAgo(5),
    processingDate: daysAgo(3),
    packagingDate: daysAgo(2),
    qualityGrade: 'Grade A+ Rare Reserve',
    processingMethod: 'Traditional Hand Harvest — Unfiltered Raw',
    packagingType: '200g Heritage Clay-Sealed Glass Bottles',
    expiryDate: daysAgo(-730),
    verificationStatus: 'Pending',
  },
  {
    batchId: 'RICE-2026-001',
    productName: 'Organic Basmati Rice (GI-Tagged)',
    productCategory: 'RICE',
    producerId,
    producerName: 'Punjab Heritage Agro Co-op',
    sourceId: 'FARM-RICE-PB01',
    quantity: 500,
    unit: 'KG',
    location: 'Amritsar, Punjab',
    harvestDate: daysAgo(60),
    processingDate: daysAgo(55),
    packagingDate: daysAgo(50),
    qualityGrade: 'Grade A+ GI-Tagged',
    processingMethod: 'Sun-Dried & Stone-Milled — Zero-Polish Retention',
    packagingType: '5KG Food-Grade Woven Bags',
    expiryDate: daysAgo(-365),
    verificationStatus: 'Verified',
  },
  {
    batchId: 'COF-2026-001',
    productName: 'Coorg Arabica Single-Origin Coffee',
    productCategory: 'COFFEE',
    producerId,
    producerName: 'Coorg Highland Estates',
    sourceId: 'FARM-COF-KA01',
    quantity: 200,
    unit: 'KG',
    location: 'Madikeri, Coorg, Karnataka',
    harvestDate: daysAgo(90),
    processingDate: daysAgo(80),
    packagingDate: daysAgo(75),
    qualityGrade: 'Specialty Grade — 87 SCA Points',
    processingMethod: 'Washed & Sun-Dried on Raised Beds',
    packagingType: '1KG Nitrogen-Flushed Valve Bags',
    expiryDate: daysAgo(-365),
    verificationStatus: 'Verified',
  },
];

// ── Traceability Events ────────────────────────────────────────────────────────
const makeEvents = (batchId, producerName, location, harvestDate, category) => {
  const isHoney = category === 'HONEY';
  const events = [];

  if (isHoney) {
    events.push({
      eventId: `EVT-${batchId}-01`,
      batchId,
      eventType: 'HIVE_CREATED',
      title: 'Hive Established & Colony Installed',
      description: 'Certified colony installed in FSC-certified apiary zone. GPS coordinates logged.',
      location: location,
      actor: producerName,
      timestamp: daysAgo(400),
      blockchainStatus: 'Confirmed',
      stepNumber: 1,
    });
    events.push({
      eventId: `EVT-${batchId}-02`,
      batchId,
      eventType: 'HIVE_INSPECTED',
      title: 'Pre-Harvest Hive Health Inspection',
      description: 'Colony strength: Strong. Queen presence confirmed. No disease or pest signs. Food stores optimal.',
      location: location,
      actor: 'AgriTrace Certified Inspector',
      timestamp: new Date(harvestDate.getTime() - 7 * 86400000),
      blockchainStatus: 'Confirmed',
      stepNumber: 2,
    });
  } else {
    events.push({
      eventId: `EVT-${batchId}-01`,
      batchId,
      eventType: 'HIVE_CREATED',
      title: 'Farming Plot Registered & Crop Sown',
      description: 'Agricultural plot registered on AgriTrace. Seed variety and soil health recorded.',
      location: location,
      actor: producerName,
      timestamp: daysAgo(200),
      blockchainStatus: 'Confirmed',
      stepNumber: 1,
    });
  }

  events.push({
    eventId: `EVT-${batchId}-03`,
    batchId,
    eventType: 'HARVESTED',
    title: isHoney ? 'Honey Harvested from Hive' : 'Crop Harvested',
    description: isHoney
      ? 'Honey frames extracted using uncapping knife. Centrifugal extraction. Yield weighed and logged.'
      : 'Crop harvested at optimal maturity. Yield measured and field-tagged.',
    location: location,
    actor: producerName,
    timestamp: harvestDate,
    blockchainStatus: 'Confirmed',
    stepNumber: 3,
  });

  events.push({
    eventId: `EVT-${batchId}-04`,
    batchId,
    eventType: 'PROCESSED',
    title: isHoney ? 'Cold Processing & Filtration' : 'Sorting & Processing',
    description: isHoney
      ? 'Cold settling (24h, <38°C). Micro-mesh filtration. Moisture reading taken and recorded.'
      : 'Product sorted, cleaned, and processed under FSSAI standards.',
    location: location,
    actor: `${producerName} — Processing Unit`,
    timestamp: new Date(harvestDate.getTime() + 2 * 86400000),
    blockchainStatus: 'Confirmed',
    stepNumber: 4,
  });

  events.push({
    eventId: `EVT-${batchId}-05`,
    batchId,
    eventType: 'QUALITY_CHECKED',
    title: 'NABL-Accredited Lab Quality Analysis',
    description: 'Full chemical & microbiological profile. Adulteration markers, moisture, pollen count, HMF index all within premium parameters.',
    location: `Quality Lab, ${location.split(',').slice(-1)[0].trim()}`,
    actor: 'IndLab Analytics Pvt. Ltd.',
    timestamp: new Date(harvestDate.getTime() + 4 * 86400000),
    blockchainStatus: 'Confirmed',
    stepNumber: 5,
  });

  events.push({
    eventId: `EVT-${batchId}-06`,
    batchId,
    eventType: 'PACKAGED',
    title: 'Packaged & Batch-Labeled',
    description: 'Filled into certified food-grade containers. AgriTrace QR code applied. Tamper-evident seal.',
    location: `Packaging Unit, ${location.split(',')[0].trim()}`,
    actor: `${producerName} — Packaging`,
    timestamp: new Date(harvestDate.getTime() + 6 * 86400000),
    blockchainStatus: 'Confirmed',
    stepNumber: 6,
  });

  events.push({
    eventId: `EVT-${batchId}-07`,
    batchId,
    eventType: 'BLOCKCHAIN_REGISTERED',
    title: 'Batch Hash Anchored on AgriTrace Ledger',
    description: 'SHA-256 cryptographic fingerprint of all batch data recorded. Tamper-evident audit trail activated.',
    location: 'AgriTrace Consortium Registry (Simulated)',
    actor: 'AgriTrace Smart Contract System',
    timestamp: new Date(harvestDate.getTime() + 7 * 86400000),
    blockchainStatus: 'Confirmed',
    stepNumber: 7,
  });

  events.push({
    eventId: `EVT-${batchId}-08`,
    batchId,
    eventType: 'DISTRIBUTED',
    title: 'Dispatched to Distribution Network',
    description: 'Cold-chain logistics activated. Product dispatched to distributor warehouses and e-commerce fulfillment centers.',
    location: `Distribution Hub, Bangalore`,
    actor: 'AgriTrace Logistics Partner',
    timestamp: new Date(harvestDate.getTime() + 10 * 86400000),
    blockchainStatus: 'Confirmed',
    stepNumber: 8,
  });

  return events;
};

// ── Main Seed Function ────────────────────────────────────────────────────────
const seedDatabase = async () => {
  console.log('\n🌱 Starting AgriTrace Database Seed...\n');

  await connectDB();

  // Clear existing demo data
  console.log('🗑️  Clearing existing data...');
  await TraceabilityEvent.deleteMany({});
  await ProductBatch.deleteMany({});
  await Hive.deleteMany({});
  await User.deleteMany({});

  // Create Users
  console.log('👤 Creating users...');
  const createdUsers = [];
  for (const u of USERS) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(u.password, salt);
    const user = await User.create({ ...u, password: hashedPassword });
    createdUsers.push(user);
    console.log(`   ✅ ${u.role}: ${u.name} (${u.email})`);
  }

  const [adminUser, beekeeperUser] = createdUsers;

  // Create Hives
  console.log('\n🐝 Creating hives...');
  const hiveDocs = makeHives(beekeeperUser._id);
  for (const h of hiveDocs) {
    await Hive.create(h);
    console.log(`   ✅ ${h.hiveId}: ${h.hiveName}`);
  }

  // Create Batches + Events
  console.log('\n📦 Creating batches and traceability events...');
  const batchDefs = makeBatches(beekeeperUser._id, beekeeperUser.name);

  for (const bDef of batchDefs) {
    // Compute hash before saving
    bDef.dataHash = generateBatchHash({
      batchId: bDef.batchId,
      productName: bDef.productName,
      productCategory: bDef.productCategory,
      producerName: bDef.producerName,
      location: bDef.location,
      quantity: bDef.quantity,
      unit: bDef.unit,
      harvestDate: bDef.harvestDate,
      qualityGrade: bDef.qualityGrade,
    });
    bDef.blockchainTransactionId = generateSimulatedTransactionId();

    await ProductBatch.create(bDef);

    const events = makeEvents(
      bDef.batchId,
      bDef.producerName,
      bDef.location,
      bDef.harvestDate,
      bDef.productCategory
    );

    // Inject hash into each event
    for (const ev of events) {
      ev.dataHash = generateBatchHash({ eventId: ev.eventId, batchId: ev.batchId, title: ev.title, actor: ev.actor });
      await TraceabilityEvent.create(ev);
    }

    console.log(`   ✅ ${bDef.batchId}: ${bDef.productName} (${events.length} events)`);
  }

  console.log('\n✅ Seed complete!\n');
  console.log('─'.repeat(50));
  console.log('Demo Credentials:');
  console.log('  Admin    → admin@agritrace.org     / admin123');
  console.log('  Beekeeper→ beekeeper@coorgapiary.com / honey123');
  console.log('  Beekeeper→ priya@nilgiribees.org    / honey123');
  console.log('─'.repeat(50));
  console.log('\nVerification Test IDs:');
  console.log('  curl http://localhost:5000/api/products/verify/HNY-2026-001');
  console.log('  curl http://localhost:5000/api/products/verify/RICE-2026-001');
  console.log('  curl http://localhost:5000/api/products/verify/INVALID-001');
  console.log('─'.repeat(50));

  process.exit(0);
};

seedDatabase().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
