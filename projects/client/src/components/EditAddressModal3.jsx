import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

function EditAddressModal({ address, handleInputChange, editAddress }) {
  const [showModal, setShowModal] = useState(false);
  const [province, setProvince] = useState(address.province);
  const [city, setCity] = useState(address.city);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [postalCode, setPostalCode] = useState(address.postal_code);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/rajaongkir/provinces"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces: ", error);
      }
    };

    fetchProvinces();
  }, []);

  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/rajaongkir/cities/${provinceId}`
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities: ", error);
    }
  };

  const selectedProvince = provinces.find(
    (provinceItem) => provinceItem.province_id === province
  );
  const selectedCity = cities.find((cityItem) => cityItem.city_id === city);

  const handleSubmit = (idAddress, e) => {
    e.preventDefault();
    const updatedAddress = {
      ...address,
      province: selectedProvince.province,
      city: selectedCity.city_name,
      postal_code: postalCode,
    };
    editAddress(idAddress, updatedAddress);
    setShowModal(false);
  };

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
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Address
                </dt>
                <input
                  className="m-2 block px-2 bg-white"
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={(e) => handleInputChange(address.id_address, e)}
                />
              </div>
              {/* ... */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Province:</span>
                </label>
                <select
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                    setCity("");
                    fetchCities(e.target.value);
                  }}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select province</option>
                  {provinces.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">City:</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {`${city.type} ${city.city_name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Postal_code
                </dt>
                <input
                  className="m-2 block px-2 bg-white"
                  type="text"
                  name="postal_code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="grid gap-4 grid-cols-8">
                <button
                  className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-m font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 text-center"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-m font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 text-center"
                  onClick={(e) => handleSubmit(address.id_address, e)}
                >
                  Save
                </button>
              </div>
            </form>
          </dl>
        </div>
      )}
    </div>
  );
}

export default EditAddressModal;
