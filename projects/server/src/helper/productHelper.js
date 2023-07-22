module.exports = {
  parseTotalStock: (products) => {
    products.forEach((product) => {
      product.total_stock = parseInt(product.total_stock);
    });
  },
};
