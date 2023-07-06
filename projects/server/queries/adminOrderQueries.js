const { db, query } = require("../database");

module.exports = {
  orderPaymentListQuery: (itemsPerPage, offset, sort, search, status) => {
    let queryOrderList = `
    SELECT
        o.id_order,
        u.email,
        w.name AS warehouse_name,
        o.total_amount,
        o.shipping_method,
        o.status,
        pd.payment_proof,
        pd.remitter,
        pd.bank_name,
        pd.account_number
    FROM
        orders AS o
        INNER JOIN users AS u ON o.id_user = u.id_user
        INNER JOIN warehouses AS w ON o.id_warehouse = w.id_warehouse
        LEFT JOIN payment_details AS pd ON o.id_order = pd.id_order
    WHERE 1 = 1
  `;

    if (search) {
      search = search.toLowerCase();
      queryOrderList += ` AND LOWER(u.email) LIKE '%${search}%' OR LOWER(pd.remitter) LIKE '%${search}%' OR LOWER(pd.bank_name) LIKE '%${search}%'`;
    }

    if (status) {
      status = status.toLowerCase();
      queryOrderList += ` AND LOWER(o.status) LIKE '%${status}%'`;
    }

    if (sort === "lowest") {
      queryOrderList += " ORDER BY o.total_amount ASC";
    } else if (sort === "highest") {
      queryOrderList += " ORDER BY o.total_amount DESC";
    }

    queryOrderList += `
    LIMIT ${itemsPerPage}
    OFFSET ${offset};
  `;

    return queryOrderList;
  },

  getCountQueryWithSearchAndStatus: (search, status) => {
    let countQuery = `
      SELECT COUNT(*) AS total
      FROM orders o
      INNER JOIN users u ON o.id_user = u.id_user
      LEFT JOIN payment_details pd ON o.id_order = pd.id_order
      WHERE 1 = 1
    `;

    if (search) {
      search = search.toLowerCase();
      countQuery += ` AND LOWER(u.email) LIKE '%${search}%' OR LOWER(pd.remitter) LIKE '%${search}%' OR LOWER(pd.bank_name) LIKE '%${search}%'`;
    }

    if (status) {
      status = status.toLowerCase();
      countQuery += ` AND LOWER(o.status) LIKE '%${status}%'`;
    }

    return countQuery;
  },
};
