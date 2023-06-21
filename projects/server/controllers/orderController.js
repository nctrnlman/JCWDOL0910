require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
module.exports = {
  orderList: async (req, res) => {
    try {
      const { status, id_user } = req.query;

      console.log(status);
      console.log(id_user);

      const querya = `SELECT o.*, oi.*, p.*
      FROM orders o
      JOIN order_items oi ON o.id_order = oi.id_order
      JOIN products p ON oi.id_product = p.id_product
      WHERE o.id_user = ${id_user} AND o.status = '${status}' ; `;

      const x = `SELECT
    o.id_order,
    o.id_user,
    o.id_warehouse,
    o.total_amount,
    o.shipping_method,
    o.status,
    o.payment_proof,
    o.created_at,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id_item', oi.id_item,
            'id_product', oi.id_product,
            'quantity', oi.quantity,
            'name', p.name,
            'price', p.price,
            'description', p.description,
            'image_url', p.image_url
        )
    ) AS items
FROM
    orders o
    JOIN order_items oi ON o.id_order = oi.id_order
    JOIN products p ON oi.id_product = p.id_product
WHERE
    o.id_user = ${id_user}
    AND o.status = '${status}'
GROUP BY
    o.id_order;`;
      // console.log(querya);

      const orderList = await query(x);
      console.log(orderList);

      return res.status(200).send(orderList);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
