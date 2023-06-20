import { logoutUser } from "../features/users/userSlice";

const checkTokenExpiration = (dispatch, navigate) => {
  const interval = setInterval(() => {
    const expToken = localStorage.getItem("exp_token");
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (expToken && parseInt(expToken) <= currentTimestamp) {
      dispatch(logoutUser());
      navigate("/login");
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
};

export default checkTokenExpiration;
