import React from "react";

const WarehouseTableBody = ({ warehouses, navigate, openDeleteModal }) => {
  return (
    <tbody>
      {warehouses.map((warehouse, index) => (
        <tr key={warehouse.id_warehouse} className="hover">
          <th className="text-center">{index + 1}</th>
          <td>{warehouse.name}</td>
          <td>{warehouse.address}</td>
          <td>{warehouse.district}</td>
          <td>{warehouse.city}</td>
          <td>{warehouse.province}</td>
          <td className="relative">
            <div className="gap-5 grid grid-cols-1 items-center justify-center">
              <button
                className="btn btn-xs w-12 lg:w-full btn-info"
                onClick={() => {
                  navigate("admin-warehouses/edit");
                }}
              >
                Edit
              </button>
              <a
                className="btn btn-xs w-12 lg:w-full btn-error"
                href="#modal_delete_warehouse"
                onClick={() =>
                  openDeleteModal(warehouse.id_warehouse, warehouse.name)
                }
              >
                Delete
              </a>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default WarehouseTableBody;
