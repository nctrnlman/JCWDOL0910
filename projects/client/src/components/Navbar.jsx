import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../assets/Logo.png"

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className=" bg-slate-900">
            <div className="flex items-center font-medium justify-around">
                <div className="z-50 p-5 md:w-auto w-full flex justify-between">
                    <img src={Logo} alt="logo" className="md:cursor-pointer h-9" />
                </div>
            </div>
            <div className=" text-slate-200" >
                <button
                    to="/profiling"
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                        navigate("/profiling");
                    }}
                >
                    Go To Profile
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
