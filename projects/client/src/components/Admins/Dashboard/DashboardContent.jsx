import React from "react";
import AllUsers from "./AllUsers";
import AllAdmins from "./AllAdmins";
import AllAdminList from "./AllAdmins2";
import TransactionReport from "../Reporting/TransactionReport";

const DashboardContent = () => {
  return (
    <div className=" flex-row bg-base-100 h-screen w-screen  px-16 lg:">
      <AllUsers />
      {/* <AllAdmins /> */}
      <AllAdminList />
      {/* <TransactionReport /> */}
    </div>
  );
};

export default DashboardContent;
