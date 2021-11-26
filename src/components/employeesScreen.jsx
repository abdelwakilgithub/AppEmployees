import React, { useEffect, useState } from "react";
import EmployeesTable from "./employeesTable";
import { FaClone, FaPlus, FaRegTrashAlt, FaSync } from "react-icons/fa";
import _ from "lodash";
import employeesApi from "../api/employees";
import SearchBox from "./searchBox";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import ActivityIndicator from "./ActivityIndicator";
import { toast } from "react-toastify";
import PopupDelete from "./common/popupDelete";

const title = "employees list";
const style1 = "btn me-3 mb-3  px-3  ";

function EmployeesScreen(props) {
  const [sortColumn, setSortColumn] = useState({
    path: "first_name",
    order: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [popup, setPopup] = useState({ show: false, id: null });

  const {
    data: employees,
    setData: setEmployees,
    error,
    loading,
    request: getEmployeesApi,
  } = useApi(employeesApi.getEmployees);

  useEffect(() => {
    getEmployeesApi();
  }, []);

  const popupHandleDelete = (id) => {
    document.querySelector("body").style.overflowY = "hidden";
    setPopup({ show: true, id });
  };

  const handleDeleteFalse = () => {
    document.querySelector("body").style.overflowY = "auto";
    setPopup({ show: false, id: null });
  };

  const handleDeleteTrue = () => {
    document.querySelector("body").style.overflowY = "auto";
    if (popup.show && popup.id) {
      handleDelete(popup.id);
      setPopup({ show: false, id: null });
    }
  };

  const handleDelete = async (employeeId) => {
    const originalEmployees = employees;
    setEmployees(employees.filter((m) => m.id !== employeeId));
    try {
      await employeesApi.deleteEmployee(employeeId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      setEmployees(originalEmployees);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = employees;
    if (searchQuery)
      filtered = employees.filter((m) =>
        m.first_name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: data };
  };

  const { totalCount, data } = getPagedData();

  return (
    <>
      <ActivityIndicator visible={loading} />
      {error && (
        <>
          <div>Couldn't retrieve the Employees.</div>
          <button
            className={style1 + "btn-outline-secondary"}
            onClick={getEmployeesApi}
          >
            Retry
          </button>
        </>
      )}
      {popup.show && (
        <PopupDelete
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
      {!loading && !error && (
        <div className=" container shadow-sm p-3 ">
          <div className="mb-4">
            <h3 className="display-5">{title}</h3>
          </div>

          <div>
            <Link
              to="/employees/new"
              key="new"
              className={style1 + "btn-outline-primary"}
            >
              <FaPlus className="iconstyle" size="16px" />
              Add
            </Link>
            <button
              className={style1 + "btn-outline-secondary"}
              onClick={getEmployeesApi}
            >
              <FaSync className="iconstyle" size="16px" />
              Refresh
            </button>
            <button className={style1 + "btn-outline-danger"}>
              <FaRegTrashAlt className="iconstyle" size="16px" />
              Delete
            </button>
            <button className={style1 + "btn-outline-info"}>
              <FaClone className="iconstyle" size="16px" />
              Clone
            </button>
          </div>

          <p>Showing {totalCount} employees in the database.</p>
          <SearchBox value={searchQuery} onChange={handleSearch} />
          <EmployeesTable
            sortColumn={sortColumn}
            employees={data}
            onDelete={popupHandleDelete}
            onSort={(sortColumn) => setSortColumn(sortColumn)}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSize={(e) => setPageSize(e)}
          />
        </div>
      )}
    </>
  );
}

export default EmployeesScreen;
