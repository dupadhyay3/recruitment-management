import React, { useEffect } from "react";
import logo from "./../assets/images/atharva-brand-logo-dark.png";
import { useState, useCallback } from "react";
import { useDispatch } from 'react-redux'

import {useNavigate} from "react-router-dom";
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

    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="mx-auto w-full max-w-[450px]">

      <div className="text-center pb-6">
        <img className="mx-auto" src={logo} alt="Atharva System" />
      </div>
    
      <div className="card">
        <div className="card-header text-center">
            <h3 className="font-[600] text-[26px] text-black">Login</h3>
        </div>
        <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
            <InputField labelText={"Email"} inputType={"email"} inputName={"email"} inputValue={email} inputPlaceHolder={"Email"}
             onChange={setemail} id={"email"} />
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
            <InputField labelText={"Password"} inputType={"password"} inputName={"password"} inputValue={password} inputPlaceHolder={"Password"}
             onChange={setPassword} id={"Password"} />
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
              <button className="w-full btn btn-primary">
                Login
              </button>
              {/* {success?<div className="text-green-600/100">{success}</div>:null} */}
            </div>
          </form>
          <p className="m-0 text-center pt-6">
            <a
                href="/forget-password"
                className="text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </a>
          </p>
          <p className="m-0 text-center pt-3">Don't have an account yet? <a className="text-blue-600 hover:text-blue-700" href="/create-account">Sign up</a></p>
        </div>
      </div>

      </div>
    </div>
    </>
  );
};

export default Login;
