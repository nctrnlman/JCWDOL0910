import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageRange = 2; // Number of page buttons to display

  const renderPageButtons = () => {
    const pageButtons = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
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
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
      let endPage = Math.min(startPage + pageRange - 1, totalPages);

      startPage = Math.max(1, endPage - pageRange + 1);

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

      if (endPage < totalPages - 1) {
        pageButtons.push(
          <button
            key="ellipsis"
            className="join-item btn btn-disabled btn-sm"
            disabled
          >
            ...
          </button>
        );

        pageButtons.push(
          <button
            key={totalPages - 1}
            className={`join-item btn ${
              totalPages - 1 === currentPage ? "btn-primary" : "btn-outline"
            } btn-sm`}
            onClick={() => handlePageChange(totalPages - 1)}
          >
            {totalPages - 1}
          </button>
        );
      }

      if (currentPage !== totalPages) {
        pageButtons.push(
          <button
            key={totalPages}
            className={`join-item btn ${
              totalPages === currentPage ? "btn-primary" : "btn-outline"
            } btn-sm`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="join flex justify-center items-center p-2 mb-3">
      <button
        className="join-item btn btn-primary btn-outline btn-sm"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        «
      </button>
      <button
        className="join-item btn btn-primary btn-outline btn-sm"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      {renderPageButtons()}
      <button
        className="join-item btn btn-primary btn-outline btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
      <button
        className="join-item btn btn-primary btn-outline btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
