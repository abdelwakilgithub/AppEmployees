import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageSize,
}) => {
  const pagesCount = pageSize != 0 ? Math.ceil(itemsCount / pageSize) : 1;

  const pages = _.range(1, pagesCount + 1);

  const handleInput = (v) => {
    v < 100 && v !== 0 && onPageSize(v.replace(/[^0-9]/g, ""));
  };

  return (
    <nav className="pagination">
      <div className="page-item">
        <input
          className="inputPageSize"
          type="number"
          min="2"
          max="100"
          value={pageSize}
          onInput={(e) => handleInput(e.target.value)}
        />
      </div>

      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <div className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSize: PropTypes.func.isRequired,
};

export default Pagination;
