import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Component/Login';
import ForgetPassword from './Component/ForgetPassword';
import CreateAccount from './Component/CreateAccount';
import ResetPassword from './Component/ResetPassword';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
       
          <Route path="/login" element={<Login/>} />
          <Route path="/ForgetPassword" element={<ForgetPassword/>} />
          <Route path="/" element={<CreateAccount/>} />
          <Route path="/ResetPassword" element={<ResetPassword/>} />
          {/* <Route path="/*" element={ <h1>404 page not found</h1>}/>  */}
          {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
