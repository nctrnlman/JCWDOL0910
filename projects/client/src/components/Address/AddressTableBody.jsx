import React from "react";

// const AddressTableBody = ({ warehouses, openEditModal, openDeleteModal }) => {
const AddressTableBody = ({ addresses }) => {
    return (
        <tbody className="lg:text-lg">
            {addresses.map((address, index) => (
                <tr key={addresses.id_address} className="hover">
                    <th className="text-center">{index + 1}</th>
                    <td>{address.address}</td>
                    <td>{address.city}</td>
                    <td>{address.province}</td>
                    <td>{address.postal_code}</td>
                    {/* <td>{warehouse.province}</td>
                    <td>{warehouse.postal_code}</td> */}
                    {/* Add this line to display postal_code */}
                    {/* <td className="relative">
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
                    </td> */}
                </tr>
            ))}
        </tbody>
    );
};

export default AddressTableBody;
