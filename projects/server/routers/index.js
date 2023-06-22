const userController = require("./userRouter");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const adminRoutes = require("./adminRoutes");
module.exports = {
  userController,
  categoryRoutes,
  productRoutes,
  cartRoutes,
  userProfileRoutes,
  adminRoutes
};
