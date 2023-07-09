require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { parseTotalStock } = require("../helper/productHelper");

module.exports = {
  getLatestProducts: async (req, res) => {
    try {
      const latestProductsQuery = `
        SELECT p.*, SUM(s.total_stock) AS total_stock
        FROM products p
        INNER JOIN stocks s ON p.id_product = s.id_product
        GROUP BY p.id_product
        ORDER BY p.id_product DESC
        LIMIT 5;
      `;
      const latestProducts = await query(latestProductsQuery);
      parseTotalStock(latestProducts);
      return res.status(200).send(latestProducts);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const { offset, limit, sort, filter } = req.query;

      let countProductQuery = `SELECT COUNT(*) AS total FROM products`;
      let productsQuery = `
        SELECT p.*, SUM(s.total_stock) AS total_stock
        FROM products p
        JOIN stocks s ON p.id_product = s.id_product
        WHERE 1=1
        GROUP BY p.id_product
      `;

      if (filter) {
        productsQuery += ` AND name LIKE '%${filter}%'`;
        countProductQuery += ` AND name LIKE '%${filter}%'`;
      }

      if (sort === "asc") {
        productsQuery += ` ORDER BY price ASC`;
      } else if (sort === "desc") {
        productsQuery += ` ORDER BY price DESC`;
      }

      productsQuery += ` LIMIT ${limit} OFFSET ${offset}`;

      const products = await query(productsQuery);
      parseTotalStock(products);
      const totalItems = await query(countProductQuery);

      return res.status(200).send({
        data: products,
        totalPages: Math.ceil(totalItems[0].total / limit),
        totalItems: totalItems[0].total,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  getProductByCategory: async (req, res) => {
    try {
      const { offset, limit, sort, filter, category } = req.query;

      let countProductQuery = `
        SELECT COUNT(DISTINCT p.id_product) AS total
        FROM products p
        JOIN categories c ON p.id_category = c.id_category
        WHERE c.name = "${category}"
      `;

      let productsQuery = `
        SELECT p.id_product, p.id_category, c.name AS category, p.name AS name, p.price, p.description, SUM(s.total_stock) AS total_stock, p.image_url
        FROM products p
        JOIN categories c ON p.id_category = c.id_category
        JOIN stocks s ON p.id_product = s.id_product
        WHERE c.name = "${category}"
      `;

      if (filter) {
        productsQuery += ` AND p.name LIKE '%${filter}%'`;
        countProductQuery += ` AND p.name LIKE '%${filter}%'`;
      }

      if (sort === "asc") {
        productsQuery += ` GROUP BY p.id_product, p.id_category, c.name, p.name, p.price, p.description, p.image_url ORDER BY p.price ASC`;
      } else if (sort === "desc") {
        productsQuery += ` GROUP BY p.id_product, p.id_category, c.name, p.name, p.price, p.description, p.image_url ORDER BY p.price DESC`;
      } else {
        productsQuery += ` GROUP BY p.id_product, p.id_category, c.name, p.name, p.price, p.description, p.image_url`;
      }

      productsQuery += ` LIMIT ${limit} OFFSET ${offset}`;

      const products = await query(productsQuery);
      parseTotalStock(products);
      const totalItems = await query(countProductQuery);

      return res.status(200).send({
        data: products,
        totalPages: Math.ceil(totalItems[0].total / limit),
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  getProductById: async (req, res) => {
    try {
      const idProduct = req.params.id;

      const productQuery = `
        SELECT p.id_product, p.id_category, c.name AS category, p.name AS product_name, p.price, p.description, SUM(s.total_stock) AS total_stock, p.image_url 
        FROM products p
        JOIN categories c ON p.id_category = c.id_category
        JOIN stocks s ON p.id_product = s.id_product
        WHERE p.id_product = ${db.escape(idProduct)};
      `;

      const productById = await query(productQuery);
      parseTotalStock(productById);

      if (productById < 1 || productById === null) {
        return res.status(400).send({
          message: `Product with ID ${idProduct} does not exist`,
          success: false,
        });
      }

      return res.status(200).send(productById[0]);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
