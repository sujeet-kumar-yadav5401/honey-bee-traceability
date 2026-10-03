import mongoose from 'mongoose';

const productBatchSchema = new mongoose.Schema(
  {
    batchId: {
      type: String,
      required: [true, 'Batch ID is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    productCategory: {
      type: String,
      required: [true, 'Product Category is required'],
      uppercase: true,
      default: 'HONEY'
    },
    productName: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true
    },
    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    producerName: {
      type: String,
      default: 'Coorg Certified Apiary'
    },
    sourceId: {
      type: String,
      default: ''
    },
    productionDate: {
      type: Date,
      default: Date.now
    },
    harvestDate: {
      type: Date,
      default: Date.now
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required']
    },
    unit: {
      type: String,
      default: 'KG'
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      default: 'Karnataka, India'
    },
    qualityGrade: {
      type: String,
      default: 'Grade A+ Premium'
    },
    processingMethod: {
      type: String,
      default: 'Cold Settling & Gentle Micro-Mesh Filtration (<38°C)'
    },
    processingDate: {
      type: Date,
      default: Date.now
    },
    packagingDate: {
      type: Date,
      default: Date.now
    },
    packagingType: {
      type: String,
      default: '500g Food-Grade Hexagonal Glass Jars'
    },
    expiryDate: {
      type: Date
    },
    // Cryptographic hash & blockchain preparation
    dataHash: {
      type: String,
      default: ''
    },
    blockchainTransactionId: {
      type: String,
      default: ''
    },
    verificationStatus: {
      type: String,
      enum: ['Verified', 'Processing', 'Pending', 'Failed'],
      default: 'Verified'
    },
    qrCode: {
      type: String,
      default: ''
    },

    // Specific Honey Biology Fields (Optional for other crops)
    hiveId: {
      type: String,
      default: null
    },
    honeyType: {
      type: String,
      default: null
    },
    beeSpecies: {
      type: String,
      default: null
    },
    floralSource: {
      type: String,
      default: null
    },
    moistureLevel: {
      type: String,
      default: null
    },
    pollenCount: {
      type: String,
      default: '48,000 grains/g'
    },
    c4SugarAdulteration: {
      type: String,
      default: 'Negative (<1.5% delta 13C)'
    },
    hpmfIndex: {
      type: String,
      default: '7.8 mg/kg'
    },
    antibioticResidue: {
      type: String,
      default: 'ND (Not Detected)'
    }
  },
  {
    timestamps: true
  }
);

// Virtual for formatted quantity string
productBatchSchema.virtual('formattedQuantity').get(function () {
  return `${this.quantity} ${this.unit}`;
});

const ProductBatch = mongoose.model('ProductBatch', productBatchSchema);
export default ProductBatch;
