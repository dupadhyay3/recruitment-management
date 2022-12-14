import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from './Component/header';
import AdminRoutes from './Routes/ProtectedRoutes';
function App() {
  
  return (
    <>
    <ToastContainer />
    
     <BrowserRouter>
     <Header />
     <AdminRoutes/>
    </BrowserRouter>
    </>
  );
}
export default App;
