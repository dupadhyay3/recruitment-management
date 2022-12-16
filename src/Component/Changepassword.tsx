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
      e.preventDefault();
    },
    [password, password_confirmation]
  );

  return (
    <>  
      <div className="card">
        <div className="card-header">
          <h3 className="font-[600] text-[26px] text-black">Change Password</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <form onSubmit={(e) => confirmReset(e)}>
                <div className="mb-2">
                  <label
                    htmlFor="Password"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="Password"
                    placeholder="Password"
                    className="form-control"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="confirm_password"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="confirm_password"
                    className="form-control"
                    onChange={(e) => {
                      setConfirm_password(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-6">
                  <button className="w-full btn btn-primary">
                    RESET
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Changepassword;
