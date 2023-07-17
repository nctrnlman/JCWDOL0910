const setLastVisitedPage = (location) => {
  const { pathname } = location;
  const isAdminRoute = pathname.startsWith("/admin");

  if (pathname !== "/login" && pathname !== "/register" && !isAdminRoute) {
    sessionStorage.setItem("lastVisitedPage", pathname + location.search);
  }
};

export default setLastVisitedPage;
