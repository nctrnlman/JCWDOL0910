import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageRange = 2; // Number of page buttons to display

  const renderPageButtons = () => {
    const pageButtons = [];

    // Calculate the start page and end page based on the total pages
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(startPage + pageRange - 1, totalPages);

    // Adjust the start page if the end page is less than the desired range
    startPage = Math.max(1, endPage - pageRange + 1);

    // Generate page buttons
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

    // Add ellipsis button if there are more pages beyond the page range
    if (endPage < totalPages) {
      pageButtons.push(
        <button
          key="ellipsis"
          className="join-item btn btn-disabled btn-sm"
          disabled
        >
          ...
        </button>
      );

      // Add the last page button
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
