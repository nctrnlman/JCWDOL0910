const { db, query } = require("../database");
const { getIdFromToken } = require("../helper/jwt-payload");

module.exports = {
  changeStatusOrders: async (req, res) => {
    try {
      const fetchOrders = await query(`SELECT * FROM orders`);
      if (!fetchOrders) {
        return res.status(400).send({ message: "fetch orders error" });
      }

      if (res.locals.statusChanged) {
        return res.status(200).send({
          message: "Success: Order statuses changed",
          statusChanged: true,
        });
      } else {
        return res.status(200).send({
          message: "Success: No changes to order statuses",
          statusChanged: false,
        });
      }
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  updateOrderStatusToDikirim: async (req, res) => {
    const { id_order } = req.body;
    const id_user = getIdFromToken(req, res);
    try {
      const order = await query(
        `SELECT * FROM orders WHERE id_order = ${db.escape(
          id_order
        )} AND id_user = ${db.escape(id_user)}`
      );

      if (!order || order.length === 0) {
        return res
          .status(404)
          .send({ message: "Order not found for the user" });
      }

      await query(
        `UPDATE orders SET status = 'Pesanan Dikonfirmasi' WHERE id_order = ${db.escape(
          id_order
        )}`
      );

      return res.status(200).send({
        message: "Order status updated to 'Pesanan Dikonfirmasi' successfully",
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
