import React from 'react';
import ProductCategories from "./CardProductCategory";
import Carousel from './Carousel';

function Header() {
    return (
        // <section className=' ml-[30px] mt-[20px] mb-[30px] pt-36 lg:pt-0 '></section>
        <section>
            <div className='container mx-auto'>
                {/* <div className=' flex flex-col gap-y-[30px] xl:flex-row xl:gap-x-[30px]'> */}
                <div className=' flex flex-row gap-x-[30px]'>
                    {/* <div> */}
                    <div>
                        <ProductCategories />
                    </div>
                    {/* <div className='w-full max-w-lg lg:max-w-[734px] mx-auto'>
                        Carousel
                    </div> */}
                    <div>
                        <Carousel />
                    </div>

                </div>


            </div>
        </section>
    );

};

export default Header;