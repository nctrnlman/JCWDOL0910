import React from "react";
import WarehousesContent from "../components/Admins/Warehouses/WarehousesContent";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";

function WarehousesAdmin() {
  return (
    <div>
      <NavbarDashboard />
      <WarehousesContent />
    </div>
  );
}

export default WarehousesAdmin;
