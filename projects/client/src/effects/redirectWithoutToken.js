export const redirectWithoutUserToken = (
  userToken,
  pathname,
  navigate,
  setShowToast
) => {
  const protectedRoutes = [
    "/profiling",
    "/cart",
    "/orders",
    "/create-order",
    "/payment/:id",
  ];

  if (!userToken && protectedRoutes.includes(pathname)) {
    navigate("/");
    setShowToast(true);
  }
};

export const redirectWithoutAdminToken = (adminToken, pathname, navigate) => {
  const protectedAdminRoutes = [
    "/admin-dashboard",
    "/admin-products",
    "/admin-warehouses",
    "/admin-categories",
    "/admin-stocks",
    "/admin-stock-mutation",
    "/admin-reporting",
    "/admin-reporting-stock"
  ];

  if (
    !adminToken &&
    protectedAdminRoutes.some((route) => pathname.startsWith(route))
  ) {
    navigate("/admin-login");
  }
};
