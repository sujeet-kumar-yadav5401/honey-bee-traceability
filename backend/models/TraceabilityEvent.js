import mongoose from 'mongoose';

const traceabilityEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: [true, 'Event ID is required'],
      unique: true,
      trim: true
    },
    batchId: {
      type: String,
      required: [true, 'Batch ID is required'],
      trim: true,
      uppercase: true
    },
    eventType: {
      type: String,
      required: [true, 'Event Type is required'],
      enum: [
        'HIVE_CREATED',
        'HIVE_INSPECTED',
        'HARVESTED',
        'COLLECTED',
        'PROCESSED',
        'QUALITY_CHECKED',
        'PACKAGED',
        'DISTRIBUTED',
        'BLOCKCHAIN_REGISTERED',
        'CUSTOMER_VERIFIED'
      ],
      default: 'PROCESSED'
    },
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    actor: {
      type: String,
      required: [true, 'Actor / Operator is required'],
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    dataHash: {
      type: String,
      default: ''
    },
    blockchainStatus: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Anchored', 'Simulated'],
      default: 'Confirmed'
    },
    stepNumber: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

const TraceabilityEvent = mongoose.model('TraceabilityEvent', traceabilityEventSchema);
export default TraceabilityEvent;
