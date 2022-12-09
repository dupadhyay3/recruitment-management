import React, { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Component/Login';
import ForgetPassword from './Component/ForgetPassword';
import CreateAccount from './Component/CreateAccount';
import ResetPassword from './Component/ResetPassword';
import CandidateTable from './Component/CandidateTable';
import Dashboard from './Component/Dashboard';
import Changepassword from './Component/Changepassword';
import Logout from './Component/Logout';
import CandidateAll from './Component/CandidateDetails';
import Header from './Component/header';
import QuestionTable from './Component/QuestionTable';
import QuestionDetail from './Component/QuestionDetails';
import { getToken } from './Services/LocalStorageService';
import { Navigate } from 'react-router-dom';
function App() {
  const [token, settoken] = useState<any>("")
  useEffect(() => {
settoken(getToken())
  
  }, [token])
  
  // let token = 
  console.log("token",token);
  // const navigate= useNavigate()

  return (
    <>
    <Header />
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/forget-password" element={<ForgetPassword/>} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword/>} />
          <Route path="/create-account" element={<CreateAccount/>} />
          <Route path="/logout" element={<Logout/>} />
          {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
          <Route path="/change-password" element={token?<Changepassword/>:<Navigate to="/" />} />
          <Route path="/candidate-table" element={token?<CandidateTable/>:<Navigate to="/" />} />
          <Route path="/candidateall-table/:id" element={token?<CandidateAll/>:<Navigate to="/" />} />
          <Route path="/question-table" element={token?<QuestionTable/>:<Navigate to="/" />} />
          <Route path="/question-detail/:id" element={token?<QuestionDetail/>:<Navigate to="/" />} />
          {/* <Route path="/*" element={ <h1>404 page not found</h1>}/>  */}
          {/* <Route path="/*" element={<Navigate to="/" />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
