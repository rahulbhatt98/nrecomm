import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getProductByName = asyncHandler(async (req, res) => {
  try {
    const { product_name } = req.body;
    const product = await Product.findOne({ product_name });
    if (product) {
      res.json(product);
    }
  } catch (error) {
    console.log(error);
  }
});

export { getProductByName };
