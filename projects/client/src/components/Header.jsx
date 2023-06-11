import React from "react";
import ProductCategories from "./CardProductCategory";
import Carousel from "./Carousel";

function Header() {
  return (
    // <section className=' ml-[30px] mt-[20px] mb-[30px] pt-36 lg:pt-0 '></section>
    <div className="mx-auto">
      {/* <div className=' flex flex-col gap-y-[30px] xl:flex-row xl:gap-x-[30px]'> */}
      <div className=" flex flex-col justify-center">
        {/* <div> */}
        {/* <div className='w-full max-w-lg lg:max-w-[734px] mx-auto'>
                        Carousel
                    </div> */}
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
