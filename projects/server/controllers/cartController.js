const { db, query } = require("../database");
const { getIdFromToken } = require("../helper/jwt-payload");

module.exports = {
  addProductToCart: async (req, res) => {
    const { id_product, quantity } = req.body;
    const id_user = getIdFromToken(req, res);
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

      // Check if the product is already in the cart
      const checkProductInCartQuery = `
        SELECT ci.quantity
        FROM cart_items ci
        WHERE ci.id_user = ${db.escape(id_user)}
        AND ci.id_product = ${db.escape(id_product)}
      `;
      const productInCart = await query(checkProductInCartQuery);

      if (productInCart.length > 0) {
        const currentQuantity = productInCart[0].quantity;
        const updatedQuantity = currentQuantity + quantity;

        if (updatedQuantity > availableStock) {
          res.status(400).send({
            message: "Insufficient stock",
          });
          return;
        }

        // Update the quantity of the existing product in the cart
        const updateQuantityQuery = `
          UPDATE cart_items
          SET quantity = ${db.escape(updatedQuantity)}
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

        res.status(200).send({
          message: "Product quantity updated in the cart",
          quantity: updatedQuantity,
          product: product[0],
        });
      } else {
        if (quantity > availableStock) {
          res.status(400).send({
            message: "Insufficient stock",
          });
          return;
        }

        // Insert the product as a new item in the cart_items table for the specific user
        const addProductToCartQuery = `
          INSERT INTO cart_items (id_user, id_product, quantity)
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
    const id_user = getIdFromToken(req, res);
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
    const id_user = getIdFromToken(req, res);
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

      // Check the current quantity of the product in the cart
      const getCurrentQuantityQuery = `
        SELECT ci.quantity
        FROM cart_items ci
        WHERE ci.id_user = ${db.escape(id_user)}
        AND ci.id_product = ${db.escape(id_product)}
      `;
      const currentQuantityResult = await query(getCurrentQuantityQuery);
      const currentQuantity =
        currentQuantityResult.length > 0
          ? currentQuantityResult[0].quantity
          : 0;

      let updatedQuantity;

      if (action === "increase") {
        updatedQuantity = currentQuantity + 1;
      } else if (action === "decrease") {
        updatedQuantity = currentQuantity - 1;
        if (updatedQuantity < 0) {
          res.status(400).send({
            error: "Quantity cannot be less than zero",
          });
          return;
        }
      } else {
        res.status(400).send({
          error: "Invalid action",
        });
        return;
      }

      if (updatedQuantity > availableStock) {
        res.status(400).send({
          message: "Insufficient stock",
        });
        return;
      }

      // Update the quantity of the product in the cart
      const updateQuantityQuery = `
        UPDATE cart_items
        SET quantity = ${db.escape(updatedQuantity)}
        WHERE id_user = ${db.escape(id_user)}
        AND id_product = ${db.escape(id_product)}
      `;
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
    const id_user = getIdFromToken(req, res);
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
