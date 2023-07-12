import React from "react";
import StockReport from "../components/Admins/Reporting/StockReport";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";

function ReportingAdmin() {
    return (
        <div>
            <NavbarDashboard>
                <StockReport />
            </NavbarDashboard>
        </div>
    );
}

export default ReportingAdmin;