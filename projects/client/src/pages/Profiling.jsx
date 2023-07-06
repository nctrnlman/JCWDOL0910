import React from "react";
import Navbar from "../components/Navbar/Navbar";
import FormProfile from "../components/FormProfile";
import UserAddressTable from "../components/UserAddressTable";
import UserAddressTable2 from "../components/UserAddressTable2";
import UserAddressTable3 from "../components/UserAddressTable3";
import ImageProfileUploader from "../components/ImageProfileUploader";
import AddressContent from "../components/Address2/AddressContent";

function Profiling() {
  return (
    <div>
      <Navbar />
      <p>profile</p>
      <div className=" mt-8 grid grid-cols-6 grid-rows-3 gap-4 pt-12">
        <div className=" col-start-2 col-span-4 row-start-1 grid grid-cols-4 grid-rows-1">
          <div className="col-start-2 col-span-4 row-start-1">
            <FormProfile />
          </div>
          <div className="col-start-1 col-span-2 row-start-1">
            <ImageProfileUploader />
          </div>
        </div>
        {/* <div className="col-start-2 col-span-4 row-start-2">
          <UserAddressTable3 />
        </div> */}
        <div className="col-start-2 col-span-4 row-start-3">
          <AddressContent />
        </div>
      </div>
    </div>
  );
}

export default Profiling;
