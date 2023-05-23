import React from "react";
import TrashIcon from "../assets/images/icons/trash.svg";

export const FilePicker = ({ file, onChange, onDelete }) => (
  <div className="form-group mt-3">
    <label>File</label>
    <div className="d-flex flex-row">
      <input
        type="text"
        className="form-control"
        placeholder="No file selected"
        maxLength={20}
        value={file?.name}
        style={{ textOverflow: "ellipsis", overflow: "hidden" }}
        disabled
      />
      {file != null ? (
        <>
          <button
            type="button"
            onClick={onDelete}
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              right: "0px",
              border: "none",
              color: "red",
              width: "50px",
              marginRight: "20px",
              marginTop: "4px",
            }}
          >
            <img alt="" src={TrashIcon} style={{ height: "20px" }} />
          </button>
        </>
      ) : (
        <input
          type="file"
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            border: "none",
            color: "red",
            right: "25px",
            marginTop: "4px",
            width: "100px",
          }}
          onChange={onChange}
        ></input>
      )}
    </div>
  </div>
);
