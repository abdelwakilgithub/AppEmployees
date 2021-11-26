import React from "react";
import { useFormikContext } from "formik";

const AppFormPicker = ({ name, label, options, ...rest }) => {
  const { errors, handleChange, handleBlur, setFieldValue, touched, values } =
    useFormikContext();
  const collect = (s1, s2) => {
    return [s1, s2].join(" ");
  };
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        {...rest}
        className="form-control"
      >
        <option value="" />
        {options.map((option) =>
          option.name ? (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ) : (
            <option key={option.id} value={option.id}>
              {collect(option.first_name, option.last_name)}
            </option>
          )
        )}
      </select>
      {touched[name] && errors[name] && (
        <div className="alert alert-danger">{errors[name]}</div>
      )}
    </div>
  );
};

export default AppFormPicker;
