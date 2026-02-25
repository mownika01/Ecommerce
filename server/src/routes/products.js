const express = require("express");
const router = express.Router();

const {
  create,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/products.controller');

router.post("/", create);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;