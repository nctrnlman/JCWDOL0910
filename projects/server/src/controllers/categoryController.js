require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");

module.exports = {
  fetchProductCategories: async (req, res) => {
    try {
      let { page, search, sort } = req.query;
      const itemsPerPage = 10;

      page = parseInt(page);
      if (isNaN(page) || page < 1) {
        page = 1;
      }

      const offset = (page - 1) * itemsPerPage;

      let productCategoriesQuery = `SELECT * FROM categories`;
      let countQuery = `SELECT COUNT(*) AS total FROM categories`;

      if (search) {
        search = search.toLowerCase();
        productCategoriesQuery += ` WHERE LOWER(name) LIKE '%${search}%' `;
        countQuery += ` WHERE LOWER(name) LIKE '%${search}%'`;
      }

      if (sort === "a-z") {
        productCategoriesQuery += ` ORDER BY name ASC`;
      } else if (sort === "z-a") {
        productCategoriesQuery += ` ORDER BY name DESC`;
      } else {
        productCategoriesQuery += ` ORDER BY name ASC`;
      }

      productCategoriesQuery += `
          LIMIT ${itemsPerPage}
          OFFSET ${offset};
        `;

      const [productCategories, countResult] = await Promise.all([
        query(productCategoriesQuery),
        query(countQuery),
      ]);

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      return res
        .status(200)
        .send({ productCategories, totalPages, itemsPerPage });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name || name === null || name === "") {
        return res.status(400).send({
          message: "The name field must be filled in",
          success: false,
        });
      }

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

      if (!name || name === null || name === "") {
        return res.status(400).send({
          message: "The name field must be filled in",
          success: false,
        });
      }

      const checkCategory = await query(
        `SELECT * FROM multi_warehouse.categories WHERE name = ${db.escape(
          name
        )};`
      );

      if (checkCategory.length === 1) {
        return res
          .status(400)
          .send({ message: "Category already exist", success: false });
      }

      const updateCategory = await query(
        `UPDATE categories SET name = ${db.escape(
          name
        )} WHERE id_category = ${db.escape(id)} `
      );

      return res
        .status(200)
        .send({ message: "Category update successfully", success: true });
    } catch (error) {
      return res.status(error.statusCode || 500).status(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const idCategory = req.params.id;

      const deleteCategory = await query(
        `DELETE FROM categories WHERE id_category = ${db.escape(idCategory)};`
      );

      return res
        .status(200)
        .send({ message: "Category deleted successfully", success: true });
    } catch (error) {
      return res.status(error.statusCode || 500).status(error);
    }
  },
};
