import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "../features/UserAddress";
import { Link, useNavigate } from "react-router-dom";


function AddressCard() {
    // const existing_address = useSelector((state) => state.addresses.addresses);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAddress());
    //     // console.log("dispatch", dispatch(getProfile()))
    // }, []);

    // console.log(existing_address)
    // return (
    //     <div>Addresses</div>
    // )

    const existing_address = useSelector((state) => state.addresses.addresses);
    const [temp_address, setTempAddress] = useState(existing_address);
    const [changed, setChanged] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAddress());
        // console.log("dispatch", dispatch(getProfile()))
    }, []);

    useEffect(() => {
        console.log('existing', existing_address);
        console.log('temp', temp_address)
        console.log('changed', changed)
    });

    useEffect(() => {
        if (existing_address) {
            setTempAddress(existing_address);
        }
    }, [existing_address]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChanged(true);
        setTempAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const editAddress = async (event) => {
        // console.log(event.preventDefault());
        // console.log(event.target.value);
        try {
            event.preventDefault();
            const token = localStorage.user_token;
            const { first_name, last_name, email } = temp_address;

            if (token) {
                let response = await axios.post(
                    `http://localhost:8000/user_profile/edit-data`,
                    { first_name, last_name, email },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log(response)
                // console.log(response.data[0]);
                // dispatch(setUser(response.data[0]));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Hello, {existing_address.first_name}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and addresses.</p>
            </div>
            {existing_address ? (
                <div className="mt-6 border-t border-gray-300">
                    <dl className="divide-y divide-gray-100">
                        <form id="profile">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">First name</dt>
                                <input
                                    className="m-2 block px-2 bg-white"
                                    type="text"
                                    name="first_name"
                                    value={temp_address.first_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Last name</dt>
                                <input
                                    className=" m-2 block px-2 bg-white"
                                    type="text"
                                    name="last_name"
                                    value={temp_address.last_name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                <input
                                    className=" m-2 block px-2 bg-white"
                                    type="text"
                                    name="email"
                                    value={temp_address.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                                <input
                                    className=" m-2 block px-2 bg-white"
                                    type="text"
                                    name="gender"
                                    value={temp_address.gender}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>

                        {changed ? (
                            <div className="grid gap-4 grid-cols-8">
                                <button className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-m font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 text-center" onClick={(e) => { setTempAddress({ ...existing_address }); setChanged(false) }}>Cancel</button>
                                <button className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-m font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 text-center" onClick={editAddress}>Save</button>
                            </div>
                        )
                            : null}

                    </dl>
                </div>
            ) : null}

        </div>
    );
}

export default AddressCard;