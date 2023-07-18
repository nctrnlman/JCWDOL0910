const { db, query } = require("../database");

module.exports = {
  getAllProductsQuery: `
    SELECT p.*
    FROM products p
    GROUP BY p.id_product
    ORDER BY p.name ASC;
  `,

  getProductsByPageQuery: (itemsPerPage, offset, sort, category, search) => {
    let query = `
    SELECT p.*, c.name AS category_name, SUM(s.total_stock) AS total_stock
    FROM products p
    LEFT JOIN stocks s ON p.id_product = s.id_product
    INNER JOIN categories c ON p.id_category = c.id_category
  `;

    if (category !== undefined && category !== "") {
      query += ` WHERE p.id_category = ${db.escape(category)}`;
    }

    if (search) {
      query += ` AND LOWER(p.name) LIKE '%${search.toLowerCase()}%'`;
    }

    query += `
    GROUP BY p.id_product
  `;

    if (sort === "lowest") {
      query += " ORDER BY p.price ASC";
    } else if (sort === "highest") {
      query += " ORDER BY p.price DESC";
    } else if (sort === "a-z") {
      query += " ORDER BY p.name ASC";
    } else if (sort === "z-a") {
      query += " ORDER BY p.name DESC";
    }

    query += `
    LIMIT ${itemsPerPage}
    OFFSET ${offset};
  `;

    return query;
  },

  getCountQuery: `
    SELECT COUNT(*) AS total FROM products;
  `,

  getCountQueryWithSearch: (search) => `
    SELECT COUNT(*) AS total
    FROM products
    WHERE LOWER(name) LIKE '%${search.toLowerCase()}%';
  `,

  getCountQueryWithCategory: (category) => `
    SELECT COUNT(*) AS total
    FROM products p
    WHERE p.id_category = ${db.escape(category)}
  `,

  getCategoryQuery: (id) => `
    SELECT id_category, name FROM categories WHERE id_category = ${db.escape(
      id
    )};
  `,

  getProductNameQuery: (name) => `
    SELECT id_product FROM products WHERE name = ${db.escape(name)};
  `,

  addProductQuery: (
    id_category,
    name,
    price,
    weight,
    description,
    image_url
  ) => `
    INSERT INTO products (id_category, name, price,weight, description, image_url)
    VALUES (${db.escape(id_category)}, ${db.escape(name)}, ${db.escape(
    price
  )},${db.escape(weight)}, ${db.escape(description)}, ${db.escape(image_url)});
  `,

  getProductQuery: (productId) => `
    SELECT * FROM products WHERE id_product = ${db.escape(productId)};
  `,

  checkProductNameQuery: (name, productId, id_category) => `
    SELECT id_product FROM products WHERE name = ${db.escape(
      name
    )} AND id_product != ${db.escape(productId)} AND id_category = ${db.escape(
    id_category
  )};
  `,

  updateProductQuery: (
    productId,
    name,
    price,
    weight,
    description,
    id_category,
    image_url
  ) => `
    UPDATE products SET name = ${db.escape(name)}, price = ${db.escape(
    price
  )},weight=${db.escape(weight)}, description = ${db.escape(
    description
  )}, id_category = ${db.escape(id_category)}, image_url = ${db.escape(
    image_url
  )}
    WHERE id_product = ${db.escape(productId)};
  `,

  deleteProductQuery: (productId) => `
    DELETE FROM products
    WHERE id_product = ${db.escape(productId)};
  `,
  deleteStockProductQuery: (productId) => `
  DELETE FROM stocks WHERE id_product = ${db.escape(productId)}
  `,
  checkProductInStockQuery: (productId) =>
    `SELECT * FROM stocks WHERE id_product=${db.escape(productId)}`,
};
