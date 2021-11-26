import React from "react";

function TableHeader({ columns, onSort, sortColumn }) {
  const raiseSort = (path) => {
    let newSorted = {};
    if (sortColumn.path === path) {
      newSorted.path = sortColumn.path;
      newSorted.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSorted.path = path;
      newSorted.order = "asc";
    }
    onSort(newSorted);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
