import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Component/header";
import AdminRoutes from "./Routes/ProtectedRoutes";

function App() {
  return (
    <>
      <ToastContainer />

      <div className="body-bg">
        <div className="bg-full"></div>
        <div className="bg-ef bg-1"></div>
        <div className="bg-ef bg-2"></div>
        <div className="bg-ef bg-3"></div>
        <div className="bg-ef bg-4"></div>
      </div>

      <div className="app-root">
        <BrowserRouter>
          <Header /> 
          <main className="app-wrapper">
            <AdminRoutes/>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
