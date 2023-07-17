const { db, query } = require("../database");

module.exports = {
  orderListQuery: (id_user, status, offset, itemsPerPage) => {
    let orderListQuery;
    if (status === "Dibatalkan") {
      orderListQuery = `
        SELECT o.id_order, o.total_amount, o.shipping_method, o.status, o.created_at,
        JSON_ARRAYAGG(JSON_OBJECT('quantity', oi.quantity, 'product_name', oi.product_name, 'product_image', oi.product_image, 'product_price', oi.product_price)) AS productList
        FROM orders o
        JOIN order_items oi ON o.id_order = oi.id_order
        WHERE o.id_user = ${id_user} AND o.status = '${status}'
        GROUP BY o.id_order, o.shipping_method, o.status, o.created_at
      `;
    } else {
      orderListQuery = `
        SELECT o.id_order, o.total_amount, o.shipping_method, o.status, o.created_at, pd.payment_proof, pd.remitter, pd.bank_name, pd.account_number,
        JSON_ARRAYAGG(JSON_OBJECT('quantity', oi.quantity, 'product_name', oi.product_name, 'product_image', oi.product_image, 'product_price', oi.product_price)) AS productList
        FROM orders o
        JOIN order_items oi ON o.id_order = oi.id_order
        LEFT JOIN payment_details pd ON o.id_order = pd.id_order
        WHERE o.id_user = ${id_user} AND o.status = '${status}'
        GROUP BY o.id_order, o.shipping_method, o.status, pd.payment_proof, pd.remitter, pd.bank_name, pd.account_number, o.created_at
      `;
    }

    orderListQuery += `LIMIT ${itemsPerPage} OFFSET ${offset};`;
    return orderListQuery;
  },

  countQuery: (id_user, status) => {
    const countQuery = `
    SELECT COUNT(*) AS total
    FROM orders o
    WHERE o.id_user = ${id_user} AND o.status = '${status}';
  `;
    return countQuery;
  },

  fetchAddressQuery: (id_address) => {
    return `SELECT * FROM addresses WHERE id_address = ${db.escape(
      id_address
    )} `;
  },

  checkNearestWarehouseQuery: (latitude, longitude) => {
    return `
      SELECT *,
      SQRT(POW((latitude - ${latitude}), 2) + POW((longitude - ${longitude}), 2)) AS distance
      FROM warehouses
      ORDER BY distance
      LIMIT 1;
      `;
  },

  checkWeightQuery: (id_user) => {
    return `SELECT SUM(p.weight) AS total_weight
    FROM cart_items ci
    JOIN products p ON ci.id_product = p.id_product
    JOIN users u ON ci.id_user = u.id_user
    WHERE u.id_user = ${id_user}`;
  },

  insertOrderQuery: (id_user, id_warehouse, total_amount, shipping_method) => {
    return `
      INSERT INTO orders (id_user, id_warehouse, total_amount, shipping_method, status, created_at, payment_proof_expiry)
      VALUES (${db.escape(id_user)}, ${db.escape(id_warehouse)}, ${db.escape(
      total_amount
    )}, ${db.escape(
      shipping_method
    )}, "Menunggu Pembayaran", NOW(), NOW() + INTERVAL 1 DAY)
    `;
  },

  fetchOrderQuery: (id_user) => {
    return `
      SELECT id_order
      FROM multi_warehouse.orders
      WHERE id_user = ${db.escape(id_user)}
      ORDER BY id_order DESC
      LIMIT 1
    `;
  },

  insertOrderItemsQuery: (
    id_user,
    fetchOrder,
    productName,
    productPrice,
    productImage,
    quantity
  ) => {
    return `
        INSERT INTO order_items (id_user, id_order, product_name, product_price, product_image, quantity)
        VALUES (${db.escape(id_user)}, ${fetchOrder[0].id_order}, ${db.escape(
      productName
    )}, ${db.escape(productPrice)}, ${db.escape(productImage)}, ${db.escape(
      quantity
    )})
      `;
  },

  insertPaymentDetailsQuery: (fetchOrder) => {
    return `
      INSERT INTO payment_details (id_order, payment_proof, remitter, bank_name, account_number)
      VALUES (${fetchOrder[0].id_order}, NULL, NULL, NULL, NULL)
    `;
  },

  deleteCartItemsQuery: (id_user) => {
    return `
      DELETE FROM cart_items
      WHERE id_user = ${db.escape(id_user)}
    `;
  },

  updateOrderStatusQuery: (orderId, userId) => `
      UPDATE orders
      SET status = 'Menunggu Konfirmasi Pembayaran'
      WHERE id_order = ${db.escape(orderId)}
      AND id_user = ${db.escape(userId)}
    `,

  updatePaymentDetailsQuery: (
    orderId,
    image,
    remitter,
    bank_name,
    account_number
  ) => `
      UPDATE payment_details
      SET payment_proof = ${db.escape(image)},
          remitter = ${db.escape(remitter)},
          bank_name = ${db.escape(bank_name)},
          account_number = ${db.escape(account_number)}
      WHERE id_order = ${db.escape(orderId)}
    `,

  selectOrderQuery: (orderId, userId) => `
      SELECT * FROM orders WHERE id_order = ${db.escape(orderId)}
      AND status = 'Menunggu Pembayaran' AND id_user = ${db.escape(userId)}
    `,

  updateOrderCancellationQuery: (orderId) => `
      UPDATE orders SET status = 'Dibatalkan' WHERE id_order = ${db.escape(
        orderId
      )}
    `,

  deletePaymentDetailsQuery: (orderId) => `
      DELETE FROM payment_details WHERE id_order = ${db.escape(orderId)}
    `,
};
