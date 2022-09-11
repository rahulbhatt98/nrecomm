import express from 'express';
import slider_images from '../Data/slider_images.js';
import Product from '../models/productModel.js';
import { getProductByName } from '../controllers/productControllers.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.post('/product', getProductByName);

router.get('/slider_images', (req, res) => {
  res.json(slider_images);
});
export default router;
