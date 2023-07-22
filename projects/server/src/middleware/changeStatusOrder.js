const { db, query } = require("../database");

const changeStatusOrder = async (req, res, next) => {
  try {
    const currentTime = new Date();

    const expiredOrders = await query(`
      SELECT id_order, payment_proof_expiry
      FROM orders
      WHERE status = 'Menunggu Pembayaran' AND payment_proof_expiry <= ${db.escape(
        currentTime
      )}
    `);

    let statusChanged = false;

    for (const order of expiredOrders) {
      const orderId = order.id_order;
      await query(`
        UPDATE orders
        SET status = 'Dibatalkan',
        payment_proof_expiry = NULL -- SET payment_proof_expiry to NULL
        WHERE id_order = ${db.escape(orderId)}
      `);
      await query(`
        DELETE FROM payment_details
        WHERE id_order = ${db.escape(orderId)}
      `);
      statusChanged = true;
    }

    const shippedOrders = await query(`
      SELECT id_order, shipping_time
      FROM orders
      WHERE shipping_time <= ${db.escape(currentTime)}
    `);

    for (const order of shippedOrders) {
      const orderId = order.id_order;
      await query(`
        UPDATE orders
        SET status = 'Pesanan Dikonfirmasi',
        shipping_time = NULL -- Set shipping_time to NULL
        WHERE id_order = ${db.escape(orderId)}
      `);
      statusChanged = true;
    }

    res.locals.statusChanged = statusChanged;

    next();
  } catch (error) {
    console.error("Error updating order statuses:", error);
    next(error);
  }
};

module.exports = { changeStatusOrder };
