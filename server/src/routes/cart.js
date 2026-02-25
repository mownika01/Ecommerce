const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const  authMiddleware  = require("../middleware/authMiddleware");

router.get("/", authMiddleware, cartController.getCart);
router.post("/merge", authMiddleware, cartController.mergeCart);
router.post("/add", authMiddleware, cartController.addToCart);
router.patch("/update", authMiddleware, cartController.updateCartItem);
router.delete("/remove", authMiddleware, cartController.removeFromCart);
router.delete("/clear", authMiddleware, cartController.clearCart);

module.exports = router;