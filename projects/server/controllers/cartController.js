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

      // Check if the product already exists in the order_items table for the user
      const checkProductQuery = `
      SELECT * 
      FROM order_items 
      WHERE id_user = ${db.escape(id_user)} 
      AND id_product = ${db.escape(id_product)}
      AND id_order IS NULL
    `;
      const existingProduct = await query(checkProductQuery);

      if (existingProduct.length > 0) {
        // Update the quantity of the existing product for the specific user
        const updateQuantityQuery = `
        UPDATE order_items 
        SET quantity = quantity + ${db.escape(quantity)} 
        WHERE id_user = ${db.escape(id_user)} 
        AND id_product = ${db.escape(id_product)}
        AND id_order IS NULL
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

        // Get the updated quantity from order_items
        const getQuantityQuery = `
        SELECT quantity 
        FROM order_items 
        WHERE id_user = ${db.escape(id_user)} 
        AND id_product = ${db.escape(id_product)}
        AND id_order IS NULL
      `;
        const updatedQuantity = await query(getQuantityQuery);
        const quantityInCart = updatedQuantity[0].quantity;

        res.status(200).send({
          message: "Product quantity updated in the cart",
          quantity: quantityInCart,
          product: product[0],
        });
      } else {
        // Insert the product as a new item in the order_items table for the specific user
        const addProductToCartQuery = `
        INSERT INTO order_items (id_user, id_product, quantity) 
        VALUES (${db.escape(id_user)}, ${db.escape(id_product)}, ${db.escape(
          quantity
        )})
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
          product: product[0],
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
      SELECT oi.quantity, p.* 
      FROM order_items oi
      INNER JOIN products p ON oi.id_product = p.id_product
      WHERE oi.id_user = ${db.escape(id_user)}
      AND oi.id_order IS NULL
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
        UPDATE order_items
        SET quantity = quantity + 1
        WHERE id_user = ${db.escape(id_user)}
        AND id_product = ${db.escape(id_product)}
        AND id_order IS NULL
      `;
      } else if (action === "decrease") {
        updateQuantityQuery = `
        UPDATE order_items
        SET quantity = quantity - 1
        WHERE id_user = ${db.escape(id_user)}
        AND id_product = ${db.escape(id_product)}
        AND id_order IS NULL
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
      DELETE FROM order_items
      WHERE id_user = ${db.escape(id_user)}
      AND id_product = ${db.escape(id_product)}
      AND id_order IS NULL
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
