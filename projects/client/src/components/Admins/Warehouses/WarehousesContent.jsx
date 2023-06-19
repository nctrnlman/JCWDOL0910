import React from "react";

const WarehousesContent = () => {
  return (
    <div className="flex lg:justify-start justify-center bg-base-100 h-screen w-screen lg:max-h-full lg:w-full pl-20 ml-10 lg:ml-0 lg:pl-0">
      <div className="flex flex-col gap-12 lg:gap-5 text-white p-4 lg:mt-10  lg:w-screen lg:max-w-screen-md">
        <div className="lg:flex lg:justify-start">
          <button className="btn w-1/2  lg:btn-wide btn-primary absolute top-10 lg:relative lg:right-auto lg:top-auto lg:my-2 mt-5">
            Add New Warehouse
          </button>
        </div>
        <div className="overflow-x-auto card flex justify-center mt-16 lg:mt-0 mr-10 lg:mr-0">
          <div className="max-w-full overflow-x-auto">
            <table className="table table-zebra text-black bg-secondary rounded-none w-full">
              {/* head */}
              <thead className="sticky top-0 bg-base-200">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              {/* body */}
              <tbody>
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
                {/* rest of the rows */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
                <tr>
                  <th>8</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
                <tr>
                  <th>9</th>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehousesContent;
