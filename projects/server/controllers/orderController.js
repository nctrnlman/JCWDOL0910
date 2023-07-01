require("dotenv").config({
  path: ".env.local",
});
const {
  getCoordinates,
  checkProvinceAndCity,
} = require("../helper/setAddressHelper");
const axios = require("axios");
const { db, query } = require("../database");

const env = process.env;

module.exports = {
  orderList: async (req, res) => {
    try {
      const { status, id_user } = req.query;

      const orderList =
        await query(`SELECT o.id_order, o.total_amount, o.shipping_method, o.status, o.payment_proof, o.created_at,
        JSON_ARRAYAGG(JSON_OBJECT('quantity', oi.quantity, 'product_name', oi.product_name, 'product_image', oi.product_image, 'product_price', oi.product_price)) AS productList
 FROM orders o
 JOIN (
     SELECT id_order, quantity, product_name, product_image, product_price
     FROM order_items
     WHERE id_user = ${id_user}
 ) oi ON o.id_order = oi.id_order
 WHERE o.id_user = ${id_user} AND o.status = '${status}'
 GROUP BY o.id_order, o.shipping_method, o.status, o.payment_proof, o.created_at;`);

      console.log(orderList);

      return res.status(200).send(orderList);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  getShippingWarehouse: async (req, res) => {
    try {
      const { id_user } = req.query;
      console.log(id_user);

      const fetchAddress = await query(`
          SELECT * FROM addresses WHERE id_user = ${db.escape(
            id_user
          )} AND is_primary = 1
        `);

      const result = await getCoordinates(
        fetchAddress[0].address,
        fetchAddress[0].city,
        fetchAddress[0].province,
        fetchAddress[0].postal_code
      );

      if (!result) {
        throw new Error("Coordinates not found");
      }
      const { latitude, longitude } = result;
      console.log(result, "long lng");
      const checkNearestWarehouse = await query(`
      SELECT *,
      SQRT(POW((latitude - ${latitude}), 2) + POW((longitude - ${longitude}), 2)) AS distance
  FROM warehouses
  ORDER BY distance
  LIMIT 1;
      `);

      const originWarehouse = await checkProvinceAndCity(
        checkNearestWarehouse[0].province,
        checkNearestWarehouse[0].city
      );

      const destinationAddress = await checkProvinceAndCity(
        fetchAddress[0].province,
        fetchAddress[0].city
      );
      const checkWeight = await query(`SELECT SUM(p.weight) AS total_weight
      FROM cart_items ci
      JOIN products p ON ci.id_product = p.id_product
      JOIN users u ON ci.id_user = u.id_user
      WHERE u.id_user = ${id_user}`);

      const response = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        {
          origin: originWarehouse.city.city_id,
          destination: destinationAddress.city.city_id,
          weight: checkWeight[0].total_weight,
          courier: "jne",
        },
        {
          headers: {
            key: env.RAJA_ONGKIR_API_KEY,
          },
        }
      );
      const results =
        response.data.rajaongkir.results[0].costs[0].cost[0].value;
      return res.status(200).send({
        shipping: results,
        warehouse: checkNearestWarehouse[0],
        address: fetchAddress[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).send(error);
    }
  },
  createOrder: async (req, res) => {
    try {
      const {
        id_user,
        id_warehouse,
        total_amount,
        shipping_method,
        payment_proof,
        productList,
      } = req.body;

      const insertOrder = await query(`
        INSERT INTO orders (id_user, id_warehouse, total_amount, shipping_method, status, payment_proof, created_at)
        VALUES (${db.escape(id_user)}, ${db.escape(id_warehouse)}, ${db.escape(
        total_amount
      )}, ${db.escape(shipping_method)}, "Menunggu Pembayaran", ${db.escape(
        payment_proof
      )}, NOW())
      `);

      const fetchOrder = await query(`
        SELECT id_order
        FROM multi_warehouse.orders
        WHERE id_user = ${db.escape(id_user)}
        ORDER BY id_order DESC
        LIMIT 1
      `);

      for (const product of productList) {
        const { productName, productPrice, productImage, quantity } = product;

        await query(`
          INSERT INTO order_items (id_user, id_order, product_name, product_price, product_image, quantity)
          VALUES (${db.escape(id_user)}, ${fetchOrder[0].id_order}, ${db.escape(
          productName
        )}, ${db.escape(productPrice)}, ${db.escape(productImage)}, ${db.escape(
          quantity
        )})
        `);
      }

      const deleteCartItems = await query(`
  DELETE FROM cart_items
  WHERE id_user = ${db.escape(id_user)}
`);

      return res
        .status(200)
        .send({ success: true, message: "Create Order Success" });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
