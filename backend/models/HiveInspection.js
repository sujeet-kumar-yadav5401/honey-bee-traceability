import mongoose from 'mongoose';

const hiveInspectionSchema = new mongoose.Schema(
  {
    inspectionId: {
      type: String,
      required: [true, 'Inspection ID is required'],
      unique: true,
      trim: true
    },
    hiveId: {
      type: String,
      required: [true, 'Hive ID reference is required'],
      trim: true,
      uppercase: true
    },
    hiveRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hive'
    },
    inspectionDate: {
      type: Date,
      default: Date.now
    },
    colonyStrength: {
      type: String,
      enum: ['Strong', 'Moderate', 'Developing', 'Weak'],
      default: 'Strong'
    },
    queenPresent: {
      type: Boolean,
      default: true
    },
    broodCondition: {
      type: String,
      default: 'Healthy & Regular'
    },
    foodAvailability: {
      type: String,
      default: 'High Honey Stores'
    },
    diseaseObservation: {
      type: String,
      default: 'None Detected'
    },
    pestObservation: {
      type: String,
      default: 'No Varroa or Hive Beetle'
    },
    temperature: {
      type: String,
      default: '34.8°C'
    },
    humidity: {
      type: String,
      default: '58%'
    },
    notes: {
      type: String,
      default: ''
    },
    inspector: {
      type: String,
      required: [true, 'Inspector name is required']
    }
  },
  {
    timestamps: true
  }
);

const HiveInspection = mongoose.model('HiveInspection', hiveInspectionSchema);
export default HiveInspection;
