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
    <footer className="bg-gray-900">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-slate-200 py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold text-slate-600
         md:w-2/5"
        >
          <span className=" text-purple-950 ">The Best</span> place to shop
        </h1>
        <div></div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-primary-focus text-sm pb-8"
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
