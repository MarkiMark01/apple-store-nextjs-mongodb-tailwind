import mongoose from "mongoose";
import { Product } from '../../models/Product'; 

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected'); 

    const products = await Product.find();
    

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {

    console.error('Error fetching products:', error);


    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
