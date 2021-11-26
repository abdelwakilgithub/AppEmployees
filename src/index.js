import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "font-awesome/css/font-awesome.css";
import "./css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeesScreen from "./components/employeesScreen";
import DepartmentsScreen from "./components/departmentsScreen";
import EmployeeForm from "./components/employeeForm";
import NotFound from "./components/notFound";
import "bootstrap/dist/css/bootstrap.css";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="employees" element={<EmployeesScreen />} />
          <Route path="department" element={<DepartmentsScreen />} />
          <Route path="/employees/:id" element={<EmployeeForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
