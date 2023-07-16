import React from "react";

function EmptyTableData() {
  return (
    <>
      <tr className="bg-base-100">
        <td colSpan="8" className="text-center">
          No data available.
        </td>
      </tr>
    </>
  );
}

export default EmptyTableData;
