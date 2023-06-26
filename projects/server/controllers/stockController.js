const { db, query } = require("../database");
const { parseTotalStock } = require("../helper/productHelper");

module.exports = {
  fetchStocks: async (req, res) => {
    try {
      let { page, search, sort } = req.query;
      const itemsPerPage = 10;

      page = parseInt(page);
      if (isNaN(page) || page < 1) {
        page = 1;
      }

      const offset = (page - 1) * itemsPerPage;

      let stocksQuery = `
        SELECT s.*, p.name AS product_name, w.name AS warehouse_name
        FROM stocks s
        INNER JOIN products p ON s.id_product = p.id_product
        INNER JOIN warehouses w ON s.id_warehouse = w.id_warehouse
      `;

      let countQuery = `
        SELECT COUNT(*) AS total
        FROM stocks s
        INNER JOIN products p ON s.id_product = p.id_product
        INNER JOIN warehouses w ON s.id_warehouse = w.id_warehouse
      `;

      if (search) {
        search = search.toLowerCase();
        stocksQuery += ` WHERE LOWER(p.name) LIKE '%${search}%' OR LOWER(w.name) LIKE '%${search}%'`;
        countQuery += ` WHERE LOWER(p.name) LIKE '%${search}%' OR LOWER(w.name) LIKE '%${search}%'`;
      }

      if (sort === "a-z") {
        stocksQuery += ` ORDER BY p.name ASC`;
      } else if (sort === "z-a") {
        stocksQuery += ` ORDER BY p.name DESC`;
      } else if (sort === "highest") {
        stocksQuery += ` ORDER BY s.total_stock DESC`;
      } else if (sort === "lowest") {
        stocksQuery += ` ORDER BY s.total_stock ASC`;
      } else if (sort === "warehouse-asc") {
        stocksQuery += ` ORDER BY w.name ASC`;
      } else if (sort === "warehouse-desc") {
        stocksQuery += ` ORDER BY w.name DESC`;
      } else {
        stocksQuery += ` ORDER BY p.name ASC`;
      }

      stocksQuery += `
        LIMIT ${itemsPerPage}
        OFFSET ${offset};
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
