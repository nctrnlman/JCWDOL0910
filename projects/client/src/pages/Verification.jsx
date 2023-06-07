import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Verification() {
  const [email, setEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromUrl = searchParams.get("email");
    setEmail(emailFromUrl);
  }, [location.search]);

  return <div className="bg-red-500 w-full h-full">Verification {email}</div>;
}

export default Verification;
