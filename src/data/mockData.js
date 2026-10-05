// Mock Data for "Blockchain-Based Honey Traceability and Smart Beekeeping Management System"
// Designed to support Honey as primary product, plus Rice, Wheat, Coffee, Spices, Mango, etc.

export const MOCK_USERS = [
  {
    id: 'USR-001',
    name: 'Dr. Rajesh Sharma',
    email: 'admin@agritrace.org',
    role: 'Admin',
    roleKey: 'admin',
    product: 'All Agricultural Systems',
    location: 'Bengaluru, Karnataka',
    phone: '+91 98450 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joined: 'Jan 2025'
  },
  {
    id: 'USR-002',
    name: 'Sumit Singh',
    email: 'beekeeper@coorgapiary.com',
    role: 'Beekeeper / Producer',
    roleKey: 'beekeeper',
    product: 'Raw Forest & Wildflower Honey',
    location: 'Coorg Apiaries, Karnataka',
    phone: '+91 98765 43210',
    avatar: '/images/sumit.jpg',
    status: 'Active',
    joined: 'Mar 2025'
  },
  {
    id: 'USR-003',
    name: 'Priya Patel',
    email: 'priya@nilgiribees.org',
    role: 'Beekeeper / Producer',
    roleKey: 'beekeeper',
    product: 'Acacia & Multifloral Honey',
    location: 'Nilgiri Hills, Tamil Nadu',
    phone: '+91 94432 11223',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joined: 'May 2025'
  },
  {
    id: 'USR-004',
    name: 'Ramesh Gowda',
    email: 'ramesh@malabaragro.in',
    role: 'Beekeeper / Producer',
    roleKey: 'beekeeper',
    product: 'Organic Rice & Wayanad Coffee',
    location: 'Wayanad, Kerala',
    phone: '+91 91234 56789',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joined: 'Jun 2025'
  },
  {
    id: 'USR-005',
    name: 'Anita Verma',
    email: 'anita.verma@gmail.com',
    role: 'Customer',
    roleKey: 'customer',
    product: 'Consumer / Buyer',
    location: 'Mumbai, Maharashtra',
    phone: '+91 98111 22334',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joined: 'Aug 2025'
  }
];

export const MOCK_HIVES = [
  {
    id: 'HIVE-001',
    name: 'Coorg Sunrise Apiary #1',
    location: 'Madikeri, Coorg, Karnataka (12.4244° N, 75.7382° E)',
    state: 'Karnataka',
    beeSpecies: 'Apis mellifera (European Honeybee)',
    installationDate: '2025-01-15',
    colonyStrength: 'Strong',
    queenStatus: 'Laying Queen (Marked Yellow)',
    healthStatus: 'Healthy',
    temperature: '34.8°C',
    humidity: '58%',
    hiveWeight: '42.5 KG',
    framesCount: 10,
    lastInspection: '28 Sep 2026',
    notes: 'Exceptional brood pattern. Foraging heavily on coffee blossoms and wild forest flora.',
    honeyProducedKg: 95,
    inspections: [
      { date: '28 Sep 2026', inspector: 'Sujeet Kumar', broodStatus: 'Excellent', stores: 'High', parasiteCount: 'None', status: 'Healthy' },
      { date: '14 Sep 2026', inspector: 'Sujeet Kumar', broodStatus: 'Healthy', stores: 'Moderate', parasiteCount: 'Low', status: 'Healthy' },
      { date: '28 Aug 2026', inspector: 'Dr. Rajesh Sharma', broodStatus: 'Normal', stores: 'Moderate', parasiteCount: 'None', status: 'Healthy' }
    ]
  },
  {
    id: 'HIVE-002',
    name: 'Bramhagiri Ridge Apiary #2',
    location: 'Bhagamandala, Coorg, Karnataka (12.3891° N, 75.5312° E)',
    state: 'Karnataka',
    beeSpecies: 'Apis cerana indica (Indian Hive Bee)',
    installationDate: '2025-02-10',
    colonyStrength: 'Strong',
    queenStatus: 'Active Queen',
    healthStatus: 'Healthy',
    temperature: '35.1°C',
    humidity: '62%',
    hiveWeight: '38.0 KG',
    framesCount: 8,
    lastInspection: '25 Sep 2026',
    notes: 'Indigenous species displaying high disease resistance and wild nectar harvesting.',
    honeyProducedKg: 78,
    inspections: [
      { date: '25 Sep 2026', inspector: 'Sujeet Kumar', broodStatus: 'Very Active', stores: 'High', parasiteCount: 'None', status: 'Healthy' },
      { date: '10 Sep 2026', inspector: 'Sujeet Kumar', broodStatus: 'Normal', stores: 'High', parasiteCount: 'None', status: 'Healthy' }
    ]
  },
  {
    id: 'HIVE-003',
    name: 'Nilgiri Shola Apiary #3',
    location: 'Kotagiri, Nilgiris, Tamil Nadu (11.4230° N, 76.8661° E)',
    state: 'Tamil Nadu',
    beeSpecies: 'Apis mellifera',
    installationDate: '2025-04-20',
    colonyStrength: 'Moderate',
    queenStatus: 'Supersedure Observed',
    healthStatus: 'Attention Required',
    temperature: '32.4°C',
    humidity: '71%',
    hiveWeight: '29.2 KG',
    framesCount: 10,
    lastInspection: '01 Oct 2026',
    notes: 'New virgin queen emerging. Need supplemental feeding if rainy conditions persist.',
    honeyProducedKg: 52,
    inspections: [
      { date: '01 Oct 2026', inspector: 'Priya Patel', broodStatus: 'Reduced', stores: 'Low', parasiteCount: 'Varroa check recommended', status: 'Attention Required' },
      { date: '18 Sep 2026', inspector: 'Priya Patel', broodStatus: 'Moderate', stores: 'Moderate', parasiteCount: 'Trace', status: 'Healthy' }
    ]
  },
  {
    id: 'HIVE-004',
    name: 'Biligiriranga Hill Hive #4',
    location: 'BR Hills Wildlife Sanctuary, Karnataka (11.9950° N, 77.1350° E)',
    state: 'Karnataka',
    beeSpecies: 'Apis dorsata / mellifera hybrid reserve',
    installationDate: '2025-05-12',
    colonyStrength: 'Strong',
    queenStatus: 'Laying Queen',
    healthStatus: 'Healthy',
    temperature: '34.5°C',
    humidity: '60%',
    hiveWeight: '46.1 KG',
    framesCount: 10,
    lastInspection: '22 Sep 2026',
    notes: 'Forest wild flora foraging. Super box 80% filled with sealed honeycomb.',
    honeyProducedKg: 110,
    inspections: [
      { date: '22 Sep 2026', inspector: 'Sujeet Kumar', broodStatus: 'Prime', stores: 'Very High', parasiteCount: 'None', status: 'Healthy' },
      { date: '05 Sep 2026', inspector: 'Sujeet Kumar', broodStatus: 'Healthy', stores: 'High', parasiteCount: 'None', status: 'Healthy' }
    ]
  },
  {
    id: 'HIVE-005',
    name: 'Western Ghats Sector #5',
    location: 'Sakleshpur, Hassan, Karnataka (12.9719° N, 75.7885° E)',
    state: 'Karnataka',
    beeSpecies: 'Apis mellifera',
    installationDate: '2025-06-01',
    colonyStrength: 'Strong',
    queenStatus: 'Active Queen',
    healthStatus: 'Inspection Due',
    temperature: '34.0°C',
    humidity: '65%',
    hiveWeight: '36.8 KG',
    framesCount: 10,
    lastInspection: '08 Sep 2026',
    notes: 'Routine 25-day cycle inspection scheduled. Ready for autumn harvest verification.',
    honeyProducedKg: 50,
    inspections: [
      { date: '08 Sep 2026', inspector: 'Sujeet Kumar', broodStatus: 'Good', stores: 'Moderate', parasiteCount: 'None', status: 'Healthy' }
    ]
  }
];

