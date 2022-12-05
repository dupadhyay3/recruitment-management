import React from "react";
import { useState, useCallback } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import axios from "axios";
import {storeToken} from '../Services/LocalStorageService'
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = useCallback(
    (e: any) => {
      const response = {
        email: email,
        password: password,
      };
      axios
        .post(`http://localhost:5000/management/admin/login`, response)
        .then((res) => {
          if(res.data.status){
            storeToken(res.data.token)
            console.log(res.data.token);
            alert('Login successfully');
            navigate('/management/candidate/table')
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(email);

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
            <div className="mb-2">
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
            </div>
            <div className="mb-2">
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
            </div>
           
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600">
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-5">
            <div className="text-sm">
              <a
                href="http://localhost:3000/management/create/account"
                className="font-medium text-neutral-600 hover:underline"
              >
                Create an Account?
              </a>
            </div>
            <div className="text-sm">
              <a
                href="http://localhost:3000/management/forget/password"
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
