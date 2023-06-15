require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
module.exports = {
  getAllProductCategories: async (req, res) => {
    try {
      const product_categories = await query(`SELECT * FROM categories`);
      // console.log(product_categories);
      return res.status(200).send(product_categories);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
