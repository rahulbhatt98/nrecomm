import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Product from '../models/productModel.js';
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    console.error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
    gender,
    phone,
  });
  console.log(user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    console.error('User Not Found');
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.json(user);
    }
  } catch (error) {
    console.log(error.message);
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or password');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { id, email } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

const addWishList = asyncHandler(async (req, res) => {
  console.log('Inside addwishlist');
  try {
    const { email, product_name } = req.body;
    const user = await User.findOne({ email });
    const product = await Product.findOne({ product_name });

    console.log(product);
    if (user) {
      user.wishlist.push(product);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

const removeWishList = asyncHandler(async (req, res) => {
  console.log('Inside removeWishlist');
  try {
    const { email, productName } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      console.log(user['wishlist']);
      user['wishlist'] = user['wishlist'].filter((pro) => {
        console.log('pro is', pro.product_name);
        console.log('product is  ', productName);
        return pro.product_name !== productName;
      });
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

const removeCart = asyncHandler(async (req, res) => {
  console.log('Inside remove Cart');
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      user.cartItems = [];
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

const addCart = asyncHandler(async (req, res) => {
  console.log('Inside addCart');
  try {
    const { email, product_name, qty } = req.body;
    const user = await User.findOne({ email });
    let product = await Product.findOne({ product_name });
    console.log({ product });
    if (user) {
      user.cartItems.push({
        product_name: product.product_name,
        product_image: product.product_image,
        product_price: product.product_price,
        product_rating: product.product_rating,
        qty,
      });
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

const addCard = asyncHandler(async (req, res) => {
  console.log('Inside addCart');
  try {
    const { email, card_no } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.card.unshift(card_no);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});
const addAddress = asyncHandler(async (req, res) => {
  console.log('Inside addCart');
  try {
    const { email, house_no, street_name, city, state } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.address.unshift({ house_no, street_name, city, state });
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

const addOrder = asyncHandler(async (req, res) => {
  console.log('Inside addOrder');
  try {
    const { email, product_name, qty } = req.body;
    const user = await User.findOne({ email });
    let product = await Product.findOne({ product_name });

    if (user) {
      user.order.push({
        product_name: product.product_name,
        product_image: product.product_image,
        product_price: product.product_price,
        product_rating: product.product_rating,
        qty,
      });
      const updatedUser = await user.save();
      res.json(updatedUser);
    }
  } catch (error) {
    console.log(error);
  }
});
export {
  registerUser,
  authUser,
  updateUserProfile,
  forgotPassword,
  addWishList,
  getUser,
  removeWishList,
  addCart,
  addCard,
  addAddress,
  addOrder,
  removeCart,
};
