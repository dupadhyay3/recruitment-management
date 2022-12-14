import React from "react";
import { getToken } from "../Services/LocalStorageService";
import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
const Changepassword = () => {
  const navigate=useNavigate()
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirm_password] = useState("");
  const confirmReset = (e:any) => {
e.preventDefault()
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: (e) => {handleSubmit(e)}
        },
        {
          label: 'No',
          onClick: () => false
        }
      ]
    });
  };

  const handleSubmit = useCallback(
    (e: any) => {
      const response = {
        password: password,
        password_confirmation: password_confirmation,
      };
      let token = getToken();

      axios
        .post(
          `${process.env.REACT_APP_API}/management/admin/change`,
          {
            body: response,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            toast.success("Password change Success!");
            navigate('/candidate-table')
          }
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(response);
    },
    [password, password_confirmation]
  );

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-neutral-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-neutral-700 uppercase">
            Change Password
          </h1>
          <form onSubmit={(e) => confirmReset(e)} className="mt-6">
            <div className="mb-2">
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
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="confirm_password"
                className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => {
                  setConfirm_password(e.target.value);
                }}
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600">
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Changepassword;
