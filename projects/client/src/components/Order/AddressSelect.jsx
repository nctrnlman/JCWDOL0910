import React, { useEffect, useState } from "react";
import axios from "axios";

const AddressSelect = ({
  selectedAddress,
  handleAddressChange,
  navigateToProfile,
}) => {
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.user_token;
      if (token) {
        let response = await axios.get(
          `http://localhost:8000/api/user-profile/get-address`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAddresses(response.data);

        if (response.data.length > 0) {
          const firstAddressId = response.data[0].id_address;
          handleAddressChange({ target: { value: firstAddressId } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h1 className="text-xl font-bold mb-2">Address</h1>
      {addresses.length > 0 ? (
        <div className="form-control">
          <select
            value={selectedAddress}
            onChange={handleAddressChange}
            className="select select-bordered text-[11px] lg:text-sm"
            required
          >
            {addresses.map((a) => (
              <option key={a.id_address} value={a.id_address}>
                {`${a.address}, ${a.city}, ${a.province}, ${a.postal_code}`}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex items-center gap-4 justify-between">
          <p className="text-md">You don't have any addresses yet.</p>
          <button className="btn mt-2" onClick={navigateToProfile}>
            Go to Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressSelect;
