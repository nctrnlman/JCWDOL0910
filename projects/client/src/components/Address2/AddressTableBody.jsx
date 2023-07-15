import React from "react";

const AddressTableBody = ({ addresses, openEditModal, openDeleteModal, openSetPrimaryModal }) => {
  return (
    <tbody className="lg:text-lg">
      {addresses.map((address, index) => (
        <tr key={address.id_address} className="hover">
          <th className="text-center">{index + 1}</th>
          <td>{address.address}</td>
          <td>{address.city}</td>
          <td>{address.province}</td>
          <td>{address.postal_code}</td>
          <td>{address.is_primary2}</td>
          {/* Add this line to display postal_code */}
          <td className="relative">
            <div className="gap-5 grid grid-cols-1 items-center justify-center">
              <a
                href="#edit_modal"
                className="btn btn-xs w-12 lg:w-full btn-info lg:btn-sm"
                onClick={() => openEditModal(address.id_address)}
              >
                Edit
              </a>
              <a
                className="btn btn-xs w-12 lg:w-full btn-error lg:btn-sm"
                href="#delete_modal"
                onClick={() =>
                  openDeleteModal(address.id_address)
                }
              >
                Delete
              </a>
              <a
                className="btn btn-xs w-12 lg:w-full btn-error lg:btn-sm"
                href="#set_primary_modal"
                onClick={() =>
                  openSetPrimaryModal(address.id_address)
                }
              >
                Set Primary
              </a>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AddressTableBody;
