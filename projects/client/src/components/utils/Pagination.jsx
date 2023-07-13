import React from "react";
import {
  FiChevronsRight,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { GrPrevious, GrNext } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageRange = 3; // Number of page buttons to display

  const renderPageButtons = () => {
    const pageButtons = [];

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(startPage + pageRange - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`join-item btn ${
            i === currentPage ? "btn-primary" : "btn-outline"
          } btn-sm`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="join flex justify-center items-center p-2 mb-3">
      <button
        className="join-item btn btn-outline btn-sm"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        <FiChevronsLeft />
      </button>
      <button
        className="join-item btn btn-outline btn-sm"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FiChevronLeft />
      </button>
      {renderPageButtons()}
      <button
        className="join-item btn btn-outline btn-sm"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <FiChevronRight />
      </button>
      <button
        className="join-item btn btn-outline btn-sm"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => handlePageChange(totalPages)}
      >
        <FiChevronsRight />
      </button>
    </div>
  );
};

export default Pagination;
