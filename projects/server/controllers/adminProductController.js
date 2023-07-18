require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const { getPaginationParams } = require("../helper/getPaginationHelper");
const {
  validateImageSize,
  validateImageExtension,
} = require("../helper/imageValidatorHelper");
const { parseTotalStock } = require("../helper/productHelper");
const adminProductQueries = require("../queries/adminProductQueries");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await query(adminProductQueries.getAllProductsQuery);
      return res.status(200).send({ products });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  fetchProducts: async (req, res) => {
    try {
      const itemsPerPage = 8;
      const { page, offset } = getPaginationParams(req, itemsPerPage);

      const { sort, category, search } = req.query;

      let countQuery = adminProductQueries.getCountQuery;
      let productsQuery = adminProductQueries.getProductsByPageQuery(
        itemsPerPage,
        offset,
        sort,
        category,
        search
      );

      if (search) {
        countQuery = adminProductQueries.getCountQueryWithSearch(search);
      } else if (category) {
        countQuery = adminProductQueries.getCountQueryWithCategory(category);
      }

      const products = await query(productsQuery);
      const countResult = await query(countQuery);

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      parseTotalStock(products);

      return res.status(200).send({ products, totalPages, itemsPerPage });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  addProduct: async (req, res) => {
    try {
      const { id_category, name, price, weight, description } = req.body;

      if (!req.file) {
        return res.status(400).send("No image file provided");
      }

      let image_url = "";
      const { file } = req;
      image_url = file ? "/" + file.filename : null;
      if (!file) {
        return res.status(400).send("No image file provided");
      }
      if (!validateImageSize(file)) {
        return res.status(400).send("File size exceeds the limit");
      }
      if (!validateImageExtension(file)) {
        return res.status(400).send("Invalid file extension");
      }

      const categoryResult = await query(
        adminProductQueries.getCategoryQuery(id_category)
      );

      if (categoryResult.length === 0) {
        return res.status(400).send("Invalid category ID");
      }

      const productNameResult = await query(
        adminProductQueries.getProductNameQuery(name)
      );

      if (productNameResult.length > 0) {
        return res.status(400).send("Product already exists");
      }

      const productResult = await query(
        adminProductQueries.addProductQuery(
          id_category,
          name,
          price,
          weight,
          description,
          image_url
        )
      );

      const insertedProductId = productResult.insertId;

      return res.status(200).send({
        message: "Product successfully added",
        data: {
          id: insertedProductId,
          id_category,
          name,
          price,
          weight,
          description,
          image_url,
        },
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  editProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, price, weight, description, id_category } = req.body;

      const productResult = await query(
        adminProductQueries.getProductQuery(productId)
      );

      if (productResult.length === 0) {
        return res.status(400).send({ message: "Invalid product ID" });
      }

      const existingProduct = productResult[0];

      const { file } = req;
      let image_url = existingProduct.image_url;
      if (file) {
        if (!validateImageSize(file)) {
          return res
            .status(400)
            .send({ message: "File size exceeds the limit" });
        }
        if (!validateImageExtension(file)) {
          return res.status(400).send({ message: "Invalid file extension" });
        }

        image_url = "/" + file.filename;
      }

      const productNameResult = await query(
        adminProductQueries.checkProductNameQuery(name, productId, id_category)
      );

      if (productNameResult.length > 0) {
        return res
          .status(400)
          .send({ message: "Product name already exists in the category" });
      }

      await query(
        adminProductQueries.updateProductQuery(
          productId,
          name,
          price,
          weight,
          description,
          id_category,
          image_url
        )
      );

      return res.status(200).send({
        message: "Product successfully updated",
        data: {
          id: productId,
          id_category,
          name,
          price,
          weight,
          description,
          image_url,
        },
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;

      await query(adminProductQueries.deleteProductQuery(productId));

      const productInStock = await query(
        adminProductQueries.checkProductInStockQuery(productId)
      );
      console.log(productInStock, "in stock");
      if (productInStock.length > 0) {
        await query(adminProductQueries.deleteStockProductQuery(productId));
      }

      return res.status(200).send({
        id: productId,
        message:
          "Product data in products list, stock, and cart deleted successfully",
      });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
