// cartQueries.js
const { db, query } = require("../database");

module.exports = {
  checkStock: async (id_product) => {
    const checkStockQuery = `
      SELECT SUM(total_stock) AS total_stock
      FROM stocks
      WHERE id_product = ${db.escape(id_product)}
    `;
    const stockResult = await query(checkStockQuery);
    return stockResult.length > 0 ? stockResult[0].total_stock : 0;
  },

  checkProductInCart: async (id_user, id_product) => {
    const checkProductInCartQuery = `
      SELECT ci.quantity
      FROM cart_items ci
      WHERE ci.id_user = ${db.escape(id_user)}
      AND ci.id_product = ${db.escape(id_product)}
    `;
    const productInCart = await query(checkProductInCartQuery);
    return productInCart;
  },

  updateQuantityInCart: async (id_user, id_product, updatedQuantity) => {
    const updateQuantityQuery = `
      UPDATE cart_items
      SET quantity = ${db.escape(updatedQuantity)}
      WHERE id_user = ${db.escape(id_user)}
      AND id_product = ${db.escape(id_product)}
    `;
    await query(updateQuantityQuery);
  },

  getProductDetails: async (id_product) => {
    const getProductQuery = `
      SELECT *
      FROM products
      WHERE id_product = ${db.escape(id_product)}
    `;
    const product = await query(getProductQuery);
    return product[0];
  },

  addProductToCart: async (id_user, id_product, quantity) => {
    const addProductToCartQuery = `
      INSERT INTO cart_items (id_user, id_product, quantity)
      VALUES (${db.escape(id_user)}, ${db.escape(id_product)}, ${db.escape(
      quantity
    )})
    `;
    await query(addProductToCartQuery);
  },

  fetchCartItems: async (id_user) => {
    const fetchCartItemsQuery = `
      SELECT ci.quantity, p.* 
      FROM cart_items ci
      INNER JOIN products p ON ci.id_product = p.id_product
      WHERE ci.id_user = ${db.escape(id_user)}
    `;
    const cartItems = await query(fetchCartItemsQuery);
    return cartItems;
  },

  getCurrentQuantity: async (id_user, id_product) => {
    const getCurrentQuantityQuery = `
      SELECT ci.quantity
      FROM cart_items ci
      WHERE ci.id_user = ${db.escape(id_user)}
      AND ci.id_product = ${db.escape(id_product)}
    `;
    const currentQuantityResult = await query(getCurrentQuantityQuery);
    return currentQuantityResult.length > 0
      ? currentQuantityResult[0].quantity
      : 0;
  },

  updateQuantity: async (id_user, id_product, updatedQuantity) => {
    const updateQuantityQuery = `
      UPDATE cart_items
      SET quantity = ${db.escape(updatedQuantity)}
      WHERE id_user = ${db.escape(id_user)}
      AND id_product = ${db.escape(id_product)}
    `;
    await query(updateQuantityQuery);
  },

  deleteProductFromCart: async (id_user, id_product) => {
    const deleteProductQuery = `
      DELETE FROM cart_items
      WHERE id_user = ${db.escape(id_user)}
      AND id_product = ${db.escape(id_product)}
    `;
    await query(deleteProductQuery);
  },
};
