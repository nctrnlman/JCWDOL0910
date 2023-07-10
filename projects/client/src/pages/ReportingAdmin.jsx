import React from "react";
import TransactionReport from "../components/Admins/Reporting/TransactionReport";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";

function ReportingAdmin() {
    return (
        <div>
            <NavbarDashboard>
                <TransactionReport />
            </NavbarDashboard>
        </div>
    );
}

export default ReportingAdmin;
