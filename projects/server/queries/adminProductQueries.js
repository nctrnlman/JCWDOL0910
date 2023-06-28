const { db, query } = require("../database");

module.exports = {
  getAllProductsQuery: `
    SELECT p.*
    FROM products p
    GROUP BY p.id_product
    ORDER BY p.name ASC;
  `,

  getProductsByPageQuery: (itemsPerPage, offset) => `
    SELECT p.*, c.name AS category_name, SUM(s.total_stock) AS total_stock
    FROM products p
    INNER JOIN stocks s ON p.id_product = s.id_product
    INNER JOIN categories c ON p.id_category = c.id_category
    GROUP BY p.id_product
    LIMIT ${itemsPerPage}
    OFFSET ${offset};
  `,

  getCountQuery: `
    SELECT COUNT(*) AS total FROM products;
  `,

  getCategoryQuery: (id) => `
    SELECT id_category, name FROM categories WHERE id_category = ${db.escape(
      id
    )};
  `,

  getProductNameQuery: (name) => `
    SELECT id_product FROM products WHERE name = ${db.escape(name)};
  `,

  addProductQuery: (id_category, name, price, description, image_url) => `
    INSERT INTO products (id_category, name, price, description, image_url)
    VALUES (${db.escape(id_category)}, ${db.escape(name)}, ${db.escape(
    price
  )}, ${db.escape(description)}, ${db.escape(image_url)});
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
    description,
    id_category,
    image_url
  ) => `
    UPDATE products SET name = ${db.escape(name)}, price = ${db.escape(
    price
  )}, description = ${db.escape(description)}, id_category = ${db.escape(
    id_category
  )}, image_url = ${db.escape(image_url)}
    WHERE id_product = ${db.escape(productId)};
  `,

  deleteProductQuery: (productId) => `
    DELETE FROM products
    WHERE id_product = ${db.escape(productId)};
  `,

  deleteOrderItemsQuery: (productId) => `
    DELETE FROM order_items
    WHERE id_product = ${db.escape(productId)};
  `,
};
