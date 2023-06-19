import React, { useEffect, useState } from "react";
import axios from "axios";

const WarehousesContent = () => {
  const [warehouses, setWarehouses] = useState([]);
  const adminToken = localStorage.getItem("admin_token");
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/warehouses", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setWarehouses(response.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <div className=" bg-base-100 flex flex-col lg:flex-row lg:justify-start justify-center w-screen lg:h-full lg:w-full p-8 pl-3 lg:ml-0 lg:pl-0">
      <div className="flex flex-col gap-12 lg:gap-5 text-white p-4 h-screen lg:h-auto lg:w-screen lg:max-w-screen-md">
        <div className="lg:flex lg:justify-start">
          <button className="absolute top-10 right-15 btn lg:btn-wide btn-primary lg:relative lg:right-auto lg:top-auto lg:my-2 mt-5">
            Add New Warehouse
          </button>
        </div>
        {/* cara pin table supaya ga bisa di drag tapi bisa discrolled */}
        <div className="max-h-full h-3/4 card flex justify-center mt-8 lg:mt-0 mr-10 lg:mr-0">
          <div className="overflow-x-auto rounded-xl">
            <table className="table table-zebra table-pin-rows text-black bg-secondary  w-full">
              {/* head */}
              <thead className="sticky top-0 bg-base-200">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>District</th>
                  <th>City</th>
                  <th>Province</th>
                </tr>
              </thead>
              {/* body */}
              <tbody>
                {warehouses.map((warehouse, index) => (
                  <tr key={warehouse.id_warehouse}>
                    <th>{index + 1}</th>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.address}</td>
                    <td>{warehouse.district}</td>
                    <td>{warehouse.city}</td>
                    <td>{warehouse.province}</td>
                  </tr>
                ))}
              </tbody>
              {/* row 1 */}
              <tr className="hover">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>10</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tfoot className="sticky bottom-0 bg-base-200">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>District</th>
                  <th>City</th>
                  <th>Province</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehousesContent;
