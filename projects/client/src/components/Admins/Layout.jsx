import React from "react";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-auto">
      <div className="w-1/6 flex-shrink-0 z-10">
        <Sidebar />
      </div>
      <div className="flex-grow flex">
        <div className="absolute">
          <Breadcrumbs />
        </div>
        <div className="min-h-screen bg-base-200">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
