import mongoose from 'mongoose';

const honeyHarvestSchema = new mongoose.Schema(
  {
    harvestId: {
      type: String,
      required: [true, 'Harvest ID is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    hiveId: {
      type: String,
      required: [true, 'Source Hive ID is required'],
      trim: true,
      uppercase: true
    },
    hiveRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hive'
    },
    beekeeperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Beekeeper ID is required']
    },
    harvestDate: {
      type: Date,
      default: Date.now
    },
    honeyType: {
      type: String,
      required: [true, 'Honey Type is required'],
      trim: true
    },
    quantity: {
      type: Number,
      required: [true, 'Harvest Quantity is required'],
      min: [0.1, 'Quantity must be greater than zero']
    },
    unit: {
      type: String,
      default: 'KG'
    },
    floralSource: {
      type: String,
      required: [true, 'Floral Source is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Extraction Location is required'],
      trim: true
    },
    moistureLevel: {
      type: String,
      required: [true, 'Moisture level is required'],
      trim: true,
      default: '17.8%'
    },
    initialQuality: {
      type: String,
      default: 'Grade A+ (Premium)'
    },
    batchId: {
      type: String,
      default: null
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const HoneyHarvest = mongoose.model('HoneyHarvest', honeyHarvestSchema);
export default HoneyHarvest;
