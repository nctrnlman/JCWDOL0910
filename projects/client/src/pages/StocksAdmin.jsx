import React from "react";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";
import StocksContent from "../components/Admins/Stocks/StocksContent";

function StocksAdmin() {
  return (
    <div>
      <NavbarDashboard />
      <StocksContent />
    </div>
  );
}

export default StocksAdmin;
