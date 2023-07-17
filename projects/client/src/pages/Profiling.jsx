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
      <div className=" mt-8 flex-row gap-4 pt-12">
        <div className=" mt-5 ml-10  mr-10 flex-col">
          <div>
            <FormProfile />
          </div>
          <div>
            <ImageProfileUploader />
          </div>
        </div>
        {/* <div className="col-start-2 col-span-4 row-start-2">
          <UserAddressTable3 />
        </div> */}
        <div>
          <AddressContent />
        </div>
      </div>
    </div>
  );
}

export default Profiling;
