import React from "react";
import DashboardContent from "../components/Admins/Dashboard/DashboardContent";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";

function DashboardAdmin() {
  return (
    <div>
      <NavbarDashboard>
        <DashboardContent />
      </NavbarDashboard>
    </div>
  );
}

export default DashboardAdmin;
