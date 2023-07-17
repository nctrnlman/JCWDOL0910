import React, { useEffect, useState } from "react";
import axios from "axios";
import { addAddress } from "../../features/UserAddress";
import { useDispatch } from "react-redux";

const CreateModalAddress = ({ closeCreateModal, handleCreate }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const dispatch = useDispatch();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProvince = provinces.find(
      (provinceItem) => provinceItem.province_id === province
    );
    const selectedCity = cities.find((cityItem) => cityItem.city_id === city);

    const newAddressData = {
      name,
      address,
      province: selectedProvince ? selectedProvince.province : "",
      city: selectedCity
        ? `${selectedCity.type} ${selectedCity.city_name}`
        : "",
      postal_code: postalCode,
    };

    dispatch(addAddress(newAddressData));
    closeCreateModal();
  };

  return (
    <div className="modal" id="create_modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Address</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address:</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input input-bordered"
              placeholder="Enter address"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Province:</span>
            </label>
            <select
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                setCity(""); // Reset city when province changes
                fetchCities(e.target.value);
              }}
              className="select select-bordered"
              required
            >
              <option value="">Select province</option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Postal Code:</span>
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="input input-bordered"
              placeholder="Enter postal code"
              required
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={closeCreateModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModalAddress;
