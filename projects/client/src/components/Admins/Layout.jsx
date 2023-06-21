import React from "react";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-auto lg:overflow-hidden">
      <div className="w-1/5 lg:w-1/6 flex-shrink-0 z-10">
        <Sidebar />
      </div>
      <div className="flex-grow flex">
        <div className="absolute">
          <Breadcrumbs />
        </div>
        <div className="bg-base-300 pl-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
