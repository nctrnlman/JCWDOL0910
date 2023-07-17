import React from "react";

const ShippingMethodSelect = ({
  shippingMethod,
  shippingOptions,
  handleShippingMethodChange,
  shipping,
  handleShippingChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="flex mr-20 gap-2 items-center">
        <h1 className="lg:text-lg text-sm">Courier: </h1>
        <select
          className="select select-bordered w-[320px]  lg:w-full  text-[11px] lg:text-sm "
          value={shippingMethod}
          onChange={handleShippingMethodChange}
        >
          <option value="">None</option>
          <option value="JNE">JNE</option>
          <option value="POS">POS</option>
          <option value="TIKI">TIKI</option>
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <h1 className="lg:text-lg text-sm">Service: </h1>
        <select
          className="select select-bordered w-[320px] lg:w-[400px] text-[11px] lg:text-sm "
          value={shipping}
          onChange={handleShippingChange}
          disabled={shippingMethod === ""}
        >
          <option value="">None</option>
          {shippingOptions.map((option) => (
            <option key={option.service} value={option.cost[0].value}>
              {option.service} - Price: {option.cost[0].value} - Estimated Time:{" "}
              {option.cost[0].etd}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShippingMethodSelect;