export const MOCK_HARVESTS = [
  {
    id: 'HRV-2026-001',
    hiveId: 'HIVE-001',
    harvestDate: '2026-09-28',
    honeyType: 'Raw Honey',
    quantity: 25,
    unit: 'KG',
    floralSource: 'Wildflower & Coffee Blossom',
    location: 'Coorg Apiaries, Karnataka',
    moistureLevel: '17.8%',
    initialQuality: 'Grade A+ (Premium)',
    color: 'Amber Gold',
    batchId: 'HNY-2026-001',
    notes: 'Unheated, cold extracted honey with high pollen count and rich aroma.'
  },
  {
    id: 'HRV-2026-002',
    hiveId: 'HIVE-004',
    harvestDate: '2026-09-22',
    honeyType: 'Forest Honey',
    quantity: 45,
    unit: 'KG',
    floralSource: 'Deep Western Ghats Shola Flora',
    location: 'BR Hills Wildlife Sanctuary, Karnataka',
    moistureLevel: '18.1%',
    initialQuality: 'Grade A+ (Pure Forest)',
    color: 'Dark Amber',
    batchId: 'HNY-2026-002',
    notes: 'Collected from pristine reserve border hives. Rich in flavonoids and polyphenols.'
  },
  {
    id: 'HRV-2026-003',
    hiveId: 'HIVE-002',
    harvestDate: '2026-09-15',
    honeyType: 'Acacia Honey',
    quantity: 30,
    unit: 'KG',
    floralSource: 'Acacia & Eucalyptus Bloom',
    location: 'Bhagamandala, Karnataka',
    moistureLevel: '18.5%',
    initialQuality: 'Grade A',
    color: 'Pale Golden',
    batchId: 'HNY-2026-003',
    notes: 'Delicate floral taste with slow crystallization profile.'
  },
  {
    id: 'HRV-2026-004',
    hiveId: 'HIVE-001',
    harvestDate: '2026-08-30',
    honeyType: 'Multifloral Honey',
    quantity: 50,
    unit: 'KG',
    floralSource: 'Multi-season Western Ghats Flora',
    location: 'Coorg, Karnataka',
    moistureLevel: '18.9%',
    initialQuality: 'Grade A',
    color: 'Golden Amber',
    batchId: 'HNY-2026-004',
    notes: 'Standard multi-flower harvest. Excellent balance of glucose and fructose.'
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 'PROD-HNY',
    category: 'Honey & Bee Products',
    icon: '🍯',
    name: 'Raw Forest & Apiary Honey',
    producer: 'Coorg Smart Beekeepers Cooperative',
    origin: 'Coorg & Western Ghats, Karnataka',
    description: '100% pure, unadulterated, unpasteurized natural honey harvested from certified sustainable smart hives with IoT monitoring.',
    totalBatches: 28,
    activeProducers: 12,
    badge: 'Primary Product',
    isPrimary: true,
    standards: ['FSSAI Jaivik Bharat', 'Agmark Grade Special', 'Pollen Analysis Certified']
  },
  {
    id: 'PROD-RCE',
    category: 'Cereals & Grains',
    icon: '🌾',
    name: 'Organic Sona Masoori & Basmati Rice',
    producer: 'Kaveri Basin Heritage Farmers',
    origin: 'Mandya & Kaveri Delta, Karnataka',
    description: 'Pesticide-free aromatic unpolished grains with full soil-to-mill traceability records.',
    totalBatches: 15,
    activeProducers: 8,
    badge: 'Multi-Crop Enabled',
    isPrimary: false,
    standards: ['NPOP Organic', 'GI Tagged Kaveri Basin']
  },
  {
    id: 'PROD-WHT',
    category: 'Cereals & Grains',
    icon: '🌾',
    name: 'Sharbati Golden Wheat',
    producer: 'Malwa Agro Producer Org',
    origin: 'Sehore & Vidisha, Central India',
    description: 'Nutrient-dense whole wheat grains harvested at optimal moisture for stone milling.',
    totalBatches: 9,
    activeProducers: 5,
    badge: 'Multi-Crop Enabled',
    isPrimary: false,
    standards: ['Zero Chemical Residue', 'FSSAI Certified']
  },
  {
    id: 'PROD-COF',
    category: 'Plantation Crops',
    icon: '☕',
    name: 'Single Origin Arabica Coffee Beans',
    producer: 'Wayanad High-Altitude Planters',
    origin: 'Wayanad, Kerala (1100m MSL)',
    description: 'Shade-grown specialty coffee hand-picked and wet-processed with micro-lot traceability.',
    totalBatches: 12,
    activeProducers: 6,
    badge: 'Specialty Lot',
    isPrimary: false,
    standards: ['Rainforest Alliance', 'Specialty Coffee SCA 86+']
  },
  {
    id: 'PROD-SPC',
    category: 'Spices & Herbs',
    icon: '🌶',
    name: 'Malabar Tellicherry Black Pepper & Cardamom',
    producer: 'Idukki Spices Federation',
    origin: 'Idukki & Wayanad, Kerala',
    description: 'Sun-dried high piperine tellicherry bold peppercorns and green cardamom pods.',
    totalBatches: 14,
    activeProducers: 9,
    badge: 'High Value Export',
    isPrimary: false,
    standards: ['Spice Board Quality Seal', 'GI Tagged Malabar Pepper']
  },
  {
    id: 'PROD-MNG',
    category: 'Fruits & Horticulture',
    icon: '🥭',
    name: 'GI-Tagged Ratnagiri & Devgad Alphonso Mangoes',
    producer: 'Konkan Mango Growers Guild',
    origin: 'Ratnagiri, Maharashtra',
    description: 'Naturally ripened carbide-free tree-ripened royal table mangoes tracked from individual orchards.',
    totalBatches: 8,
    activeProducers: 4,
    badge: 'Perishable Trace',
    isPrimary: false,
    standards: ['APEDA Phytosanitary Approved', 'GI Registry India']
  },
  {
    id: 'PROD-TOM',
    category: 'Vegetables',
    icon: '🍅',
    name: 'Greenhouse Vine-Ripened Tomatoes',
    producer: 'Kolar Protected Farming Cluster',
    origin: 'Kolar, Karnataka',
    description: 'Hydroponic and drip-irrigated firm tomatoes with zero toxic pesticide spray records.',
    totalBatches: 6,
    activeProducers: 3,
    badge: 'Cold Chain Monitored',
    isPrimary: false,
    standards: ['Good Agricultural Practices (GAP)', 'FSSAI']
  },
  {
    id: 'PROD-POT',
    category: 'Vegetables',
    icon: '🥔',
    name: 'Deesa Table & Processing Potatoes',
    producer: 'Banaskantha Farmer Cooperative',
    origin: 'Deesa, Gujarat',
    description: 'High dry matter graded potatoes stored in temperature-logged IoT cold facilities.',
    totalBatches: 5,
    activeProducers: 2,
    badge: 'Cold Chain Monitored',
    isPrimary: false,
    standards: ['Sorting & Grading ISO 22000']
  }
];

