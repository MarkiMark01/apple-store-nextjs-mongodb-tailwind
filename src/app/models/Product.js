import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

export const Product = mongoose.models.Product || mongoose.model('Product', productsSchema);

