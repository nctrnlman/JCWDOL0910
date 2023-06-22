const redirectWithoutToken = (userToken, pathname, navigate, setShowToast) => {
  if (!userToken && (pathname === "/cart" || pathname === "/profiling")) {
    navigate("/");
    setShowToast(true);
  }
};

export default redirectWithoutToken;
