import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../Services/LocalStorageService";
import { ToastContainer, toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    removeToken("token");
    toast.success("Logout Success!")
    navigate("/");
  },[]);

  return <></>;
};

export default Logout;
