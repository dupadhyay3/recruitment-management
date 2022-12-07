import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../Services/LocalStorageService";
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeToken("token");
    navigate("/");
  }, []);

  return <></>;
};

export default Logout;
