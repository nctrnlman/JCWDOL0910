import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="join flex justify-center items-center p-2 mb-3">
      <button
        className="join-item btn btn-primary btn-outline w-1/3"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        «
      </button>
      <button className="join-item btn w-1/3">{currentPage}</button>
      <button
        className="join-item btn btn-primary btn-outline w-1/3"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
