import React from "react";
import { useState, useCallback } from "react";
import axios from "axios";
const ForgetPassword = () => {
    const [email, setemail] = useState("");
    const handleSubmit = useCallback(
        (e: any) => {
            const response = {
                email: email,
            };
            axios
                .post(
                    `http://localhost:5000/management/send-reset-password-email`,
                    response
                )
                .then((res) => {
                    console.log("res", res);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(response);
            e.preventDefault();
        },
        [email]
    );
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
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                        ></input>
                        <button type="submit" className="">
                           Reset
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ForgetPassword;
