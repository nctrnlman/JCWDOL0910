import React from "react";
import ProductContent from "../components/Admins/Products/ProductContent";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";

function ProductsAdmin() {
  return (
    <div>
      <NavbarDashboard>
        <ProductContent />
      </NavbarDashboard>
    </div>
  );
}

export default ProductsAdmin;
