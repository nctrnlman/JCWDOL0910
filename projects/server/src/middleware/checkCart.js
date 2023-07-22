const { db, query } = require("../database");
const { getIdFromToken } = require("../helper/jwt-payload");

const checkQuantityCartItems = async (req, res, next) => {
  try {
    // Get all products from the cart_items table
    const getCartItemsQuery = `SELECT * FROM cart_items;`;
    const cartItems = await query(getCartItemsQuery);

    for (const cartItem of cartItems) {
      // Get the total stock of the product from the stocks table
      const id_product = cartItem.id_product;
      const checkAllStockQuery = `SELECT SUM(total_stock) as total_stock FROM stocks WHERE id_product = ${db.escape(
        id_product
      )};`;
      const stockResult = await query(checkAllStockQuery);

      const totalStock = stockResult[0].total_stock;
      const cartItemQuantity = cartItem.quantity;

      // If the cart item quantity is greater than the total stock, update the cart item quantity
      if (cartItemQuantity > totalStock) {
        const updateQuantityQuery = `UPDATE cart_items SET quantity = ${totalStock} WHERE id_product = ${db.escape(
          id_product
        )};`;
        await query(updateQuantityQuery);
      }
    }

    next();
  } catch (error) {
    console.error("Error updating cart item quantities: ", error);
    res.status(500).send({
      error: "An error occurred while updating cart item quantities",
    });
  }
};

module.exports = { checkQuantityCartItems };
