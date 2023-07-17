const { db, query } = require("../database");

module.exports = {
  getWarehouseId: async (adminId) => {
    const warehouseQuery = `
    SELECT *
    FROM warehouses
    WHERE id_admin = '${adminId}'
  `;
    const warehouseResult = await query(warehouseQuery);
    return warehouseResult.length > 0 ? warehouseResult[0].id_warehouse : null;
  },

  fetchStocksQuery: (search, sort, offset, itemsPerPage, warehouseId, role) => {
    let stocksQuery = `
      SELECT s.*, p.name AS product_name, w.name AS warehouse_name
      FROM stocks s
      INNER JOIN products p ON s.id_product = p.id_product
      INNER JOIN warehouses w ON s.id_warehouse = w.id_warehouse
      WHERE 1=1
    `;
    if (role === "warehouse admin") {
      // Render orders only from users in the selected warehouse
      stocksQuery += ` AND w.id_warehouse = '${warehouseId}'`;
    }

    if (search) {
      search = search.toLowerCase();
      stocksQuery += ` AND LOWER(p.name) LIKE '%${search}%' OR LOWER(w.name) LIKE '%${search}%'`;
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

    return stocksQuery;
  },

  countStocksQuery: (search, warehouseId, role) => {
    let countQuery = `
      SELECT COUNT(*) AS total
      FROM stocks s
      INNER JOIN products p ON s.id_product = p.id_product
      INNER JOIN warehouses w ON s.id_warehouse = w.id_warehouse WHERE 1=1
    `;
    if (role === "warehouse admin") {
      // Render orders only from users in the selected warehouse
      countQuery += ` AND w.id_warehouse = '${warehouseId}'`;
    }
    if (search) {
      search = search.toLowerCase();
      countQuery += ` AND LOWER(p.name) LIKE '%${search}%' OR LOWER(w.name) LIKE '%${search}%'`;
    }

    return countQuery;
  },

  selectStockQuery: (id_stock) => {
    return `
      SELECT total_stock
      FROM stocks
      WHERE id_stock = ${db.escape(id_stock)}
    `;
  },

  updateStockQuery: (id_stock, newStock) => {
    return `
      UPDATE stocks
      SET total_stock = ${db.escape(newStock)}
      WHERE id_stock = ${db.escape(id_stock)}
    `;
  },

  insertHistoryQuery: (id_stock, status, quantity) => {
    return `
      INSERT INTO stock_history (id_stock, status, stock_change, created_at)
      VALUES (${db.escape(id_stock)}, ${db.escape(status)}, ${db.escape(
      quantity
    )}, CURRENT_TIMESTAMP)
    `;
  },

  checkStockQuery: (id_stock) => {
    return `
    SELECT id_stock, total_stock
    FROM stocks
    WHERE id_stock = ${db.escape(id_stock)}
  `;
  },

  checkProductQuery: (id_product, id_warehouse) => {
    return `
      SELECT id_stock, total_stock
      FROM stocks
      WHERE id_product = ${db.escape(id_product)}
        AND id_warehouse = ${db.escape(id_warehouse)}
    `;
  },

  insertStockQuery: (id_product, id_warehouse, quantity) => {
    return `
      INSERT INTO stocks (id_product, id_warehouse, total_stock)
      VALUES (${db.escape(id_product)}, ${db.escape(id_warehouse)}, ${db.escape(
      quantity
    )})
    `;
  },

  deleteStockQuery: (id_stock) => {
    return `
      DELETE FROM stocks
      WHERE id_stock = ${db.escape(id_stock)}
    `;
  },

  deleteHistoryQuery: (id_stock) => {
    return `
      DELETE FROM stock_history
      WHERE id_stock = ${db.escape(id_stock)}
    `;
  },
};
