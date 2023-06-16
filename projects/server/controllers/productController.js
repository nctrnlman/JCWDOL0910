require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
module.exports = {
  getLatestProducts: async (req, res) => {
    try {
      const latest_products = await query(
        `SELECT p.*, SUM(s.total_stock) AS total_stock
		    FROM products p
        INNER JOIN stocks s ON p.id_product=s.id_product
        GROUP BY p.id_product
        order by p.id_product desc limit 5;`
      );
      // Parse total_stock as an integer
      latest_products.forEach((product) => {
        product.total_stock = parseInt(product.total_stock);
      });
      console.log(latest_products);
      return res.status(200).send(latest_products);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  fetchProducts: async (req, res) => {
    try {
      const products = await query(
        `SELECT p.*, SUM(s.total_stock) AS total_stock
        FROM products p
        INNER JOIN stocks s ON p.id_product=s.id_product
        GROUP BY p.id_product;`
      );
      // Parse total_stock as an integer
      products.forEach((product) => {
        product.total_stock = parseInt(product.total_stock);
      });
      console.log(products);
      return res.status(200).send(products);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const { offset, limit, sort, filter } = req.query;

      let countProduct = `SELECT COUNT(*) AS total FROM products WHERE 1=1`;
      let productsQuery = ` SELECT * FROM products WHERE 1=1`;

      if (filter) {
        productsQuery += ` AND name LIKE '%${filter}%'`;
        countProduct += ` AND name LIKE '%${filter}%'`;
      }

      if (sort === "asc") {
        productsQuery += ` ORDER BY price ASC`;
      } else if (sort === "desc") {
        productsQuery += ` ORDER BY price DESC`;
      }

      productsQuery += ` LIMIT ${limit} OFFSET ${offset}`;

      console.log(productsQuery, "ini product");
      const products = await query(productsQuery);
      const totalItems = await query(countProduct);

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

      let countProduct = `SELECT COUNT(DISTINCT p.id_product) as total FROM products p
    JOIN categories c on p.id_category = c.id_category
    WHERE c.name = "${category}"`;

      let productsQuery = `SELECT p.id_product, p.id_category, c.name as category, p.name as name, p.price, p.description, SUM(s.total_stock) as total_stock, p.image_url FROM products p
    JOIN categories c on p.id_category = c.id_category
    JOIN stocks s on p.id_product = s.id_product
    WHERE c.name = "${category}"`;

      if (filter) {
        productsQuery += ` AND p.name LIKE '%${filter}%'`;
        countProduct += ` AND p.name LIKE '%${filter}%'`;
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
      const totalItems = await query(countProduct);

      return res.status(200).send({
        data: products,
        totalPages: Math.ceil(totalItems[0].total / limit),
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
