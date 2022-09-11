import express from 'express';
import {
  registerUser,
  authUser,
  updateUserProfile,
  forgotPassword,
  addWishList,
  getUser,
  removeWishList,
  addCart,
  addCard,
  addOrder,
  addAddress,
  removeCart,
} from '../controllers/userControllers.js';
const router = express.Router();

router.post('/user', getUser);
router.post('/login', authUser);
router.route('/').post(registerUser);
router.put('/profile', updateUserProfile);
router.put('/forgotPassword', forgotPassword);
router.put('/addwishlist', addWishList);
router.put('/removeWishlist', removeWishList);
router.put('/removeCart', removeCart);

router.put('/addCart', addCart);
router.put('/addAddress', addAddress);
router.put('/addCard', addCard);
router.put('/addOrder', addOrder);
export default router;
