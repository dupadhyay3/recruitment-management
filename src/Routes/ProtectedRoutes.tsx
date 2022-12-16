import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "../Services/LocalStorageService";
import Changepassword from "../Component/Changepassword";
import CandidateTable from "../Component/CandidateTable";
import CandidateAll from "../Component/CandidateDetails";
import QuestionTable from "../Component/QuestionTable";
import QuestionDetail from "../Component/QuestionDetails";
import Login from "../Component/Login";
import ForgetPassword from "../Component/ForgetPassword";
import ResetPassword from "../Component/ResetPassword";
import CreateAccount from "../Component/CreateAccount";
import Logout from "../Component/Logout";
import { useSelector, useDispatch } from 'react-redux'
import CandidateResult from "../Component/CandidateResult";
import Sidebar from "../Component/Sidebar";
const AdminRoutes = () => {
       const usertoken = useSelector((state:any) => state.counter.value)
  const [tokens, settoken] = useState<any>(getToken());
  const token=usertoken||tokens
  console.log("token", token);

  return (
    <>
    <Sidebar/>
    <div className='app-main'>
    
      <Routes>
      <Route path="/" element={!token?<Login />:<Navigate to="/candidate-table" />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        <Route
          path="/change-password"
          element={token ? <Changepassword /> : <Navigate to="/" />}
        />
        <Route
          path="/candidate-table"
          element={token ? <CandidateTable /> : <Navigate to="/" />}
        />
        <Route
          path="/candidateall-table/:id"
          element={token ? <CandidateAll /> : <Navigate to="/" />}
        />
        <Route
          path="/question-table"
          element={token ? <QuestionTable /> : <Navigate to="/" />}
        />
        <Route
          path="/question-detail/:id"
          element={token ? <QuestionDetail /> : <Navigate to="/" />}
        />
        <Route
          path="/candidate-result/:id"
          element={token ? <CandidateResult /> : <Navigate to="/" />}
        />
      </Routes>
      </div>
    </>
  );
};

export default AdminRoutes;
