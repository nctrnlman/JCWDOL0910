import React from "react";
import ProductCategories from "./CardProductCategory";
import Carousel from "./Carousel";

function Header() {
  return (
    <div className="mx-auto">
      <div className=" flex flex-col justify-center">
        <div>
          <Carousel />
        </div>
        <div>
          <ProductCategories />
        </div>
      </div>
    </div>
  );
}

export default Header;
