import React from "react";
import { useSelector } from "react-redux";

function StocksTableBody({ stockProducts, currentPage }) {
  const itemsPerPage = useSelector((state) => state.stockProducts.itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <tbody>
      {stockProducts.map((stock, index) => (
        <tr key={stock.id_stock}>
          <td>{startIndex + index + 1}</td>
          <td>{stock.product_name}</td>
          <td>{stock.warehouse_name}</td>
          <td>{stock.total_stock}</td>
          <td>Actions</td>
        </tr>
      ))}
    </tbody>
  );
}

export default StocksTableBody;
