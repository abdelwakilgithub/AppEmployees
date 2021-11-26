import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Table from "./common/table";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";

function EmployeesTable({ employees, onSort, sortColumn, onDelete }) {
  const columns = [
    {
      path: "name",
      label: "Name",
      content: (employee) => (
        <Link
          data-tip="update"
          data-background-color="rgb(33 37 41 / 79%);"
          data-place="bottom"
          to={`/employees/${employee.id}`}
        >
          <ReactTooltip />
          {[employee.first_name, employee.last_name].join(" ")}
        </Link>
      ),
    },
    { path: "email", label: "Email" },
    { path: "phone", label: "Phone" },
    {
      path: "Manager",
      label: "Manager",
      content: (employee) => {
        const parent = employee.parent_employee;
        if (parent) return [parent.first_name, parent.last_name].join(" ");
      },
    },

    {
      path: "birth_date",
      label: "date of birth",
      content: (employee) => {
        if (!employee.birth_date) return null;
        let d = new Date(employee.birth_date);
        return [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/");
      },
    },
    { path: "department.name", label: "Department" },

    {
      key: "delete",
      content: (employee) => (
        <div>
          <div
            onClick={() => {
              onDelete(employee.id);
            }}
            className="remove"
            data-tip="delete"
            data-background-color="rgb(33 37 41 / 39%);"
            data-place="bottom"
          >
            <FaRegTrashAlt />
          </div>
          <ReactTooltip />
        </div>
      ),
    },
  ];

  return (
    <div className="list-table-container">
      <Table
        columns={columns}
        data={employees}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </div>
  );
}

export default EmployeesTable;
