import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "../features/UserAddress";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import AddressModal from "./AddAddressModal";
import { Card, Typography } from "@material-tailwind/react";

function UserAddressTable() {
  const existing_address = useSelector((state) => state.addresses.addresses);
  const [temp_address, setTempAddress] = useState(existing_address);
  const [changed, setChanged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddress());
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

  const TABLE_HEAD = ["ADDRESS", "CITY", "PROVINCE", "POSTAL CODE", "ACTIONS"];

  return (
    <div>
      {/* <div className="px-4 sm:px-0"> */}
      <div className="grid grid-cols-6 my-3">
        <h3 className="font-bold leading-7 text-gray-900 text-xl">
          My Addresses
        </h3>
        <div className="col-start-6 col-span-6">
          <AddressModal></AddressModal>
        </div>
      </div>

      <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-slate-200 bg-slate-100 p-7 "
                >
                  <Typography
                    variant="small"
                    className="font-bold leading-none opacity-70 text-slate-700"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {existing_address
              ? temp_address.map((address_point) => (
                  <tr
                    key={address_point.id_address}
                    className="even:bg-slate-100"
                  >
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {address_point.address}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {address_point.city}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {address_point.province}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {address_point.postal_code}
                      </Typography>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default UserAddressTable;
