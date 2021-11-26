import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/js/src/collapse.js";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Prototype
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/employees">
              Employees
            </Link>
            <Link className="nav-item nav-link" to="/department">
              Department
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
