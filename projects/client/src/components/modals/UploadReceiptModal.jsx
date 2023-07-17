import React, { useEffect, useState } from "react";
import { uploadPaymentOrder } from "../../features/orders/orderSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function UploadReceiptModal({ closeModal, orderId, orders }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState("");
  const [remitter, setRemitter] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedOrder = orders.find((order) => order.id_order === orderId);

    if (selectedOrder) {
      setImage(selectedOrder.payment_proof);
    }
  }, [orderId, orders]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("remitter", remitter);
      formData.append("bank_name", bankName);
      formData.append("account_number", accountNumber);

      try {
        const responseData = await dispatch(
          uploadPaymentOrder(orderId, formData)
        );
        if (responseData && responseData.success === true) {
          closeModal();
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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
              <span className="label-text">Remitter:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={remitter}
              onChange={(e) => setRemitter(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bank Name:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Account Number:</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
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
                  className="w-auto h-full"
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
