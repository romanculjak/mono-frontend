import { useCallback, useEffect, useState } from "react";



export const usePagination = () => {


  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const setData = (totalPages: number, totalItems: number) => {
    
    setTotalPages(totalPages);
    setTotalItems(totalItems);
  }

  const handlePrevPage = () => {
    if(currentPage === 1) return 1;
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if(currentPage === totalPages) return currentPage;
    setCurrentPage((prevPage) => prevPage + 1);
  };


  const resetPages = () => {
    setCurrentPage(1);
  }

  return { items, totalPages, currentPage, totalItems,pageLimit,setData, handlePrevPage, handleNextPage, resetPages, setPageLimit };

}