export const MOCK_BATCHES = [
  {
    id: 'HNY-2026-001',
    product: 'Raw Wildflower Honey',
    productCategory: 'Honey',
    producer: 'Sujeet Kumar Yadav (Coorg Apiary)',
    producerId: 'USR-002',
    origin: 'Madikeri, Coorg, Karnataka, India',
    quantity: '25 KG',
    quantityNum: 25,
    unit: 'KG',
    harvestDate: '2026-09-28',
    processingDate: '2026-09-29',
    qualityCheckDate: '2026-10-01',
    packagingDate: '2026-10-02',
    blockchainDate: '2026-10-02 14:20:10 UTC',
    qualityGrade: 'Grade A+ Premium',
    moistureLevel: '17.8%',
    pollenCount: '48,000 grains/g (Predominantly Coffea arabica & Syzygium)',
    c4SugarAdulteration: 'Negative (<1.5% delta 13C)',
    hpmfIndex: '7.8 mg/kg (Freshness Guaranteed, limit <40)',
    antibioticResidue: 'ND (Not Detected)',
    status: 'Verified',
    hiveId: 'HIVE-001',
    beeSpecies: 'Apis mellifera',
    floralSource: 'Wildflower & Coffee Blossom',
    packagingType: '500g Food-Grade Hexagonal Glass Jars (Batch of 50)',
    qrCodeGenerated: true,
    // Blockchain details
    blockchain: {
      network: 'AgriTrace Consortium Ledger (Ethereum Sepolia / Hyperledger Prototype)',
      blockNumber: '1984210',
      dataHash: '0x8a72f91bc34e021a8d9b7348912cf30a84b5c689d12e9471ab8203f191bc3001',
      transactionId: '0x42af82de719c3540a9b31952e468201bb85a2176840d82910fa31b28912882de',
      gasUsed: '48,291',
      smartContract: '0xAgriTraceHoneyRegistryV2_09A1',
      merkleRoot: '0x718fca201e5bb8021d7468e4209930fca2',
      verificationStatus: 'Verified & Tamper-Evident',
      isPrototype: true
    },
    traceabilityJourney: [
      {
        step: 1,
        title: 'Hive Sourcing & Smart Monitoring',
        actor: 'Smart Hive HIVE-001 (IoT Sensors)',
        location: 'Coorg Apiaries, Karnataka (12.4244° N, 75.7382° E)',
        timestamp: '2026-09-28 07:30 IST',
        status: 'Completed',
        details: 'Hive ambient temp 34.8°C, humidity 58%. Super frame filled with capped comb.'
      },
      {
        step: 2,
        title: 'Honey Harvesting',
        actor: 'Sujeet Kumar (Certified Master Beekeeper)',
        location: 'Apiary Extraction Shed, Coorg',
        timestamp: '2026-09-28 11:15 IST',
        status: 'Completed',
        details: 'Hand-uncapped frames, gentle centrifugal cold extraction. Quantity: 25 KG.'
      },
      {
        step: 3,
        title: 'Filtration & Settling',
        actor: 'Coorg Natural Processing Facility',
        location: 'Madikeri Processing Centre',
        timestamp: '2026-09-29 16:00 IST',
        status: 'Completed',
        details: 'Triple nylon micro-mesh filtration without heating above 38°C to retain raw enzymes.'
      },
      {
        step: 4,
        title: 'Certified Lab Quality Testing',
        actor: 'National Agri-Food Quality Lab (NABL Accredited)',
        location: 'Mysuru Testing Wing',
        timestamp: '2026-10-01 10:45 IST',
        status: 'Completed',
        details: 'Moisture 17.8%, C4 sugars Negative, HMF 7.8 mg/kg. Clean phytosanitary pass.'
      },
      {
        step: 5,
        title: 'Food-Grade Packaging & Seal',
        actor: 'EcoPack Automated Line #2',
        location: 'Madikeri Logistics Hub',
        timestamp: '2026-10-02 09:30 IST',
        status: 'Completed',
        details: '50 units of 500g hermetically sealed glass jars with tamper-evident RFID bands.'
      },
      {
        step: 6,
        title: 'Blockchain Ledger Anchoring',
        actor: 'AgriTrace Smart Contract 0xAgriTraceRegistry',
        location: 'Decentralized Agri Node Cluster',
        timestamp: '2026-10-02 14:20 IST',
        status: 'Completed',
        details: 'Cryptographic SHA-256 state anchored into transaction block #1984210.'
      },
      {
        step: 7,
        title: 'Consumer QR Verification Ready',
        actor: 'Global Verification Gateway',
        location: 'Point of Sale / Web Registry',
        timestamp: '2026-10-02 15:00 IST',
        status: 'Active',
        details: 'Public QR active. Verified consumer authenticity check available worldwide.'
      }
    ]
  },
  {
    id: 'HNY-2026-002',
    product: 'Coorg Forest Honey',
    productCategory: 'Honey',
    producer: 'Sujeet Kumar Yadav',
    producerId: 'USR-002',
    origin: 'BR Hills Wildlife Sanctuary, Karnataka',
    quantity: '45 KG',
    quantityNum: 45,
    unit: 'KG',
    harvestDate: '2026-09-22',
    processingDate: '2026-09-24',
    qualityCheckDate: '2026-09-26',
    packagingDate: '2026-09-27',
    blockchainDate: '2026-09-27 11:10:05 UTC',
    qualityGrade: 'Grade A+ Special',
    moistureLevel: '18.1%',
    pollenCount: '52,000 grains/g (Forest Shola)',
    c4SugarAdulteration: 'Negative',
    hpmfIndex: '8.2 mg/kg',
    antibioticResidue: 'ND (Not Detected)',
    status: 'Verified',
    hiveId: 'HIVE-004',
    beeSpecies: 'Apis dorsata / mellifera',
    floralSource: 'Deep Western Ghats Shola Flora',
    packagingType: '1 KG Glass Bottles (Batch of 45)',
    qrCodeGenerated: true,
    blockchain: {
      network: 'AgriTrace Consortium Ledger (Prototype)',
      blockNumber: '1982104',
      dataHash: '0x9c31b54e21a084128df73a90184b2c129e18bca4810237bca4018274191bc3002',
      transactionId: '0x71a28cb0195e472091bb72a194819001bfa829104812301fa31b28912882bc91',
      gasUsed: '47,810',
      smartContract: '0xAgriTraceHoneyRegistryV2_09A1',
      merkleRoot: '0x92f801bc49120eac71950284b12',
      verificationStatus: 'Verified & Tamper-Evident',
      isPrototype: true
    },
    traceabilityJourney: [
      {
        step: 1,
        title: 'Sanctuary Hive Harvest',
        actor: 'HIVE-004 Ecological Reserve',
        location: 'BR Hills Reserve, Karnataka',
        timestamp: '2026-09-22 08:00 IST',
        status: 'Completed',
        details: 'Harvested from deep flora zone without forest canopy damage.'
      },
      {
        step: 2,
        title: 'Centrifugal Extraction',
        actor: 'Forest Produce Cooperative',
        location: 'Chamarajanagar Wing',
        timestamp: '2026-09-24 14:00 IST',
        status: 'Completed',
        details: 'Cold extracted at 35°C. Clean amber density.'
      },
      {
        step: 3,
        title: 'Purity & Pollen Analysis',
        actor: 'Southern Regional Lab',
        location: 'Bengaluru Lab',
        timestamp: '2026-09-26 12:30 IST',
        status: 'Completed',
        details: 'Full spectrum pollen signature matched Western Ghats shola species.'
      },
      {
        step: 4,
        title: 'Packaging & QR Printing',
        actor: 'AgriTrace Pack Unit',
        location: 'Mysuru Facility',
        timestamp: '2026-09-27 10:00 IST',
        status: 'Completed',
        details: 'Bottled in 1 KG sealed jars with blockchain verification seal.'
      },
      {
        step: 5,
        title: 'Ledger Hash Anchor',
        actor: 'AgriTrace Blockchain Engine',
        location: 'Decentralized Node #3',
        timestamp: '2026-09-27 11:10 IST',
        status: 'Completed',
        details: 'Block #1982104 state confirmed with 12 validator signatures.'
      }
    ]
  },
  {
    id: 'HNY-2026-003',
    product: 'Acacia Honey',
    productCategory: 'Honey',
    producer: 'Priya Patel (Nilgiri Honey)',
    producerId: 'USR-003',
    origin: 'Bhagamandala, Karnataka',
    quantity: '30 KG',
    quantityNum: 30,
    unit: 'KG',
    harvestDate: '2026-09-15',
    processingDate: '2026-09-17',
    qualityCheckDate: '2026-09-20',
    packagingDate: 'In Progress',
    blockchainDate: 'Pending Final Block Confirmation',
    qualityGrade: 'Grade A',
    moistureLevel: '18.5%',
    pollenCount: '39,000 grains/g',
    c4SugarAdulteration: 'Negative',
    hpmfIndex: '9.1 mg/kg',
    antibioticResidue: 'ND',
    status: 'Processing',
    hiveId: 'HIVE-002',
    beeSpecies: 'Apis cerana indica',
    floralSource: 'Acacia & Eucalyptus Bloom',
    packagingType: 'Bulk 10 KG Canisters',
    qrCodeGenerated: false,
    blockchain: {
      network: 'AgriTrace Consortium Ledger (Prototype)',
      blockNumber: 'Mempool #Pending',
      dataHash: '0x7b124801ac91209b57e49201bc841029410ea81290381920acfa1928301823aa',
      transactionId: '0xPending_Tx_HNY003',
      gasUsed: 'Estimating...',
      smartContract: '0xAgriTraceHoneyRegistryV2_09A1',
      merkleRoot: '0x0000000000000000000',
      verificationStatus: 'Validation in Process',
      isPrototype: true
    },
    traceabilityJourney: [
      {
        step: 1,
        title: 'Hive Harvest Recorded',
        actor: 'HIVE-002 Apiary',
        location: 'Bhagamandala, Karnataka',
        timestamp: '2026-09-15 09:30 IST',
        status: 'Completed',
        details: 'Harvested 30 KG light golden acacia honey.'
      },
      {
        step: 2,
        title: 'Cold Clarification',
        actor: 'Nilgiri Processing Unit',
        location: 'Kotagiri Shed',
        timestamp: '2026-09-17 11:00 IST',
        status: 'Completed',
        details: 'Gravity settled for 48 hours.'
      },
      {
        step: 3,
        title: 'NABL Moisture & Pollen Lab Testing',
        actor: 'Food Safety Lab Coimbatore',
        location: 'Coimbatore',
        timestamp: '2026-09-20 16:15 IST',
        status: 'Completed',
        details: 'Moisture 18.5%. Cleared for packaging.'
      },
      {
        step: 4,
        title: 'Automated Bottling & Labeling',
        actor: 'Packaging Line',
        location: 'Coimbatore Hub',
        timestamp: '2026-10-03 (Current Stage)',
        status: 'In Progress',
        details: 'Bottling scheduled in sterile facility.'
      }
    ]
  },
  {
    id: 'HNY-2026-004',
    product: 'Multifloral Raw Honey',
    productCategory: 'Honey',
    producer: 'Sujeet Kumar Yadav',
    producerId: 'USR-002',
    origin: 'Coorg, Karnataka',
    quantity: '50 KG',
    quantityNum: 50,
    unit: 'KG',
    harvestDate: '2026-08-30',
    processingDate: '2026-09-02',
    qualityCheckDate: 'Scheduled',
    packagingDate: 'Pending',
    blockchainDate: 'Not Anchored Yet',
    qualityGrade: 'Grade A (Provisional)',
    moistureLevel: '18.9%',
    pollenCount: 'Awaiting report',
    c4SugarAdulteration: 'Pending',
    hpmfIndex: 'Pending',
    antibioticResidue: 'Pending',
    status: 'Pending',
    hiveId: 'HIVE-001',
    beeSpecies: 'Apis mellifera',
    floralSource: 'Multi-season Western Ghats Flora',
    packagingType: 'Stainless Steel Drums (50 KG)',
    qrCodeGenerated: false,
    blockchain: {
      network: 'AgriTrace Consortium Ledger (Prototype)',
      blockNumber: 'Uncommitted',
      dataHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      transactionId: 'None',
      gasUsed: '0',
      smartContract: '0xAgriTraceHoneyRegistryV2_09A1',
      merkleRoot: 'None',
      verificationStatus: 'Not Verified',
      isPrototype: true
    },
    traceabilityJourney: [
      {
        step: 1,
        title: 'Harvest from HIVE-001',
        actor: 'sumit singh',
        location: 'Coorg, Karnataka',
        timestamp: '2026-08-30 08:30 IST',
        status: 'Completed',
        details: '50 KG bulk harvest.'
      },
      {
        step: 2,
        title: 'Raw Filtration',
        actor: 'Apiary Extraction Unit',
        location: 'Madikeri',
        timestamp: '2026-09-02 14:00 IST',
        status: 'Completed',
        details: 'Filtered through double stainless mesh.'
      },
      {
        step: 3,
        title: 'Quality Lab Verification',
        actor: 'National Testing Lab',
        location: 'Mysuru',
        timestamp: 'Pending Lab Slot',
        status: 'Pending',
        details: 'Sample dispatched for complete isotopic purity test.'
      }
    ]
  },
  // Multi-product mock batches to showcase architectural versatility
  {
    id: 'RICE-2026-001',
    product: 'Organic Sona Masoori Rice',
    productCategory: 'Rice',
    producer: 'Kaveri Basin Heritage Farmers',
    producerId: 'USR-004',
    origin: 'Mandya, Kaveri River Basin, Karnataka',
    quantity: '500 KG',
    quantityNum: 500,
    unit: 'KG',
    harvestDate: '2026-09-10',
    processingDate: '2026-09-18',
    qualityCheckDate: '2026-09-22',
    packagingDate: '2026-09-25',
    blockchainDate: '2026-09-26 16:45:12 UTC',
    qualityGrade: 'Export Grade Premium',
    moistureLevel: '12.4%',
    pollenCount: 'N/A (Cereal Crop)',
    c4SugarAdulteration: 'N/A',
    hpmfIndex: 'N/A',
    antibioticResidue: 'Pesticide Residue <0.01 mg/kg (Zero chemical organic pass)',
    status: 'Verified',
    hiveId: 'Plot #KM-48 (Canal Fed)',
    beeSpecies: 'Beneficial Farm Pollinators (Apis cerana on border)',
    floralSource: 'Wetland Agro-Ecosystem',
    packagingType: '10 KG Multi-ply Jute Eco-Bags with QR seal',
    qrCodeGenerated: true,
    blockchain: {
      network: 'AgriTrace Consortium Ledger (Prototype)',
      blockNumber: '1983940',
      dataHash: '0x4f12bb99a18042918bca48910247910ba710928401823901bca0194819280010',
      transactionId: '0x5109bca81920831a9bf48019481903ba82019481239857102938475819203912',
      gasUsed: '45,190',
      smartContract: '0xAgriTraceMultiCropRegistry_01F9',
      merkleRoot: '0x4f8819204857bca01827419',
      verificationStatus: 'Verified & Tamper-Evident',
      isPrototype: true
    },
    traceabilityJourney: [
      {
        step: 1,
        title: 'Organic Paddy Harvest',
        actor: 'Plot #KM-48 Farm Team',
        location: 'Mandya, Karnataka (12.5230° N, 76.8970° E)',
        timestamp: '2026-09-10 10:00 IST',
        status: 'Completed',
        details: 'Harvested with automated cleaner, zero chemical herbicide used.'
      },
      {
        step: 2,
        title: 'Sun Drying & Moisture Stabilization',
        actor: 'Kaveri Solar Drying Yard',
        location: 'Mandya Hub',
        timestamp: '2026-09-14 16:00 IST',
        status: 'Completed',
        details: 'Grain moisture brought down to optimal 12.4% storage level.'
      },
      {
        step: 3,
        title: 'Modern Rubber-Roll De-husking',
        actor: 'GreenMill Organic Processing',
        location: 'Mysuru Industrial Area',
        timestamp: '2026-09-18 11:30 IST',
        status: 'Completed',
        details: 'Milled preserving nutrient-rich bran layer. 100% sortex cleaned.'
      },
      {
        step: 4,
        title: 'Organic NPOP Purity Certificate',
        actor: 'Aditi Organic Certifications',
        location: 'Bengaluru Lab',
        timestamp: '2026-09-22 15:00 IST',
        status: 'Completed',
        details: 'Heavy metals and 224 pesticide residues tested: ALL CLEAR.'
      },
      {
        step: 5,
        title: 'Biodegradable Eco-Jute Packaging',
        actor: 'EcoPack India Unit',
        location: 'Mandya Warehouse',
        timestamp: '2026-09-25 14:00 IST',
        status: 'Completed',
        details: '50 bags of 10 KG packed with encrypted QR traceability badges.'
      },
      {
        step: 6,
        title: 'Blockchain Record Registered',
        actor: 'AgriTrace MultiCrop Smart Contract',
        location: 'Consortium Node #2',
        timestamp: '2026-09-26 22:15 IST',
        status: 'Completed',
        details: 'Hash 0x4f12bb99... permanently anchored in Block #1983940.'
      }
    ]
  },
  {
    id: 'COF-2026-001',
    product: 'Single Origin Arabica Coffee',
    productCategory: 'Coffee',
    producer: 'Wayanad High-Altitude Planters',
    producerId: 'USR-004',
    origin: 'Wayanad, Kerala (1100m MSL)',
    quantity: '120 KG',
    quantityNum: 120,
    unit: 'KG',
    harvestDate: '2026-09-05',
    processingDate: '2026-09-12',
    qualityCheckDate: '2026-09-16',
    packagingDate: '2026-09-20',
    blockchainDate: '2026-09-21 08:30:00 UTC',
    qualityGrade: 'SCA 86.5 Specialty Grade',
    moistureLevel: '11.0%',
    pollenCount: 'N/A',
    c4SugarAdulteration: 'N/A',
    hpmfIndex: 'N/A',
    antibioticResidue: 'Zero Chemical Residue',
    status: 'Verified',
    hiveId: 'Shade Agro-Forestry Block #7',
    beeSpecies: 'Apis cerana pollinator supported',
    floralSource: 'Cardamom & Orange blossom shade cover',
    packagingType: 'Degassing Valve Foil Bags (1 KG x 120)',
    qrCodeGenerated: true,
    blockchain: {
      network: 'AgriTrace Consortium Ledger (Prototype)',
      blockNumber: '1981880',
      dataHash: '0x6e88a410982301fa3829104812301fa31b28912882bc910247910ba710928401',
      transactionId: '0x38475819203912a9bf48019481903ba8201948123985710294f12bb99a180429',
      gasUsed: '46,300',
      smartContract: '0xAgriTraceMultiCropRegistry_01F9',
      merkleRoot: '0x6e8810928401bca0182',
      verificationStatus: 'Verified & Tamper-Evident',
      isPrototype: true
    },
    traceabilityJourney: [
      {
        step: 1,
        title: 'Selective Hand-Picking of Red Ripe Cherries',
        actor: 'Estate Hand-Pickers Team',
        location: 'Wayanad High-Altitude Estate',
        timestamp: '2026-09-05 08:00 IST',
        status: 'Completed',
        details: 'Only 100% dark red ripe Arabica cherries harvested at 21° Brix.'
      },
      {
        step: 2,
        title: 'Washed Processing & Raised Bed Drying',
        actor: 'Wayanad Wet Mill',
        location: 'Vythiri Wet Mill, Wayanad',
        timestamp: '2026-09-12 17:00 IST',
        status: 'Completed',
        details: 'Slow 14-day drying on African raised beds under natural mountain sun.'
      },
      {
        step: 3,
        title: 'SCA Certified Cupping Assessment',
        actor: 'Q-Grader Sensory Lab',
        location: 'Kochi Specialty Lab',
        timestamp: '2026-09-16 11:00 IST',
        status: 'Completed',
        details: 'Score 86.5/100. Notes of jasmine blossom, stone fruit, and honey sweetness.'
      },
      {
        step: 4,
        title: 'Nitrogen Flushed Valve Packaging',
        actor: 'Artisan Roastery & Pack House',
        location: 'Calicut Facility',
        timestamp: '2026-09-20 15:30 IST',
        status: 'Completed',
        details: 'Sealed in one-way aroma degassing bags with individual batch QR codes.'
      },
      {
        step: 5,
        title: 'Blockchain Traceability Anchored',
        actor: 'AgriTrace Consortium Node',
        location: 'Decentralized Cluster',
        timestamp: '2026-09-21 14:00 IST',
        status: 'Completed',
        details: 'Block #1981880 registered.'
      }
    ]
  },
  {
    id: 'SPC-2026-001',
    product: 'Malabar Black Pepper Grade A',
    productCategory: 'Spices',
    producer: 'Idukki Spices Federation',
    producerId: 'USR-004',
    origin: 'Idukki High Ranges, Kerala',
    quantity: '80 KG',
    quantityNum: 80,
    unit: 'KG',
    harvestDate: '2026-08-25',
    processingDate: '2026-09-01',
    qualityCheckDate: '2026-09-05',
    packagingDate: '2026-09-10',
    blockchainDate: '2026-09-11 12:00:00 UTC',
    qualityGrade: 'Tellicherry Extra Bold (TGSEB)',
    moistureLevel: '10.8%',
    pollenCount: 'N/A',
    c4SugarAdulteration: 'N/A',
    hpmfIndex: 'N/A',
    antibioticResidue: 'Zero Aflatoxin & Mold Spores',
    status: 'Verified',
    hiveId: 'Spices Micro-Watershed Section 3',
    beeSpecies: 'Indigenous pollinators',
    floralSource: 'Mixed spice forest',
    packagingType: 'Vacuum Packed Food-Grade Poly Liners (250g x 320)',
    qrCodeGenerated: true,
    blockchain: {
      network: 'AgriTrace Consortium Ledger (Prototype)',
      blockNumber: '1979920',
      dataHash: '0x3d2178cc0182910fa31b28912882bc916e88a410982301fa3829104812301fa3',
      transactionId: '0x88201948123985710294f12bb99a18042938475819203912a9bf48019481903b',
      gasUsed: '44,900',
      smartContract: '0xAgriTraceMultiCropRegistry_01F9',
      merkleRoot: '0x3d2178cc0182910fa',
      verificationStatus: 'Verified & Tamper-Evident',
      isPrototype: true
    },
    traceabilityJourney: [
      {
        step: 1,
        title: 'Vine Ripened Harvesting',
        actor: 'Idukki Smallholder Harvesters',
        location: 'Idukki, Kerala',
        timestamp: '2026-08-25 09:00 IST',
        status: 'Completed',
        details: 'Harvested from pepper vines climbing native silver oak shade trees.'
      },
      {
        step: 2,
        title: 'Blanching & Solar Tunnel Dehydration',
        actor: 'Federation Spice Unit',
        location: 'Nedumkandam Facility',
        timestamp: '2026-09-01 14:00 IST',
        status: 'Completed',
        details: 'Controlled solar drying keeping piperine oil content above 4.8%.'
      },
      {
        step: 3,
        title: 'Spices Board Quality Clearance',
        actor: 'Spices Board Regional Quality Lab',
        location: 'Kochi Lab',
        timestamp: '2026-09-05 16:00 IST',
        status: 'Completed',
        details: 'Grade TGSEB certified (Diameter >4.75mm).'
      },
      {
        step: 4,
        title: 'Blockchain Verification Anchor',
        actor: 'AgriTrace Ledger Engine',
        location: 'Node Cluster',
        timestamp: '2026-09-11 17:30 IST',
        status: 'Completed',
        details: 'Transaction 0x88201948... confirmed.'
      }
    ]
  },
  {
    id: 'MNG-2026-001',
    product: 'GI-Tagged Alphonso Mango',
    productCategory: 'Fruits',
    producer: 'Konkan Mango Growers Guild',
    producerId: 'USR-004',
    origin: 'Ratnagiri, Maharashtra',
    quantity: '200 KG',
    quantityNum: 200,
    unit: 'KG',
    harvestDate: '2026-05-18',
    processingDate: '2026-05-20',
    qualityCheckDate: '2026-05-22',
    packagingDate: '2026-05-23',
    blockchainDate: '2026-05-24 10:15:00 UTC',
    qualityGrade: 'GI Certified Table Grade 1',
    moistureLevel: 'N/A (Brix 19.5°)',
    pollenCount: 'N/A',
    c4SugarAdulteration: 'N/A',
    hpmfIndex: 'N/A',
    antibioticResidue: 'Zero Carbide / 100% Tree Ripened',
    status: 'Verified',
    hiveId: 'Devgad Coastal Orchard Orchard #D-12',
    beeSpecies: 'Apis cerana orchard colonies',
    floralSource: 'Mango blossom canopy',
    packagingType: 'Cushioned Corrugated Boxes (1 Dozen/box, 50 Boxes)',
    qrCodeGenerated: true,
    blockchain: {
      network: 'AgriTrace Consortium Ledger (Prototype)',
      blockNumber: '1964110',
      dataHash: '0x1b9022fd810237bca4018274191bc30029c31b54e21a084128df73a90184b2c1',
      transactionId: '0x102938475819203912a9bf48019481903ba820194812398574f12bb99a180429',
      gasUsed: '43,800',
      smartContract: '0xAgriTraceMultiCropRegistry_01F9',
      merkleRoot: '0x1b9022fd810237b',
      verificationStatus: 'Verified & Tamper-Evident',
      isPrototype: true
    },
    traceabilityJourney: [
      {
        step: 1,
        title: 'Tree-Plucked at Full Maturity',
        actor: 'Devgad Orchard Specialist',
        location: 'Devgad, Ratnagiri, Maharashtra',
        timestamp: '2026-05-18 06:30 IST',
        status: 'Completed',
        details: 'Stem cut with 1cm pedicel to prevent sap burns on fruit skin.'
      },
      {
        step: 2,
        title: 'Natural Ethylene Ripening Chamber',
        actor: 'Konkan Cold Hub',
        location: 'Ratnagiri Agro Park',
        timestamp: '2026-05-20 18:00 IST',
        status: 'Completed',
        details: 'Zero calcium carbide; 100% natural hay bedding ripening.'
      },
      {
        step: 3,
        title: 'APEDA Hot Water Treatment & GI Stamp',
        actor: 'APEDA Inspection Facility',
        location: 'Vashi Testing Station',
        timestamp: '2026-05-22 14:00 IST',
        status: 'Completed',
        details: 'GI Tag registration # Ratnagiri-Hapuz-2026 verified.'
      },
      {
        step: 4,
        title: 'Traceability Hash Anchored',
        actor: 'AgriTrace Ledger Engine',
        location: 'Blockchain Node #4',
        timestamp: '2026-05-24 15:45 IST',
        status: 'Completed',
        details: 'Block #1964110 confirmed.'
      }
    ]
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'NOTIF-001',
    title: 'New Batch Created & Verified',
    message: 'Honey Batch HNY-2026-001 has been registered on the prototype blockchain ledger (Block #1984210).',
    type: 'success',
    timestamp: '10 mins ago',
    read: false,
    link: '/batches/HNY-2026-001'
  },
  {
    id: 'NOTIF-002',
    title: 'Hive Inspection Due',
    message: 'HIVE-005 in Western Ghats Sector 5 has reached its 25-day routine inspection window.',
    type: 'warning',
    timestamp: '1 hour ago',
    read: false,
    link: '/hives/HIVE-005'
  },
  {
    id: 'NOTIF-003',
    title: 'QR Code Generated',
    message: 'High-resolution consumer verification QR code generated for Raw Wildflower Honey (HNY-2026-001).',
    type: 'info',
    timestamp: '2 hours ago',
    read: false,
    link: '/qr'
  },
  {
    id: 'NOTIF-004',
    title: 'Customer Verification Successful',
    message: 'Consumer Anita Verma in Mumbai scanned and verified authenticity for Batch HNY-2026-001.',
    type: 'success',
    timestamp: '3 hours ago',
    read: true,
    link: '/verification'
  },
  {
    id: 'NOTIF-005',
    title: 'Quality Check Completed',
    message: 'NABL lab reports logged for HNY-2026-002: 18.1% moisture, C4 negative, Grade A+ Special.',
    type: 'info',
    timestamp: 'Yesterday',
    read: true,
    link: '/batches/HNY-2026-002'
  },
  {
    id: 'NOTIF-006',
    title: 'Verification Flag / Warning',
    message: 'Attempted verification for unknown batch ID "INVALID-001" failed data integrity check.',
    type: 'error',
    timestamp: '2 days ago',
    read: true,
    link: '/verification'
  }
];

export const MOCK_MONTHLY_PRODUCTION = [
  { month: 'Apr', honeyKg: 35, riceKg: 100, coffeeKg: 0 },
  { month: 'May', honeyKg: 52, riceKg: 150, coffeeKg: 0 },
  { month: 'Jun', honeyKg: 40, riceKg: 80, coffeeKg: 20 },
  { month: 'Jul', honeyKg: 30, riceKg: 90, coffeeKg: 35 },
  { month: 'Aug', honeyKg: 78, riceKg: 180, coffeeKg: 45 },
  { month: 'Sep', honeyKg: 150, riceKg: 500, coffeeKg: 120 }
];
