import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "../features/UserAddress";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import AddressModal from "./AddAddressModal";

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
    if (existing_address) {
      setTempAddress(existing_address);
    }
  }, [existing_address]);

  const handleInputChange = (id_address, e) => {
    const { name, value } = e.target;

    setChanged(true);
    setTempAddress((prevState) => {
      const updatedAddress = prevState.map((address) => {
        if (address.id_address === id_address) {
          return {
            ...address,
            [name]: value,
          };
        }
        return address;
      });
      return updatedAddress;
    });
  };

  const editAddress = async (id_address, event) => {
    try {
      event.preventDefault();
      const token = localStorage.user_token;

      const editedAddress = temp_address.find(
        (address) => address.id_address === id_address
      );

      if (token) {
        let response = await axios.post(
          `http://localhost:8000/api/user-profile/edit-address/${id_address}`,
          editedAddress,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAddress = async (id_address, event) => {
    try {
      console.log(id_address);
      const token = localStorage.user_token;
      if (token) {
        let response = await axios.delete(
          `http://localhost:8000/api/user-profile/delete-address/${id_address}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Addresses
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal addresses.
        </p>
      </div>
      <AddressModal></AddressModal>
      {existing_address
        ? temp_address.map((address_point) => {
            return (
              <div
                className="mt-6 border-t border-gray-300"
                key={address_point.id_address}
              >
                <dl className="divide-y divide-gray-100">
                  <form id="address">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Address
                      </dt>
                      <input
                        className="m-2 block px-2 bg-white"
                        type="text"
                        name="address"
                        value={address_point.address}
                        onChange={(e) =>
                          handleInputChange(address_point.id_address, e)
                        }
                      />
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        City
                      </dt>
                      <input
                        className=" m-2 block px-2 bg-white"
                        type="text"
                        name="city"
                        value={address_point.city}
                        onChange={(e) =>
                          handleInputChange(address_point.id_address, e)
                        }
                      />
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Province
                      </dt>
                      <input
                        className=" m-2 block px-2 bg-white"
                        type="text"
                        name="province"
                        value={address_point.province}
                        onChange={(e) =>
                          handleInputChange(address_point.id_address, e)
                        }
                      />
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Postal_code
                      </dt>
                      <input
                        className=" m-2 block px-2 bg-white"
                        type="text"
                        name="postal_code"
                        value={address_point.postal_code}
                        onChange={(e) =>
                          handleInputChange(address_point.id_address, e)
                        }
                      />
                    </div>
                  </form>

                  {changed ? (
                    <div className="grid gap-4 grid-cols-8">
                      <button
                        className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-m font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 text-center"
                        onClick={(e) => {
                          setTempAddress({ ...existing_address });
                          setChanged(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-m font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 text-center"
                        onClick={(e) =>
                          editAddress(address_point.id_address, e)
                        }
                      >
                        Save
                      </button>
                    </div>
                  ) : null}
                  <button
                    className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-m font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 text-center"
                    onClick={(e) => deleteAddress(address_point.id_address, e)}
                  >
                    <AiFillDelete />
                  </button>
                </dl>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default AddressCard;
