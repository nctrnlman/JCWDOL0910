import React from "react";

function QuantityControl({
  quantity,
  handleDecrease,
  handleIncrease,
  handleQuantityChange,
}) {
  const isDeleteEnabled = quantity <= 1;

  return (
    <div className="flex items-center gap-2">
      {isDeleteEnabled ? (
        <a
          href="#delete_modal"
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={handleDecrease}
        >
          -
        </a>
      ) : (
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={handleDecrease}
        >
          -
        </button>
      )}
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={handleQuantityChange}
        readOnly
        className="w-1/3 text-center border-none"
      />
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
