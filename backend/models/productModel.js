import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    product_id: {
      type: Number,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_brand: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_rating: {
      type: Number,
      required: true,
      default: 0,
    },
    product_numReviews: {
      type: Number,
      default: 0,
      required: true,
    },
    product_price: {
      type: Number,
      default: 0,
      required: true,
    },
    product_countInStock: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
