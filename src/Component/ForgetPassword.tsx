import React from "react";
import { useState, useCallback } from "react";
import axios from "axios";
const ForgetPassword = () => {
    const [email, setemail] = useState("");
    const handleSubmit = useCallback(
        (e: any) => {
            const response = {
                email: email,
            };
            axios
                .post(
                    `${process.env.REACT_APP_API}/management/send-reset-password-email`,
                    response
                )
                .then((res) => {
                    console.log("res", res);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(response);
            e.preventDefault();
        },
        [email]
    );
    return (
        <>
         <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-neutral-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-neutral-700 uppercase">
            Forgot Password
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
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600">
                Send
              </button>
            </div>
          </form>

         
        </div>
      </div>
            
        </>
    );
};

export default ForgetPassword;
