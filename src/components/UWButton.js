import React from "react";
import { Button } from "react-bootstrap";

import "../styles/components.scss";

function UWButton(props) {
  const { label, variant, onClick, justifyContent } = props;

  return (
    <div style={{ display: "flex", justifyContent: justifyContent }}>
      <style type="text/css">
        {`
          .btn-contained {
            background-color: #c5050c;
            color: white;
          }
          .btn-contained:hover {
            color: white;
          }
          .btn-clean {
            background: none;
            color: #c5050c;
            padding: 0;
          }
          .btn-clean:hover {
            background: none;
            color: #c5050c;
          }
        `}
      </style>
      <Button
        variant={variant ? variant : "contained"}
        className="uwButton"
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  );
}

export default UWButton;
