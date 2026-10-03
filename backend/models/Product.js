import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, 'Product ID is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    productCategory: {
      type: String,
      required: [true, 'Product Category is required'],
      enum: {
        values: [
          'HONEY',
          'RICE',
          'WHEAT',
          'COFFEE',
          'SPICES',
          'FRUIT',
          'VEGETABLE',
          'OTHER'
        ],
        message: '{VALUE} is not a valid category'
      },
      default: 'HONEY',
      uppercase: true
    },
    productName: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    producerName: {
      type: String,
      default: ''
    },
    origin: {
      type: String,
      required: [true, 'Geographical origin is required'],
      trim: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    standards: {
      type: [String],
      default: ['FSSAI Jaivik Bharat', 'NABL Lab Tested']
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
