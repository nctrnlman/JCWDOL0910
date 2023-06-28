import React from "react";
import { useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  // Extract the current path from the location
  const currentPath = location.pathname;

  // Define the breadcrumb labels and corresponding paths
  const breadcrumbs = [
    { label: "Dashboard", path: "/admin-dashboard" },
    { label: "Products", path: "/admin-products" },
    { label: "Warehouse", path: "/admin-warehouses" },
    { label: "Categories", path: "/admin-categories" },
  ];

  // Find the breadcrumb that matches the current path
  const currentBreadcrumb = breadcrumbs.find(
    (breadcrumb) => breadcrumb.path === currentPath
  );

  // Generate the breadcrumb trail
  let breadcrumbTrail;

  if (currentBreadcrumb && currentPath !== "/admin-dashboard") {
    breadcrumbTrail = (
      <li>
        <a href={currentBreadcrumb.path} className="font-bold">
          {currentBreadcrumb.label}
        </a>
      </li>
    );
  } else {
    breadcrumbTrail = null;
  }

  return (
    <div className="text-sm breadcrumbs py-3 px-7 lg:px-5 mx-2 lg:mx-0">
      <ul>
        <li>
          <a href="/admin-dashboard">Dashboard</a>
        </li>
        {breadcrumbTrail}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
