import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  Form,
  FormField,
  SubmitButton,
  FormPicker as Picker,
} from "../components/forms";
import departmentsApi from "../api/departments";
import { useParams } from "react-router-dom";
import employeesApi from "../api/employees";

const phoneRegExp = /^[0-9 *#+-]+$/;
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().min(2).label("first name"),
  last_name: Yup.string().required().min(1).label("last name"),
  email: Yup.string().required().email().label("email"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required()
    .label("phone"),
  birth_date: Yup.date().required().label("date of birth"),
  department: Yup.string().required().label("department"),
});

function EmployeeForm() {
  const [employee, setEmployee] = useState({});
  const [departments, setDepartments] = useState([]);
  const [managersPossible, setManagersPossible] = useState([]);
  let params = useParams();

  const getDepartmentsApi = async () => {
    const response = await departmentsApi.getDepartments();
    setDepartments(response.data);
  };

  const getEmployee = async (id) => {
    const response = await employeesApi.getEmployeeById(id);
    setEmployee(response.data);
  };

  const getPossibleManagers = async (id) => {
    const response = await employeesApi.getPossibleManagersDefault(id);
    setManagersPossible(response);
  };

  useEffect(() => {
    getDepartmentsApi();
    getPossibleManagers(params.id);
    params.id !== "new" && getEmployee(params.id);
  }, []);

  const handleSubmit = async (employee) => {
    const result = await employeesApi.addEmployee(params.id, employee);
    if (!result.ok) {
      return alert("Could not save the employee");
    }
    return alert("succes");
    // resetForm();
  };

  const format_date = (d) => {
    let date = new Date(d);
    return [
      date.getFullYear(),
      ("0" + (date.getMonth() + 1)).slice(-2),
      ("0" + date.getDate()).slice(-2),
    ].join("-");
  };

  const first_name = employee.first_name ? employee.first_name : "";
  const last_name = employee.last_name ? employee.last_name : "";
  const email = employee.email ? employee.email : "";
  const phone = employee.phone ? employee.phone : "";
  const birth_date = employee.birth_date
    ? format_date(employee.birth_date)
    : "";

  let initialValues = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    birth_date: birth_date,
  };

  return (
    <div className="container">
      <h1>Employee Form </h1>
      {departments && (
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          <FormField
            maxLength={255}
            label="first name"
            name="first_name"
            type="text"
          />
          <FormField
            maxLength={255}
            label="last name"
            name="last_name"
            type="text"
          />
          <FormField
            maxLength={255}
            label="email"
            name="email"
            type="email"
            placeholder="abc@domain.domain"
          />
          <FormField maxLength={255} label="phone" name="phone" type="text" />
          <FormField label="date of birth" name="birth_date" type="date" />
          <Picker
            options={departments}
            name="department"
            label="department"
            placeholder="department"
          />
          <Picker
            options={managersPossible}
            name="parent_employee.id"
            label="manager"
            placeholder="manager"
          />

          <SubmitButton title="Save" />
        </Form>
      )}
    </div>
  );
}

export default EmployeeForm;
