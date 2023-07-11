import React from "react";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";
import OrderListAdminContent from "../components/Admins/OrderList/OrderListAdminContent";

function OrderListAdmin() {
  return (
    <div>
      <NavbarDashboard />
      <OrderListAdminContent />
    </div>
  );
}

export default OrderListAdmin;
