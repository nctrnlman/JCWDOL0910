import React from "react";
import Navbar from "../components/Navbar/Navbar";
import FormProfile from "../components/FormProfile";
import AddressContent from "../components/Address/AddressContent";
import UserAddressTable from "../components/UserAddressTable";
import UserAddressTable2 from "../components/UserAddressTable2";

function Profiling() {
  return (
    <div>
      <Navbar />
      <div className=" mt-8 grid grid-cols-6 gap-4 pt-12">
        <div className="col-start-2 col-span-4">
          <FormProfile />
        </div>
        <div className="col-start-2 col-span-4">
          <UserAddressTable />
        </div>
        <div className="col-start-2 col-span-4">
          <UserAddressTable2 />
        </div>
        <div className="col-start-2 col-span-4">
          <AddressContent />
        </div>
        {/* <AddressContent /> */}
        {/* <AddressCard /> */}
      </div>
    </div>
  );
}

export default Profiling;
