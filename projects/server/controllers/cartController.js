const { db, query } = require("../database");
const { getIdFromToken } = require("../helper/jwt-payload");
const cartQueries = require("../queries/cartQueries");

module.exports = {
  addProductToCart: async (req, res) => {
    const { id_product, quantity } = req.body;
    const id_user = getIdFromToken(req, res);
    try {
      // Check if the product exists and has sufficient stock
      const availableStock = await cartQueries.checkStock(id_product);

      // Check if the product is already in the cart
      const productInCart = await cartQueries.checkProductInCart(
        id_user,
        id_product
      );

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
        await cartQueries.updateQuantityInCart(
          id_user,
          id_product,
          updatedQuantity
        );

        // Get the updated product details
        const product = await cartQueries.getProductDetails(id_product);

        res.status(200).send({
          message: "Product added to the cart",
          quantity: updatedQuantity,
          product: product,
        });
      } else {
        if (quantity > availableStock) {
          res.status(400).send({
            message: "Insufficient stock",
          });
          return;
        }

        // Insert the product as a new item in the cart_items table for the specific user
        await cartQueries.addProductToCart(id_user, id_product, quantity);

        // Get the newly added product details
        const product = await cartQueries.getProductDetails(id_product);

        res.status(200).send({
          message: "Product added to the cart",
          quantity: quantity,
          product: product,
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
      const cartItems = await cartQueries.fetchCartItems(id_user);

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
      const availableStock = await cartQueries.checkStock(id_product);

      // Check the current quantity of the product in the cart
      const currentQuantity = await cartQueries.getCurrentQuantity(
        id_user,
        id_product
      );

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
      await cartQueries.updateQuantity(id_user, id_product, updatedQuantity);

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
      await cartQueries.deleteProductFromCart(id_user, id_product);

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
