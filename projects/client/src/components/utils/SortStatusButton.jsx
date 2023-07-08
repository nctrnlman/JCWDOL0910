import React from "react";

function SortStatusButton({ selectedStatus, setSelectedStatus }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row space-x-2 pt-2">
      <label className="sm:flex sm:justify-center sm:items-center">
        Status Pesanan :
      </label>
      <select
        className="select select-bordered"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="">Default</option>
        <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
        <option value="Menunggu Konfirmasi Pembayaran">
          Menunggu Konfirmasi Pembayaran
        </option>
        <option value="Diproses">Diproses</option>
        <option value="Dikirim">Dikirim</option>
        <option value="Pesanan Dikonfirmasi">Pesanan Dikonfirmasi</option>
        <option value="Dibatalkan">Dibatalkan</option>
      </select>
    </div>
  );
}

export default SortStatusButton;
