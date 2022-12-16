import React from "react";
import logo from "./../assets/images/atharva-brand-logo-dark.png";
import { useState, useCallback } from "react";
import axios from "axios";
import InputField from "../shared/Input";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-[450px]">
        <div className="text-center pb-6">
          <img className="mx-auto" src={logo} alt="Atharva System" />
        </div>
          <div className="card">
            <div className="card-header text-center">
              <h3 className="font-[600] text-[26px] text-black">
                Forgot Password
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e)}>
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
                <div className="mt-6">
                  <button className="w-full btn btn-primary">
                    Send
                  </button>
                </div>
              </form>
              <p className="m-0 text-center pt-3">Back to <a className="text-blue-600 hover:text-blue-700" href="/">Login?</a></p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
