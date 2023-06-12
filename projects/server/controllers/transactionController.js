require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { getUserIdFromToken } = require("../helper/jwt-payload");

module.exports = {
  addToCart: async (req, res) => {
    try {
      const { id_product, quantity } = req.body;
      const id_user = getUserIdFromToken(req, res);

      // Validate parameters
      if (!id_user || !id_product || !quantity) {
        return res.status(400).send("Invalid parameters");
      }

      const existingCartQuery = "SELECT id_order FROM orders WHERE id_user = ?";
      const [existingCart] = await query(existingCartQuery, [
        db.escape(id_user),
      ]);

      let id_order = existingCart?.id_order;

      //   create new orders or new cart
      if (!id_order) {
        const newCartQuery = `INSERT INTO orders (id_user, id_warehouse, total_amount, shipping_method, status, payment_proof, created_at) VALUES (${db.escape(
          id_user
        )}, null, null, null, null, null, NOW())`;
        const newCartResult = await query(newCartQuery);
        id_order = newCartResult.insertId;
      }

      //   already have orders or cart
      const existingCartItemQuery =
        "SELECT * FROM order_items WHERE id_product = ? AND id_order = ?";
      const [existingCartItem] = await query(existingCartItemQuery, [
        db.escape(id_product),
        db.escape(id_order),
      ]);

      let totalAmount = 0;
      // update product when is already in the cart of user
      if (existingCartItem) {
        const existingQuantity = existingCartItem.quantity;
        const newQuantity = existingQuantity + parseInt(quantity);

        const updateCartItemQuery =
          "UPDATE order_items SET quantity = ? WHERE id_product = ? AND id_order = ?";
        await query(updateCartItemQuery, [
          db.escape(newQuantity),
          db.escape(id_product),
          db.escape(id_order),
        ]);

        const updatedProductQuery =
          "SELECT p.name, p.price FROM products p WHERE id_product = ?";
        const [updatedProduct] = await query(updatedProductQuery, [
          db.escape(id_product),
        ]);

        const totalAmountQuery =
          "SELECT SUM(p.price * oi.quantity) AS total_amount FROM products p INNER JOIN order_items oi ON p.id_product = oi.id_product WHERE oi.id_order = ?";
        const [totalAmountResult] = await query(totalAmountQuery, [
          db.escape(id_order),
        ]);
        totalAmount = parseInt(totalAmountResult.total_amount);

        const updateTotalAmountQuery =
          "UPDATE orders SET total_amount = ? WHERE id_order = ?";
        await query(updateTotalAmountQuery, [
          db.escape(totalAmount),
          db.escape(id_order),
        ]);

        return res.status(200).json({
          message: "Product quantity updated in cart",
          product: updatedProduct,
          quantity: newQuantity,
          total_amount: totalAmount,
        });
      }

      //   add new product in cart user
      const insertCartItemQuery = `INSERT INTO order_items (id_product, id_order, quantity) VALUES (${db.escape(
        id_product
      )}, ${db.escape(id_order)}, ${db.escape(quantity)})`;
      await query(insertCartItemQuery);

      const newProductQuery =
        "SELECT p.name, p.price FROM products p WHERE id_product = ?";
      const [newProduct] = await query(newProductQuery, [
        db.escape(id_product),
      ]);

      const totalAmountQuery =
        "SELECT SUM(p.price * oi.quantity) AS total_amount FROM products p INNER JOIN order_items oi ON p.id_product = oi.id_product WHERE oi.id_order = ?";
      const [totalAmountResult] = await query(totalAmountQuery, [
        db.escape(id_order),
      ]);
      totalAmount = parseInt(totalAmountResult.total_amount);

      const updateTotalAmountQuery =
        "UPDATE orders SET total_amount = ? WHERE id_order = ?";
      await query(updateTotalAmountQuery, [
        db.escape(totalAmount),
        db.escape(id_order),
      ]);

      return res.status(200).json({
        message: "Product added to cart",
        product: newProduct,
        quantity: quantity,
        total_amount: totalAmount,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
