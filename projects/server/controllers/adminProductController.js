require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { parseTotalStock } = require("../helper/productHelper");
const allowedExtensions = ["jpg", "jpeg", "png"];
const maxFileSize = 5 * 1024 * 1024; // 5MB

module.exports = {
  fetchProducts: async (req, res) => {
    try {
      let { page } = req.query;
      const itemsPerPage = 10;

      page = parseInt(page);
      if (isNaN(page) || page < 1) {
        page = 1;
      }

      const offset = (page - 1) * itemsPerPage;

      const productsQuery = `
         SELECT p.*, c.name AS category_name, SUM(s.total_stock) AS total_stock
        FROM products p
        INNER JOIN stocks s ON p.id_product = s.id_product
        INNER JOIN categories c ON p.id_category = c.id_category
        GROUP BY p.id_product
        LIMIT ${itemsPerPage}
        OFFSET ${offset};
      `;
      const products = await query(productsQuery);
      parseTotalStock(products);
      console.log(products);
      return res.status(200).send(products);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  addProduct: async (req, res) => {
    try {
      const { id_category, name, price, description } = req.body;

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).send("No image file provided");
      }
      // Validate file extension
      const fileExtension = file.originalname.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).send("Invalid file extension");
      }

      // Validate file size
      if (file.size > maxFileSize) {
        return res.status(400).send("File size exceeds the limit");
      }

      // Get the image URL from the uploaded file
      let image_url = "";
      const { file } = req;
      if (file) {
        image_url = file ? "/" + file.filename : null;
      } else {
        throw new Error("Image is required");
      }

      // Check if the category exists
      const getCategoryQuery = `
      SELECT id_category, name FROM categories WHERE id_category = ${db.escape(
        id_category
      )};
    `;
      const categoryResult = await query(getCategoryQuery);

      if (categoryResult.length === 0) {
        return res.status(400).send("Invalid category ID");
      }

      // Check if the product name is unique within the category
      const checkProductNameQuery = `
      SELECT id_product FROM products WHERE name = ${db.escape(name)};
    `;
      const productNameResult = await query(checkProductNameQuery);

      if (productNameResult.length > 0) {
        return res.status(400).send("Product already exists");
      }

      // Insert the product into the products table
      const addProductQuery = `
      INSERT INTO products (id_category, name, price, description, image_url)
      VALUES (${db.escape(id_category)}, ${db.escape(name)}, ${db.escape(
        price
      )}, ${db.escape(description)}, ${db.escape(image_url)});
    `;
      const productResult = await query(addProductQuery);

      const insertedProductId = productResult.insertId;

      // Get all warehouses
      const getWarehousesQuery = `
      SELECT id_warehouse FROM warehouses;
    `;
      const warehouses = await query(getWarehousesQuery);

      // Insert into the stock table for all warehouses
      const insertStockPromises = warehouses.map((warehouse) => {
        const addStockQuery = `
        INSERT INTO stocks (id_product, id_warehouse, total_stock)
        VALUES (${db.escape(insertedProductId)}, ${db.escape(
          warehouse.id_warehouse
        )}, 0);
      `;
        return query(addStockQuery);
      });

      await Promise.all(insertStockPromises);

      return res.status(200).send({
        id: insertedProductId,
        id_category,
        name,
        price,
        description,
        image_url,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  editProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, price, description, id_category } = req.body;

      // Get the existing product data
      const getProductQuery = `
      SELECT * FROM products WHERE id_product = ${db.escape(productId)};
    `;
      const productResult = await query(getProductQuery);

      if (productResult.length === 0) {
        return res.status(400).send("Invalid product ID");
      }

      const existingProduct = productResult[0];

      // Validate file extension
      const fileExtension = file.originalname.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).send("Invalid file extension");
      }

      // Validate file size
      if (file.size > maxFileSize) {
        return res.status(400).send("File size exceeds the limit");
      }

      // Check if a file was uploaded
      const { file } = req;
      let image_url = existingProduct.image_url;
      console.log(file);
      if (file) {
        // Update the image URL if a new file was uploaded
        image_url = "/" + file.filename;
      }

      // Check if the product name is unique within the category
      const checkProductNameQuery = `
      SELECT id_product FROM products WHERE name = ${db.escape(
        name
      )} AND id_product != ${db.escape(
        productId
      )} AND id_category = ${db.escape(id_category)};
    `;
      const productNameResult = await query(checkProductNameQuery);

      if (productNameResult.length > 0) {
        return res
          .status(400)
          .send("Product name already exists in the category");
      }

      // Update the product data
      const updateProductQuery = `
      UPDATE products SET name = ${db.escape(name)}, price = ${db.escape(
        price
      )}, description = ${db.escape(description)}, id_category = ${db.escape(
        id_category
      )}, image_url = ${db.escape(image_url)}
      WHERE id_product = ${db.escape(productId)};
    `;
      await query(updateProductQuery);

      return res.status(200).send({
        id: productId,
        id_category,
        name,
        price,
        description,
        image_url,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;

      // Delete the product
      const deleteProductQuery = `
      DELETE FROM products
      WHERE id_product = ${db.escape(productId)};
    `;
      await query(deleteProductQuery);

      // Delete the stock for the product in every warehouse
      const deleteStockQuery = `
      DELETE FROM stocks
      WHERE id_product = ${db.escape(productId)};
    `;
      await query(deleteStockQuery);

      // Delete the order items for the product
      const deleteOrderItemsQuery = `
      DELETE FROM order_items
      WHERE id_product = ${db.escape(productId)};
    `;
      await query(deleteOrderItemsQuery);

      return res.status(200).send({
        id: productId,
        message: "Product, stock, and order items deleted successfully",
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
