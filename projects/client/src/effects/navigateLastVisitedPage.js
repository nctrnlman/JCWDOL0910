const navigateLastVisitedPage = (userToken, location, navigate) => {
  if (
    userToken &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    navigate(sessionStorage.getItem("lastVisitedPage"));
    // if the user tried to access login or register when they log in,
    // the user will navigate to the last visited page
  }
};

export default navigateLastVisitedPage;
