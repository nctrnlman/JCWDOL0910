const { db, query } = require("../database");
const orderQueries = require("../queries/orderQueries");

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
      const orderId = order.id_order;
      if (paymentProofExpiry < currentTime) {
        await query(orderQueries.updateOrderCancellationQuery(orderId));
        await query(orderQueries.deletePaymentDetailsQuery(orderId));
      }
    }

    next();
  } catch (error) {
    console.error("Error updating order statuses:", error);
    next(error);
  }
};

module.exports = { checkExpiredOrder };
