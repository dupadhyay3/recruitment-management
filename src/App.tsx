import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Component/Login';
import ForgetPassword from './Component/ForgetPassword';
import CreateAccount from './Component/CreateAccount';
import ResetPassword from './Component/ResetPassword';
import CandidateTable from './Component/CandidateTable';
function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="management/forget/password" element={<ForgetPassword/>} />
          <Route path="management/create/account" element={<CreateAccount/>} />
          <Route path="management/reset/password/:id/:token" element={<ResetPassword/>} />
          <Route path="management/candidate/table" element={<CandidateTable/>} />
          {/* <Route path="/*" element={ <h1>404 page not found</h1>}/>  */}
          {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
