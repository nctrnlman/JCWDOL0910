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
};
