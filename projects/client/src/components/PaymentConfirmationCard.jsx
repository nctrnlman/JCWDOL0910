import React from "react";
import UploadReceiptButton from "./Buttons/UploadReceiptButton";

const PaymentConfirmationCard = ({
  order,
  formattedPrice,
  isChecked,
  handleCheckboxChange,
  openUploadModal,
}) => {
  return (
    <div key={order.id_order}>
      <div className="card w-full lg:w-[500px] bg-base-100 lg:shadow-xl rounded-none lg:rounded-lg">
        <div className="card-body">
          <div>
            <h1 className="card-title text-md lg:text-lg">
              Payment for invoice #{order.id_order}
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://www.bca.co.id/-/media/Feature/Card/List-Card/Tentang-BCA/Brand-Assets/Logo-BCA/Logo-BCA_Biru.png"
              alt=""
              className="h-1/2 w-1/2"
            />
          </div>
          <div className="grid lg:grid-cols-3 text-center gap-2">
            <div className="mb-3 text-sm lg:text-md">
              <label>Account Number</label>
              <h4 className="font-semibold">7380537294</h4>
            </div>
            <div className="mb-3 text-sm lg:text-md">
              <label>Account Name</label>
              <h4 className="font-semibold">A/N Baskara Restu Wirawan</h4>
            </div>
            <div className="mb-3 text-sm lg:text-md">
              <label>Total Price</label>
              <h4 className="font-semibold">{formattedPrice}</h4>
            </div>
          </div>
          <div className="col-6 preview-order-right">
            <div className="row px-4">
              <h4 className="card-title text-md lg:text-lg">
                Checkout Agreement
              </h4>
              <ul className="text-sm lg:text-md">
                <li>
                  <div className="mt-2">
                    Silahkan melakukan pembayaran ke rekening BANK BCA atas nama
                    Baskara Restu Wirawan 738 053 7294
                  </div>
                </li>
                <li>
                  <div className="mt-2">
                    Harap lakukan konfirmasi dengan mengirimkan bukti transfer
                    pada halaman transaksi
                  </div>
                </li>
                <li>
                  <div className="mt-2">
                    Apabila dalam jangka waktu 1 X 24 jam tidak melakukan proses
                    transaksi maka pesanan akan kami batalkan.
                  </div>
                </li>
              </ul>
              <div className="form-control">
                <label className="label cursor-pointer flex justify-end gap-5">
                  <span className="label-text text-sm lg:text-md font-semibold">
                    I agree
                  </span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    className="checkbox"
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <UploadReceiptButton
            disabled={!isChecked}
            onClick={openUploadModal}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationCard;
