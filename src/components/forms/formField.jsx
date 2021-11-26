import React from "react";
import { useFormikContext } from "formik";

function AppFormField({ name, label, type, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();

  const CapitalizeFirstLetterOfEachWord = (label) => {
    const arr = label.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  };

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {CapitalizeFirstLetterOfEachWord(label)}
        </label>
      )}

      <input
        name={name}
        type={type}
        className="form-control"
        onChange={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        {...otherProps}
      />
      {touched[name] && errors[name] && (
        <div className="alert alert-danger">{errors[name]}</div>
      )}
    </div>
  );
}

export default AppFormField;
