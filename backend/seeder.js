import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './Data/products_name.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  console.log('Inside import');
  try {
    const sampleProducts = products.map((product) => {
      return { ...product };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
