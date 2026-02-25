const Cart = require("../models/Cart");
const Product = require("../models/Product");
const calculateTotal = require("../utils/calculateAmount");
const { successResponse } = require("../utils/response");

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price slug image");
    if (!cart) return successResponse(res, { items: [], totalAmount: 0 });

    cart.totalAmount = await calculateTotal(cart.items);
    await cart.save();

    return successResponse(res, cart);
  } catch (err) {
    next(err);
  }
};

const mergeCart = async (req, res, next) => {
  try {
    const guestItems = req.body.items;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    for (const item of guestItems) {
      const existingIndex = cart.items.findIndex(i => i.product.toString() === item.productId);
      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += item.quantity;
      } else {
        cart.items.push({ product: item.productId, quantity: item.quantity });
      }
    }

    cart.totalAmount = await calculateTotal(cart.items);
    await cart.save();
    return successResponse(res, cart, "Cart merged successfully");
  } catch (err) {
    next(err);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      const error = new Error("Product not found or inactive");
      error.statusCode = 404;
      return next(error);
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.totalAmount = await calculateTotal(cart.items);
    await cart.save();

    return successResponse(res, cart, "Item added to cart");
  } catch (err) {
    next(err);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) throw { statusCode: 404, message: "Cart not found" };

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
    if (itemIndex === -1) throw { statusCode: 404, message: "Product not in cart" };

    if (quantity <= 0) cart.items.splice(itemIndex, 1);
    else cart.items[itemIndex].quantity = quantity;

    cart.totalAmount = await calculateTotal(cart.items);
    await cart.save();
    return successResponse(res, cart, "Cart updated");
  } catch (err) {
    next(err);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) throw { statusCode: 404, message: "Cart not found" };

    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    cart.totalAmount = await calculateTotal(cart.items);
    await cart.save();
    return successResponse(res, cart, "Item removed from cart");
  } catch (err) {
    next(err);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return successResponse(res, {});
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();
    return successResponse(res, {}, "Cart cleared");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
  mergeCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};