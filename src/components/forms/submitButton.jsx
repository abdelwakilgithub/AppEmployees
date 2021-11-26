import React from "react";
import { useFormikContext } from "formik";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
      {title}
    </button>
  );
}

export default SubmitButton;
