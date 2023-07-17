import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addProfilePic, getProfile } from "../features/ProfileSlice";

// import { Link, useNavigate } from "react-router-dom";

function ImageProfileUploader() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const existing_profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image_url", image);
    dispatch(addProfilePic(formData));
  };

  return (
    <div>
      <img
        className="w-[300px] h-[200px] object-cover p-2"
        src={`http://localhost:8000/${existing_profile.image_path}`}
        alt="img"
      />

      <div className="form-control">
        <label className="label">
          <span className="label-text">Choose Profile Picture :</span>
        </label>
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          onChange={handleImageChange}
          required
        />
        {imagePreview && (
          <div>
            <div className="w-40 h-40 mt-2 lg:w-60 lg:h-60">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <button
                className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-m font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 text-center"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageProfileUploader;
