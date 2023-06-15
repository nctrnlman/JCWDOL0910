import React from "react";
import Navbar from "../components/Navbar";
import FormProfile from "../components/FormProfile";

function Profiling() {
  return (
    <div >
      <Navbar />
      <div className=" mt-8 grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4">
          <FormProfile />
        </div>
      </div>

    </div>
  );
}

export default Profiling;
