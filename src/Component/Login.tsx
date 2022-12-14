import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import InputField from "../shared/Input";
import axios from "axios";
import { getToken, storeToken } from "../Services/LocalStorageService";
import { user_token } from "../redux/features/counter/CounterSlice";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const token = getToken();
  useEffect(() => {
    if (token) {
      navigate("/candidate-table");
    }
  }, [token]);
  const showToastMessagelogin = () => {
    toast.success("Login Success!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e: any) => {
      const response = {
        email: email,
        password: password,
      };
      axios
        .post(`${process.env.REACT_APP_API}/management/admin/login`, response)
        .then((res) => {
          if (res.data.status !== "failed") {
            let token = res.data.token;
            storeToken(token);

            dispatch(user_token(getToken()));
            showToastMessagelogin();
            navigate("/candidate-table");
          } else {
            toast.success("Login Failed!")
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(response);
      e.preventDefault();
    },
    [email, password]
  );
  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-neutral-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-neutral-700 uppercase">
            Login
          </h1>
          <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
            <InputField
              labelText={"Email"}
              inputType={"email"}
              inputName={"email"}
              inputValue={email}
              inputPlaceHolder={"email"}
              onChange={setemail}
              id={"email"}
            />
            {/* <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div> */}
            <InputField
              labelText={"Password"}
              inputType={"password"}
              inputName={"password"}
              inputValue={password}
              inputPlaceHolder={"password"}
              onChange={setPassword}
              id={"Password"}
            />
            {/* <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div> */}

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600">
                Login
              </button>
              {/* {success?<div className="text-green-600/100">{success}</div>:null} */}
            </div>
          </form>

          <div className="flex items-center justify-between mt-5">
            <div className="text-sm">
              <a
                href="/create-account"
                className="font-medium text-neutral-600 hover:underline"
              >
                Create an Account?
              </a>
            </div>
            <div className="text-sm">
              <a
                href="/forget-password"
                className="font-medium text-neutral-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
