const setLastVisitedPage = (location) => {
  if (location.pathname !== "/login" && location.pathname !== "/register") {
    sessionStorage.setItem(
      "lastVisitedPage",
      location.pathname + location.search
    );
  }
};

export default setLastVisitedPage;
