import React from "react";
import { useState, useCallback } from "react";
import axios from "axios";
// management/admin/login
const Login = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [check, setcheck] = useState(false);
  
    const handleSubmit = useCallback((e: any) => {
        
        const response = {
            email:email,
            password:password
        }
        
        
axios.post(`http://localhost:5000/management/admin/login`, response).then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log(err);
    
  });
console.log(email);


        console.log(response);
        e.preventDefault();
    }, [email, password]);
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="bg-gray-400	">
                    <div className="bg-red-400	">
                        <h1>Welcome back</h1>
                        <input
                            type="email"
                            className=""
                            placeholder="email"
                            onChange={(e) => { setemail(e.target.value) }}
                        >
                        </input>
                        <input
                            type="password"
                            className=""
                            placeholder="Password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        >
                        </input>
                        <br />
                        <input type="checkbox"
                            onChange={(e) => { setcheck(e.target.checked) }}

                        >

                        </input>
                        <label>remember me</label>
                        <br />
                        <button type="submit"
                            className=""

                        >
                            Login
                        </button>
                        <br />
                        <a href="http://localhost:3001/ForgetPassword">
                            Forgot Password
                        </a>
                        <br />
                        <a href="http://localhost:3000/CreateAccount">
                            Create an Account?
                        </a>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Login;
