import React from 'react';
import { BrowserRouter} from "react-router-dom";
import Header from './Component/header';
import AdminRoutes from './Routes/ProtectedRoutes';
function App() {
  
  return (
    <>
    <Header />
     <BrowserRouter>
     <AdminRoutes/>
    </BrowserRouter>
    </>
  );
}
export default App;
