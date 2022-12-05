import React from 'react'
import { useCallback, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
// import { useSearchParams } from 'react-router-dom'
const ResetPassword = () => {
const [password, setPassword] = useState("")
const [password_confirmation, setConfirm_password] = useState("")
const {id, token}= useParams()
console.log("hgfgf",id, token);
const navigate=useNavigate()
  const handleSubmit = useCallback(
    (e: any) => {
      const response = {
        password: password,
        password_confirmation: password_confirmation,
      };
      axios
        .post(`http://localhost:5000/management/reset/password/${id}/${token}`,response)
        .then((res) => {
          if(res.data.status){
            alert('reset password successfully');
            navigate('/management/candidate/table')
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
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-neutral-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-neutral-700 uppercase">
            Reset Password
          </h1>
          <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
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
  )
}

export default ResetPassword