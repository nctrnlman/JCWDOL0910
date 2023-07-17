import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddressModal() {
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [postalCode, setPostalCode] = useState("");

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

  const addAddress = async (e) => {
    e.preventDefault();
    const selectedProvince = provinces.find(
      (provinceItem) => provinceItem.province_id === province
    );
    const selectedCity = cities.find((cityItem) => cityItem.city_id === city);
    const token = localStorage.user_token;

    const newAddressData = {
      address: e.target.address.value,
      city: selectedCity
        ? `${selectedCity.type} ${selectedCity.city_name}`
        : "",
      province: selectedProvince ? selectedProvince.province : "",
      postal_code: e.target.postal_code.value,
      is_primary: e.target.is_primary.value,
    };

    try {
      if (token) {
        let response = await axios.post(
          `http://localhost:8000/api/user-profile/add-address`,
          newAddressData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className=" bg-slate-900 text-white active:bg-slate-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Address
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Address</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form id="address" onSubmit={addAddress}>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Address
                    </dt>
                    <input
                      className="m-2 block px-5 bg-slate-100"
                      type="text"
                      name="address"
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
                      className=" m-2 block px-2 bg-white"
                      type="text"
                      name="postal_code"
                    />
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Primary?
                    </dt>
                    <input
                      className=" m-2 block px-2 bg-white"
                      type="number"
                      name="is_primary"
                    />
                  </div>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Add to My Address
                  </button>
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
