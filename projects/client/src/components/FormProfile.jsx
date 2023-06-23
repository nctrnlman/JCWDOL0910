import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../features/ProfileSlice";
import { Link, useNavigate } from "react-router-dom";

function FormProfile() {
  //   const navigate = useNavigate();
  const existing_profile = useSelector((state) => state.profile.profile);
  const [temp_profile, setTempProfile] = useState(existing_profile);
  const [changed, setChanged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
    // console.log("dispatch", dispatch(getProfile()))
  }, []);

  useEffect(() => {
    if (existing_profile) {
      setTempProfile(existing_profile);
    }
  }, [existing_profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChanged(true);
    setTempProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editProfile = async (event) => {
    try {
      event.preventDefault();
      const token = localStorage.user_token;
      const { first_name, last_name, email } = temp_profile;

      if (token) {
        let response = await axios.post(
          `http://localhost:8000/api/user-profile/edit-data`,
          { first_name, last_name, email },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        localStorage.setItem("user_details", JSON.stringify(response.data[0])); // Save user details in local storage
        dispatch(getProfile());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Hello, {existing_profile.first_name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and addresses.
        </p>
      </div>
      {existing_profile ? (
        <div className="mt-6 border-t border-gray-300">
          <dl className="divide-y divide-gray-100">
            <form id="profile">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  First name
                </dt>
                <input
                  className="m-2 block px-2 bg-white"
                  type="text"
                  name="first_name"
                  value={temp_profile.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Last name
                </dt>
                <input
                  className=" m-2 block px-2 bg-white"
                  type="text"
                  name="last_name"
                  value={temp_profile.last_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email
                </dt>
                <input
                  className=" m-2 block px-2 bg-white"
                  type="text"
                  name="email"
                  value={temp_profile.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Gender
                </dt>
                <input
                  className=" m-2 block px-2 bg-white"
                  type="text"
                  name="gender"
                  value={temp_profile.gender}
                  onChange={handleInputChange}
                />
              </div>
            </form>

            {changed ? (
              <div className="grid gap-4 grid-cols-8">
                <button
                  className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-m font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 text-center"
                  onClick={(e) => {
                    setTempProfile({ ...existing_profile });
                    setChanged(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-m font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 text-center"
                  onClick={editProfile}
                >
                  Save
                </button>
              </div>
            ) : null}
          </dl>
        </div>
      ) : null}
    </div>
  );
}

export default FormProfile;
