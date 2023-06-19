import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "btn-active" : "";
  };
  return (
    <div className="absolute left-0 flex flex-col justify-between shadow-lg h-screen w-1/4 lg:w-1/6 bg-base-200">
      <div className="gap-14 flex flex-col">
        <div className="pb-10">
          <h1 className="card-title flex justify-center pt-5 text-primary-focus">
            <div onClick={() => navigate("/admin-dashboard")}>Shopify</div>
          </h1>
        </div>
        <div className="flex flex-col py-10 gap-5">
          <button
            className={`btn btn-md btn-ghost ${isActive("/admin-products")}`}
            onClick={() => navigate("/admin-products")}
          >
            Products
          </button>
          <button
            className={`btn btn-md btn-ghost ${isActive("/admin-warehouses")}`}
            onClick={() => navigate("/admin-warehouses")}
          >
            Warehouse
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
