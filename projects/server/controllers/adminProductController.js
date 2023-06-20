require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { parseTotalStock } = require("../helper/productHelper");

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
      const { category_name, name, price, description } = req.body;

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).send("No image file provided");
      }

      // Get the image URL from the uploaded file
      const image_url = req.file.path;

      // Retrieve the category id and name from the category table
      const getCategoryQuery = `
      SELECT id_category, c.name FROM categories c WHERE c.name = ${db.escape(
        category_name
      )};
    `;
      const categoryResult = await query(getCategoryQuery);

      if (categoryResult.length === 0) {
        return res.status(400).send("Invalid category name");
      }

      const { id_category, category_name: categoryName } = categoryResult[0];

      const addProductQuery = `
      INSERT INTO products (id_category, name, price, description, image_url)
      VALUES (${db.escape(id_category)}, ${db.escape(name)}, ${db.escape(
        price
      )}, ${db.escape(description)}, ${db.escape(image_url)});
    `;
      const result = await query(addProductQuery);

      const insertedProductId = result.insertId;
      return res.status(200).send({
        id: insertedProductId,
        category_name: categoryName,
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
      const { category_name, name, price, description } = req.body;
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).send("No image file provided");
      }

      // Get the image URL from the uploaded file
      const image_url = req.file.path;
      // Retrieve the category id and name from the category table
      const getCategoryQuery = `
      SELECT id_category, c.name FROM categories c WHERE c.name = ${db.escape(
        category_name
      )};
    `;
      const categoryResult = await query(getCategoryQuery);

      if (categoryResult.length === 0) {
        return res.status(400).send("Invalid category name");
      }

      const { id_category, category_name: categoryName } = categoryResult[0];

      const editProductQuery = `
      UPDATE products AS p
      INNER JOIN categories AS c ON p.id_category = c.id_category
      SET p.id_category=${db.escape(id_category)}, p.name = ${db.escape(
        name
      )}, p.price = ${db.escape(price)}, p.description = ${db.escape(
        description
      )}, p.image_url = ${db.escape(image_url)}
      WHERE p.id_product = ${db.escape(productId)}
        AND c.category_name = ${db.escape(category_name)};
      `;
      await query(editProductQuery);

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

      const deleteProductQuery = `
        DELETE FROM products
        WHERE id_product = ${db.escape(productId)};
      `;
      await query(deleteProductQuery);

      return res
        .status(200)
        .send({ id: productId, message: "Product deleted successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
