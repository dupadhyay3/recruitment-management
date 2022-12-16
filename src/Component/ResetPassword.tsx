import React from "react";
import { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { storeToken } from "../Services/LocalStorageService";
import InputField from "../shared/Input";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirm_password] = useState("");

  const { id, token } = useParams();
  console.log("hgfgf", id, token);
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e: any) => {
      const response = {
        password: password,
        password_confirmation: password_confirmation,
      };
      axios
        .post(
          `${process.env.REACT_APP_API}/management/reset/password/${id}/${token}`,
          response
        )
        .then((res) => {
          if (res.data.status) {
            storeToken(`${token}`);
            alert("reset password successfully");
            navigate("/management/candidate/table");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(response);
      e.preventDefault();
    },
    [password, password_confirmation]
  );

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-[450px]">
          <div className="card">
            <div className="card-header text-center">
              <h3 className="font-[600] text-[26px] text-black">
                Reset Password
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <InputField
                  labelText={"Password"}
                  inputType={"Password"}
                  inputName={"Password"}
                  inputValue={password}
                  inputPlaceHolder={"Password"}
                  onChange={setPassword}
                  id={"Password"}
                />
                {/* <div className="mb-2">
                <label
                  htmlFor="Password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="Password"
                  placeholder="Password"
                  className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div> */}
                <InputField
                  labelText={"Confirm Password"}
                  inputType={"Password"}
                  inputName={"confirm_password"}
                  inputValue={password}
                  inputPlaceHolder={"confirm_password"}
                  onChange={setConfirm_password}
                  id={"confirm_password"}
                />
                {/* <div className="mb-2">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-semibold text-gray-800"
                >
                Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="confirm_password"
                  className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => {
                    setConfirm_password(e.target.value);
                  }}
                />
              </div> */}

                <div className="mt-6">
                  <button className="w-full btn btn-primary">RESET</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
