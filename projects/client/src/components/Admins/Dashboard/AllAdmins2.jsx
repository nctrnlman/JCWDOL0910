import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { getAllAdmins } from "../../../features/users/adminsListSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "../../CustomToast/CustomNotification";
import { fetchAllWarehouseData } from "../../../features/warehouses/warehouseSlice";

function AllAdminList() {
  const alladmins = useSelector((state) => state.alladmins.alladmins);
  const dispatch = useDispatch();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalAssignWH, setShowModalAssignWH] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [id, setId] = useState(null);
  const [warehouse_name, setWarehouseName] = useState(null);
  const warehouses = useSelector((state) => state.warehouses.warehouse);

  const selectAdmin = (id_admin) => {
    setId(id_admin);
    setShowModalEdit(true);
  };

  const selectAdminAssignWH = (id_admin) => {
    setId(id_admin);
    setShowModalAssignWH(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.admin_token;
      if (token) {
        let response = await Axios.post(
          "http://localhost:8000/api/admins/warehouse-admin",
          { name, email, password },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        showSuccessToast(response.data.message);
      }

      setShowModalAdd(false);
      setName("");
      setEmail("");
      setPassword("");
      dispatch(getAllAdmins());
    } catch (error) {
      showErrorToast("Failed to Add Admin");
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.admin_token;
      if (token) {
        let response = await Axios.post(
          `http://localhost:8000/api/admins/edit-admin/${id}`,
          { name },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        showSuccessToast(response.data.message);
      }

      setShowModalEdit(false);
      setName("");
      setId(null);
      dispatch(getAllAdmins());
    } catch (error) {
      showErrorToast("Failed to edit data admin");
    }
  };

  useEffect(() => {
    dispatch(fetchAllWarehouseData());
  }, []);

  const handleAssignWH = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.admin_token;
      if (token) {
        let response = await Axios.post(
          `http://localhost:8000/api/admins/assign-admin/${id}`,
          { warehouse_name },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        showSuccessToast(response.data.message);
      }

      setShowModalEdit(false);
      setName("");
      setId(null);
      dispatch(getAllAdmins());
    } catch (error) {
      showErrorToast("Failed to assign admin into warehouse");
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      const token = localStorage.admin_token;
      let response = await Axios.delete(
        `http://localhost:8000/api/admins/delete-admin/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showSuccessToast(response.data.message);
      setShowModalDelete(false);
      setId(null);
      dispatch(getAllAdmins());
    } catch (error) {
      showErrorToast("Failed to delete admin account");
    }
  };

  const renderCategoryList = () => {
    return alladmins?.map((admin, index) => {
      const currentCount = index + 1;
      return (
        <tr key={admin.id_admin}>
          <td>{currentCount}</td>
          <td>{admin.id_admin}</td>
          <td>{admin.name}</td>
          <td>{admin.email}</td>
          <td>{admin.id_role}</td>
          <td>{admin.warehouse_name}</td>
          <td>
            <button
              className="btn btn-info btn-outline"
              onClick={() => selectAdmin(admin.id_admin)}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-error btn-outline"
              onClick={() => {
                setId(admin.id_admin);
                setShowModalDelete(true);
              }}
            >
              Delete
            </button>
          </td>

          <td>
            <button
              className="btn btn-info btn-outline"
              onClick={() => selectAdminAssignWH(admin.id_admin)}
            >
              Assign to WH
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    dispatch(getAllAdmins());
  }, []);

  return (
    <div className="overflow-x-auto w-full px-3 lg:w-3/4 m-auto">
      <h1 className="text-center p-4 font-bold uppercase">
        Admin & Warehouse Admin List
      </h1>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setShowModalAdd(true)}
        >
          Create Warehouse Admin
        </button>
        {showModalAdd && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal modal-open">
              <div className="modal-box">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setShowModalAdd(false)}
                >
                  ✕
                </button>
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      className="input input-bordered"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Password"
                      className="input input-bordered"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-control mt-6">
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmitAdd}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No</th>
            <th>Admin ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Warehouse Name</th>
            <th>Action</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>{renderCategoryList()}</tbody>
      </table>
      {showModalEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setShowModalEdit(false);
                  setId(null);
                  setName("");
                }}
              >
                ✕
              </button>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmitEdit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalAssignWH && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setShowModalAssignWH(false);
                  setId(null);
                  setName("");
                }}
              >
                ✕
              </button>
              <div className="card-body">
                <div className="form-control m-5">
                  <select
                    value={warehouse_name}
                    onChange={(e) => {
                      setWarehouseName(e.target.value);
                    }}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select warehouse</option>
                    {warehouses?.map((w) => (
                      <option key={w.name} value={w.name}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={handleAssignWH}>
                    Assign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setShowModalDelete(false);
                  setId(null);
                }}
              >
                ✕
              </button>
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-4">
                  Are you sure you want to delete this Admin?
                </h3>
                <div className="form-control mt-6">
                  <button className="btn btn-error" onClick={handleDeleteAdmin}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllAdminList;
