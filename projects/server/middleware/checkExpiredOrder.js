const { db, query } = require("../database");

const checkExpiredOrder = async (req, res, next) => {
  try {
    const expiredOrders = await query(`
      SELECT id_order, payment_proof_expiry
      FROM orders
      WHERE status = 'Menunggu Pembayaran'
    `);

    const currentTime = new Date();

    for (const order of expiredOrders) {
      const paymentProofExpiry = new Date(order.payment_proof_expiry);

      if (paymentProofExpiry < currentTime) {
        await query(`
          UPDATE orders
          SET status = 'Dibatalkan'
          WHERE id_order = ${order.id_order}
        `);
      }
    }

    console.log("Order status update complete!");

    next();
  } catch (error) {
    console.error("Error updating order statuses:", error);
    next(error);
  }
};

module.exports = { checkExpiredOrder };
