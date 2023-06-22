import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../features/AllUsersSlice";
import { Link, useNavigate } from "react-router-dom";

function AllUsers() {
    //   const navigate = useNavigate();
    const allUsers = useSelector((state) => state.allUsers.allUsers);
    // const [temp_profile, setTempProfile] = useState(existing_profile);
    // const [changed, setChanged] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
        console.log("dispatch", dispatch(getAllUsers()))
    }, []);

    // useEffect(() => {
    //     console.log('existing', existing_profile);
    //     console.log('temp', temp_profile)
    //     console.log('changed', changed)
    // });

    // useEffect(() => {
    //     if (existing_profile) {
    //         setTempProfile(existing_profile);
    //     }
    // }, [existing_profile]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setChanged(true);
    //     setTempProfile((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };

    // const editProfile = async (event) => {
    //     console.log(event.preventDefault());
    //     console.log(event.target.value);
    //     try {
    //         event.preventDefault();
    //         const token = localStorage.user_token;
    //         const { first_name, last_name, email } = temp_profile;

    //         if (token) {
    //             let response = await axios.post(
    //                 `http://localhost:8000/user_profile/edit-data`,
    //                 { first_name, last_name, email },
    //                 {
    //                     headers: { Authorization: `Bearer ${token}` },
    //                 }
    //             );
    //             console.log(response)
    //             console.log(response.data[0]);
    //             dispatch(setUser(response.data[0]));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div>
            {allUsers?.map((user) => {
                return (
                    <p>{user.first_name}</p>
                );
            })}
        </div>
    );
}

export default AllUsers;