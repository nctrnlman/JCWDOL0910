module.exports = {
  // Helper function to parse total_stock as an integer
  parseTotalStock: (products) => {
    products.forEach((product) => {
      product.total_stock = parseInt(product.total_stock);
    });
  },
};
