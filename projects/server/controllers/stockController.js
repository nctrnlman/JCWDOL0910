require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { parseTotalStock } = require("../helper/productHelper");

module.exports = {
  fetchStocks: async (req, res) => {
    try {
      let { page } = req.query;
      const itemsPerPage = 10;

      page = parseInt(page);
      if (isNaN(page) || page < 1) {
        page = 1;
      }

      const offset = (page - 1) * itemsPerPage;

      const stocksQuery = `
        SELECT s.*, p.name AS product_name, w.name AS warehouse_name
        FROM stocks s
        INNER JOIN products p ON s.id_product = p.id_product
        INNER JOIN warehouses w ON s.id_warehouse = w.id_warehouse
        ORDER BY id_product
        LIMIT ${itemsPerPage}
        OFFSET ${offset};
      `;

      const countQuery = `
        SELECT COUNT(*) AS total FROM stocks;
      `;

      const [stocks, countResult] = await Promise.all([
        query(stocksQuery),
        query(countQuery),
      ]);

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      parseTotalStock(stocks);
      console.log(stocks);

      return res.status(200).send({ stocks, totalPages, itemsPerPage });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
