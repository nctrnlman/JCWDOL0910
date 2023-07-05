const { db, query } = require("../database");

module.exports = {
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
