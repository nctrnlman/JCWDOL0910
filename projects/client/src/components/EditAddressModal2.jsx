import React from "react";
import { AiFillDelete } from "react-icons/ai";

function EditAddressModal({ address, handleInputChange, editAddress, deleteAddress }) {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <div>
            <button
                className="bg-slate-900 text-white active:bg-slate-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Edit Address
            </button>

            {showModal && (
                <div className="mt-6 border-t border-gray-300" key={address.id_address}>
                    <dl className="divide-y divide-gray-100">
                        <form id="address">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                <input
                                    className="m-2 block px-2 bg-white"
                                    type="text"
                                    name="address"
                                    value={address.address}
                                    onChange={(e) => handleInputChange(address.id_address, e)}
                                />
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">City</dt>
                                <input
                                    className="m-2 block px-2 bg-white"
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={(e) => handleInputChange(address.id_address, e)}
                                />
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Province</dt>
                                <input
                                    className="m-2 block px-2 bg-white"
                                    type="text"
                                    name="province"
                                    value={address.province}
                                    onChange={(e) => handleInputChange(address.id_address, e)}
                                />
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Postal_code</dt>
                                <input
                                    className="m-2 block px-2 bg-white"
                                    type="text"
                                    name="postal_code"
                                    value={address.postal_code}
                                    onChange={(e) => handleInputChange(address.id_address, e)}
                                />
                            </div>
                        </form>

                        <div className="grid gap-4 grid-cols-8">
                            <button
                                className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-m font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 text-center"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-m font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 text-center"
                                onClick={(e) => editAddress(address.id_address, e)}
                            >
                                Save
                            </button>
                        </div>
                        <button
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-m font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 text-center"
                            onClick={(e) => deleteAddress(address.id_address, e)}
                        >
                            <AiFillDelete />
                        </button>
                    </dl>
                </div>
            )}
        </div>
    );
}

export default EditAddressModal;