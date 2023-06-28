require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");

module.exports = {
  getAllProductCategories: async (req, res) => {
    try {
      const product_categories = await query(
        `SELECT * FROM categories ORDER BY name ASC`
      );
      return res.status(200).send(product_categories);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;

      console.log(name);

      const checkCategory = await query(
        `SELECT * FROM multi_warehouse.categories WHERE name = ${db.escape(
          name
        )};`
      );

      if (checkCategory.length == 1) {
        return res
          .status(400)
          .send({ message: "Category already exist", success: false });
      }

      const addToDatabase = await query(
        `INSERT INTO multi_warehouse.categories (name) VALUES (${db.escape(
          name
        )})`
      );

      return res.status(200).send({ message: "Add Category Success" });
    } catch (error) {
      return res.status(error.statusCode || 500).status(error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id, name } = req.body;

      const checkCategory = await query(
        `SELECT * FROM multi_warehouse.categories WHERE name = ${db.escape(
          name
        )};`
      );

      if (checkCategory.length == 1) {
        return res
          .status(400)
          .send({ message: "Category already exist", success: false });
      }

      const updateDatabase = await query(
        `UPDATE categories SET name = ${db.escape(
          name
        )} WHERE id_category = ${db.escape(id)} `
      );

      console.log(updateDatabase);
      return res
        .status(200)
        .send({ updateDatabase, message: "Category update successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).status(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const idCategory = req.params.id;
      console.log(idCategory);

      const deleteDatabase = await query(
        `DELETE FROM categories WHERE id_category = ${db.escape(idCategory)};`
      );
      console.log(deleteDatabase);
      return res.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).status(error);
    }
  },
};
