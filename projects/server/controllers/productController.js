require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
module.exports = {
  getLatestProducts: async (req, res) => {
    try {
      const latest_products = await query(
        `SELECT * FROM products order by id_product desc limit 5`
      );
      console.log(latest_products);
      return res.status(200).send(latest_products);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const offset = parseInt(req.query.offset);
      const limit = parseInt(req.query.limit);

      const products = await query(
        `SELECT * FROM products  LIMIT ${limit} OFFSET ${offset};`
      );
      const totalItems = await query("SELECT COUNT(*) AS total FROM products;");

      return res.status(200).send({
        data: products,
        totalPages: Math.ceil(totalItems[0].total / limit),
        totalItems: totalItems[0].total,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
