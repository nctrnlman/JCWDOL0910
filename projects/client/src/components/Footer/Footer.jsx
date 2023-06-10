import React from "react";
import ItemsContainer from "./ItemsContainer";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";
// import { Icons } from "./Menus";

const Footer = () => {
  const iconshere = [
    "add",
    "arrow-back",
    "arrow-forward",
    // Add more icon names as needed
  ];
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-slate-200 py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold text-slate-600
         md:w-2/5"
        >
          <span className=" text-purple-950 ">The Best</span> place to shop
        </h1>
        <div>
          {/* <input
                        type="text"
                        placeholder="Enter Your ph.no"
                        className="text-gray-800
           sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
                    />
                    <button
                        className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
                    >
                        Request Code
                    </button> */}
        </div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>Purwadhika JCWDOL09</span>
        <span>Multi Warehouse</span>
        <div className="text-purple-950">
          <span className="p-2 cursor-pointer text-neutral inline-flex items-center rounded-full  mx-1.5 text-xl hover:text-gray-100 bg-primary duration-300 ">
            <BsInstagram size={20} />
          </span>

          <span className="p-2 cursor-pointer text-neutral inline-flex items-center rounded-full  mx-1.5 text-xl hover:text-gray-100 bg-primary duration-300 ">
            <BsFacebook size={20} />
          </span>

          <span className="p-2 cursor-pointer text-neutral inline-flex items-center rounded-full  mx-1.5 text-xl hover:text-gray-100 bg-primary duration-300 ">
            <BsTwitter size={20} />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
