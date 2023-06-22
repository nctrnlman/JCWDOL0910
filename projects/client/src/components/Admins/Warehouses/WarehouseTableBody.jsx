import React from "react";

const WarehouseTableBody = ({ warehouses, openEditModal, openDeleteModal }) => {
  return (
    <tbody className="lg:text-lg">
      {warehouses.map((warehouse, index) => (
        <tr key={warehouse.id_warehouse} className="hover">
          <th className="text-center">{index + 1}</th>
          <td>{warehouse.name}</td>
          <td>{warehouse.address}</td>
          <td>{warehouse.district}</td>
          <td>{warehouse.city}</td>
          <td>{warehouse.province}</td>
          <td>{warehouse.postal_code}</td>
          {/* Add this line to display postal_code */}
          <td className="relative">
            <div className="gap-5 grid grid-cols-1 items-center justify-center">
              <a
                href="#edit_modal"
                className="btn btn-xs w-12 lg:w-full btn-info lg:btn-sm"
                onClick={() => openEditModal(warehouse.id_warehouse)}
              >
                Edit
              </a>
              <a
                className="btn btn-xs w-12 lg:w-full btn-error lg:btn-sm"
                href="#delete_modal"
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
