import React, { useState } from "react";

function Tooltip({ children, text, ...rest }) {
  const [show, setShow] = useState(false);

  return (
    <div className="tooltip-container">
      <div className={"tooltip-box visible"}>{text}</div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}

export default Tooltip;
