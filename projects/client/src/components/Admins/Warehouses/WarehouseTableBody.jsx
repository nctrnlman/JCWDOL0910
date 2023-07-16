import React from "react";
import { useSelector } from "react-redux";
import EmptyTableData from "../../Cards/EmptyTableData";

const WarehouseTableBody = ({
  warehouses,
  openEditModal,
  openDeleteModal,
  currentPage,
}) => {
  const itemsPerPage = useSelector((state) => state.warehouses.itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    <tbody className="lg:text-lg">
      {warehouses.length === 0 ? (
        <EmptyTableData />
      ) : (
        <>
          {warehouses.map((warehouse, index) => (
            <tr key={warehouse.id_warehouse} className="hover">
              <td>{startIndex + index + 1}</td>
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
        </>
      )}
    </tbody>
  );
};

export default WarehouseTableBody;
