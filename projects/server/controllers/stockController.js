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
  updateStock: async (req, res) => {
    try {
      const { id_stock, quantity, status } = req.body;

      const selectStockQuery = `
      SELECT total_stock
      FROM stocks
      WHERE id_stock = ${db.escape(id_stock)}
    `;
      const [currentStock] = await query(selectStockQuery);

      const { total_stock } = currentStock;

      let newStock;
      if (status === "incoming") {
        newStock = total_stock + quantity;
      } else if (status === "outgoing") {
        newStock = total_stock - quantity;

        if (newStock < 0) {
          return res
            .status(400)
            .send({ message: "Stock quantity cannot be lower than 0" });
        }
      } else {
        return res.status(400).send({ message: "Invalid status provided" });
      }

      const updateStockQuery = `
      UPDATE stocks
      SET total_stock = ${db.escape(newStock)}
      WHERE id_stock = ${db.escape(id_stock)}
    `;
      await query(updateStockQuery);

      const insertHistoryQuery = `
      INSERT INTO stock_history (id_stock, status, stock_change, created_at)
      VALUES (${db.escape(id_stock)}, ${db.escape(status)}, ${db.escape(
        quantity
      )}, CURRENT_TIMESTAMP)
    `;
      await query(insertHistoryQuery);

      return res.status(200).send({ message: "Stock updated successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  addStock: async (req, res) => {
    try {
      const { id_product, id_warehouse, quantity } = req.body;

      const checkStockQuery = `
      SELECT id_stock, total_stock
      FROM stocks
      WHERE id_product = ${db.escape(id_product)}
        AND id_warehouse = ${db.escape(id_warehouse)}
    `;
      const [existingStock] = await query(checkStockQuery);

      if (existingStock) {
        return res
          .status(409)
          .send({ message: "Stock already exists in the specified warehouse" });
      } else {
        const insertStockQuery = `
        INSERT INTO stocks (id_product, id_warehouse, total_stock)
        VALUES (${db.escape(id_product)}, ${db.escape(
          id_warehouse
        )}, ${db.escape(quantity)})
      `;
        const result = await query(insertStockQuery);

        const id_stock = result.insertId;

        const insertHistoryQuery = `
          INSERT INTO stock_history (id_stock, status, stock_change, created_at)
          VALUES (${db.escape(id_stock)}, 'adding stock', ${db.escape(
          quantity
        )}, CURRENT_TIMESTAMP)
        `;
        await query(insertHistoryQuery);

        return res.status(200).send({ message: "Stock added successfully" });
      }
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  deleteStock: async (req, res) => {
    try {
      const { id_stock } = req.query;
      const checkStockQuery = `
        SELECT id_stock
        FROM stocks
        WHERE id_stock = ${db.escape(id_stock)}
      `;
      const [existingStock] = await query(checkStockQuery);

      if (!existingStock) {
        return res
          .status(404)
          .send({ message: "Stock not found with the provided ID" });
      } else {
        const deleteStockQuery = `
          DELETE FROM stocks
          WHERE id_stock = ${db.escape(id_stock)}
        `;
        await query(deleteStockQuery);

        const deleteHistoryQuery = `
          DELETE FROM stock_history
          WHERE id_stock = ${db.escape(id_stock)}
        `;
        await query(deleteHistoryQuery);

        return res.status(200).send({ message: "Stock deleted successfully" });
      }
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
