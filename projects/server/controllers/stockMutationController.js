const { db, query } = require("../database");

module.exports = {
  fetchStockMutation: async (req, res) => {
    try {
      let { page, search, sort } = req.query;
      const itemsPerPage = 10;

      page = parseInt(page);
      if (isNaN(page) || page < 1) {
        page = 1;
      }

      const offset = (page - 1) * itemsPerPage;

      let stockMutationQuery = `SELECT p.name AS product_name, wr.name AS request_warehouse, ws.name AS send_warehouse, sm.quantity, sm.created_at FROM stock_mutations AS sm JOIN warehouses AS wr ON sm.id_request_warehouse = wr.id_warehouse JOIN warehouses AS ws ON sm.id_send_warehouse = ws.id_warehouse JOIN products AS p ON sm.id_product = p.id_product`;

      let countQuery = `SELECT COUNT(*) AS total FROM stock_mutations AS sm JOIN warehouses AS wr ON sm.id_request_warehouse = wr.id_warehouse JOIN warehouses AS ws ON sm.id_send_warehouse = ws.id_warehouse JOIN products AS p ON sm.id_product = p.id_product`;

      if (search) {
        search = search.toLowerCase();
        stockMutationQuery += ` WHERE LOWER(p.name) LIKE '%${search}%' OR LOWER(wr.name) LIKE '%${search}%' OR LOWER(ws.name) LIKE '%${search}%'`;
        countQuery += ` WHERE LOWER(p.name) LIKE '%${search}%' OR LOWER(wr.name) LIKE '%${search}%' OR LOWER(ws.name) LIKE '%${search}%'`;
      }

      if (sort === "a-z") {
        stockMutationQuery += ` ORDER BY product_name ASC`;
      } else if (sort === "z-a") {
        stockMutationQuery += ` ORDER BY product_name DESC`;
      } else if (sort === "highest") {
        stockMutationQuery += ` ORDER BY sm.quantity DESC`;
      } else if (sort === "lowest") {
        stockMutationQuery += ` ORDER BY sm.quantity ASC`;
      } else if (sort === "datetime-asc") {
        stockMutationQuery += ` ORDER BY sm.created_at ASC`;
      } else if (sort === "datetime-desc") {
        stockMutationQuery += ` ORDER BY sm.created_at DESC`;
      } else {
        stockMutationQuery += ` ORDER BY product_name ASC`;
      }

      stockMutationQuery += `
          LIMIT ${itemsPerPage}
          OFFSET ${offset};
        `;

      const [stockMutation, countResult] = await Promise.all([
        query(stockMutationQuery),
        query(countQuery),
      ]);

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      return res.status(200).send({ stockMutation, totalPages, itemsPerPage });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
