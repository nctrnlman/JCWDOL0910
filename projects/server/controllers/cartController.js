const { db, query } = require("../database");
const { getUserIdFromToken } = require("../helper/jwt-payload");

module.exports = {
  addProductToCart: async (req, res) => {
    const { id_product, quantity } = req.body;
    const id_user = getUserIdFromToken(req, res);
    try {
      // Check if the product exists and has sufficient stock
      const checkStockQuery = `
      SELECT SUM(total_stock) AS total_stock
      FROM stocks
      WHERE id_product = ${db.escape(id_product)}
    `;
      const stockResult = await query(checkStockQuery);
      const availableStock =
        stockResult.length > 0 ? stockResult[0].total_stock : 0;

      if (quantity > availableStock) {
        res.status(400).send({
          message: "Insufficient stock",
        });
        return;
      }

      // Check if the product already exists in the cart_items table
      const checkProductQuery = `
      SELECT * 
      FROM cart_items 
      WHERE id_user = ${db.escape(id_user)} 
      AND id_product = ${db.escape(id_product)}
    `;
      const existingProduct = await query(checkProductQuery);

      if (existingProduct.length > 0) {
        // Update the quantity of the existing product
        const updateQuantityQuery = `
        UPDATE cart_items 
        SET quantity = quantity + ${db.escape(quantity)} 
        WHERE id_user = ${db.escape(id_user)} 
        AND id_product = ${db.escape(id_product)}
      `;
        await query(updateQuantityQuery);

        console.log("Product quantity updated in the cart");

        // Get the updated product details
        const getProductQuery = `
        SELECT * 
        FROM products 
        WHERE id_product = ${db.escape(id_product)}
      `;
        const product = await query(getProductQuery);

        // Get the updated quantity from cart_items
        const getQuantityQuery = `
        SELECT quantity 
        FROM cart_items 
        WHERE id_user = ${db.escape(id_user)} 
        AND id_product = ${db.escape(id_product)}
      `;
        const updatedQuantity = await query(getQuantityQuery);
        const quantityInCart = updatedQuantity[0].quantity;

        res.status(200).send({
          message: "Product quantity updated in the cart",
          quantity: quantityInCart,
          product: product[0], // Assuming the query returns a single product
        });
      } else {
        // Insert the product as a new item in the cart_items table
        const addProductToCartQuery = `
        INSERT INTO cart_items (id_user, id_product, quantity, created_at) 
        VALUES (${db.escape(id_user)}, ${db.escape(id_product)}, ${db.escape(
          quantity
        )}, NOW())
      `;
        await query(addProductToCartQuery);

        console.log("Product added to the cart");

        // Get the newly added product details
        const getProductQuery = `
        SELECT * 
        FROM products 
        WHERE id_product = ${db.escape(id_product)}
      `;
        const product = await query(getProductQuery);

        res.status(200).send({
          message: "Product added to the cart",
          quantity: quantity,
          product: product[0], // Assuming the query returns a single product
        });
      }
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      res.status(500).send({
        error: "An error occurred while adding the product to the cart",
      });
    }
  },

  fetchCartItems: async (req, res) => {
    const id_user = getUserIdFromToken(req, res);
    try {
      const fetchCartItemsQuery = `
        SELECT ci.quantity, p.* 
        FROM cart_items ci
        INNER JOIN products p ON ci.id_product = p.id_product
        WHERE ci.id_user = ${db.escape(id_user)}
      `;
      const cartItems = await query(fetchCartItemsQuery);
      res.status(200).send({
        message: "Cart items fetched successfully",
        cartItems,
      });
    } catch (error) {
      console.error("Error fetching cart items: ", error);
      res.status(500).send({
        error: "An error occurred while fetching the cart items",
      });
    }
  },

  updateQuantity: async (req, res) => {
    const { id_product, action } = req.query;
    const id_user = getUserIdFromToken(req, res);
    try {
      let updateQuantityQuery;

      if (action === "increase") {
        updateQuantityQuery = `
          UPDATE cart_items
          SET quantity = quantity + 1
          WHERE id_user = ${db.escape(id_user)}
          AND id_product = ${db.escape(id_product)}
        `;
      } else if (action === "decrease") {
        updateQuantityQuery = `
          UPDATE cart_items
          SET quantity = quantity - 1
          WHERE id_user = ${db.escape(id_user)}
          AND id_product = ${db.escape(id_product)}
        `;
      } else {
        res.status(400).send({
          error: "Invalid action",
        });
        return;
      }

      await query(updateQuantityQuery);

      res.status(200).send({
        message: "Quantity updated successfully",
      });
    } catch (error) {
      console.error("Error updating quantity: ", error);
      res.status(500).send({
        error: "An error occurred while updating the quantity",
      });
    }
  },

  deleteProductFromCart: async (req, res) => {
    const { id_product } = req.query;
    const id_user = getUserIdFromToken(req, res);
    try {
      const deleteProductQuery = `
        DELETE FROM cart_items
        WHERE id_user = ${db.escape(id_user)}
        AND id_product = ${db.escape(id_product)}
      `;

      await query(deleteProductQuery);

      res.status(200).send({
        message: "Product deleted from the cart",
      });
    } catch (error) {
      console.error("Error deleting product: ", error);
      res.status(500).send({
        error: "An error occurred while deleting the product",
      });
    }
  },
};
