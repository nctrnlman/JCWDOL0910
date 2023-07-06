import React from "react";
import AllUsers from "./AllUsers"
import AllAdmins from "./AllAdmins"
import AllAdminList from "./AllAdmins2"

const DashboardContent = () => {
  return (
    <div className=" flex-row bg-base-100 h-screen w-screen  px-16 lg:">
      <AllUsers />
      {/* <AllAdmins /> */}
      <AllAdminList />
    </div>
  );
};

export default DashboardContent;
