import { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange } : {currentPage:number, totalPages:number, onPageChange : (newPage: number) => void}) => {
  const [pageNumbersToShow] = useState(5); // Number of page numbers to display in pagination
  const [pageNumberRange, setPageNumberRange] = useState({
    start: 1,
    end: pageNumbersToShow,
  });

  // Calculate the page numbers to display in the pagination based on the current page and total pages
  const calculatePageNumbers = () => {
    if (totalPages <= pageNumbersToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfPageNumbersToShow = Math.floor(pageNumbersToShow / 2);
    let startPageNumber = currentPage - halfPageNumbersToShow;
    let endPageNumber = currentPage + halfPageNumbersToShow;

    if (startPageNumber < 1) {
      startPageNumber = 1;
      endPageNumber = pageNumbersToShow;
    } else if (endPageNumber > totalPages) {
      endPageNumber = totalPages;
      startPageNumber = totalPages - pageNumbersToShow + 1;
    }

    return Array.from({ length: endPageNumber - startPageNumber + 1 }, (_, i) => i + startPageNumber);
  };

  // Handle click on page number
  const handlePageNumberClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  // Handle click on "Previous" button
  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
    setPageNumberRange((prevState) => ({
      start: prevState.start - pageNumbersToShow,
      end: prevState.end - pageNumbersToShow,
    }));
  };

  // Handle click on "Next" button
  const handleNextClick = () => {
    onPageChange(currentPage + 1);
    setPageNumberRange((prevState) => ({
      start: prevState.start + pageNumbersToShow,
      end: prevState.end + pageNumbersToShow,
    }));
  };

  // Calculate the page numbers to display in the pagination
  const pageNumbers = calculatePageNumbers();

  return (
    <div className="flex justify-center items-center mt-8">
      <button
        className="border border-gray-300 rounded-md p-2 mr-4"
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`border border-gray-300 rounded-md p-2 mx-1 ${
            pageNumber === currentPage ? "bg-gray-200" : ""
          }`}
          onClick={() => handlePageNumberClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="border border-gray-300 rounded-md p-2 ml-4"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
