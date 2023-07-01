import React, { useState } from "react";

function UploadReceiptModal({ closeModal }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = (e) => {
    // Handle receipt image upload logic here
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="modal" id="upload_receipt_modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Upload Receipt</h3>
        <form onSubmit={handleUpload}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Receipt Image:</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleImageChange}
              required
            />
            {selectedImage && (
              <div className="w-40 h-40 mt-2 lg:w-60 lg:h-60">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadReceiptModal;
