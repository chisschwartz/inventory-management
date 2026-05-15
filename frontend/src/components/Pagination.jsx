import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ itemsPerPage, totalItems, setCurrentPage, currentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const pageinate = (pageNumber, e) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };


  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={(e) => paginate(number, e)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;