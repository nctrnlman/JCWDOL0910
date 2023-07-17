import React from "react";
import StockReport from "../components/Admins/Reporting/StockReport2";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";

function ReportingAdmin() {
    return (
        <div>
            <NavbarDashboard />
            <StockReport />
        </div>
    );
}

export default ReportingAdmin;