import mongoose from 'mongoose';

const hiveSchema = new mongoose.Schema(
  {
    hiveId: {
      type: String,
      required: [true, 'Hive ID is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    beekeeperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Beekeeper reference is required']
    },
    hiveName: {
      type: String,
      required: [true, 'Hive Name is required'],
      trim: true
    },
    apiaryLocation: {
      type: String,
      required: [true, 'Apiary Location is required'],
      trim: true
    },
    latitude: {
      type: Number,
      default: 12.4244
    },
    longitude: {
      type: Number,
      default: 75.7382
    },
    beeSpecies: {
      type: String,
      required: [true, 'Bee Species is required'],
      default: 'Apis mellifera'
    },
    queenStatus: {
      type: String,
      default: 'Laying Queen (Marked)'
    },
    colonyStrength: {
      type: String,
      enum: ['Strong', 'Moderate', 'Developing', 'Weak'],
      default: 'Strong'
    },
    installationDate: {
      type: Date,
      default: Date.now
    },
    lastInspectionDate: {
      type: Date,
      default: Date.now
    },
    healthStatus: {
      type: String,
      enum: ['Healthy', 'Attention Required', 'Inspection Due'],
      default: 'Healthy'
    },
    temperature: {
      type: String,
      default: '34.8°C'
    },
    humidity: {
      type: String,
      default: '58%'
    },
    hiveWeight: {
      type: String,
      default: '42.5 KG'
    },
    framesCount: {
      type: Number,
      default: 10
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

const Hive = mongoose.model('Hive', hiveSchema);
export default Hive;
