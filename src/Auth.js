/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// STARTS HERE
import * as AWS from "aws-sdk";
import { ConfigurationOptions } from "aws-sdk";
import Repository from "./Repository";

export default function (props) {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  return (
    <div className="Auth-form-container">
      <form
        className="Auth-form"
        onSubmit={(e) => {
          const login = e.target[0].value;
          const password = e.target[1].value;

          Repository.getInstance()
            .initialize(login, password)
            .then(() => {
              navigate("/dashboard");
            })
            .catch(() => {
              setError("Invalid login or password");
            });

          e.preventDefault();
        }}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login to dashboard</h3>
          <div className="form-group mt-3">
            <label>Login</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter login"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="********"
            />
          </div>
          {/*show error message if any*/}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
