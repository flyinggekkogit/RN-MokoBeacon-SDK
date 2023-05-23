import React from "react";
import "react-toastify/dist/ReactToastify.css";

export const PrimaryButton = ({ text, onClick }) => {
  return (
    <button
      className="btn btn-primary mt-3"
      type="button"
      style={{ width: "100%", marginRight: "5px" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const OutlinedButton = ({ text, onClick }) => {
  return (
    <button
      className="btn mt-3"
      type="button"
      style={{
        width: "100%",
        marginLeft: "5px",
        borderWidth: 1,
        borderColor: "#ccc",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const DangerButton = ({ text, onClick }) => {
  return (
    <button
      className="btn btn-danger mt-3"
      type="button"
      style={{
        width: "100%",
        marginLeft: "5px",
        borderWidth: 1,
        borderColor: "#ccc",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
