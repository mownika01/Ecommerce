const Product = require("../models/Product");

const calculateTotal = async (items) => {
  return items.reduce((acc, item) => {
    // If product is populated, use item.product.price
    // If not, it might be item.price depending on your schema
    const price = item.product?.price || item.price || 0;
    const quantity = item.quantity || 0;
    
    return acc + (price * quantity);
  }, 0);
};


module.exports = calculateTotal;