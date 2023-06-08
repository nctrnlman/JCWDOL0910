import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
const Navbar = () => {
    return (
        <nav className=" bg-slate-900">
            <div className="flex items-center font-medium justify-around">
                <div className="z-50 p-5 md:w-auto w-full flex justify-between">
                    <img src={Logo} alt="logo" className="md:cursor-pointer h-9" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;