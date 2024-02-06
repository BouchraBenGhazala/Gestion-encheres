import React, { useEffect, useState, useRef } from "react";
import background from '../dependecies/images/antique-1.jpg';
import * as babelTypes from "@babel/types";
import back from '../dependecies/images/back.jpg'


// Now you can use babelTypes for AST manipulation
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Authenticate() {
    const [activeTab, setActiveTab] = useState("signup");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [isVendor, setIsVendor] = useState();
    const [exist, setExist] = useState(null);
    const [login, setLogIn] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const handleInputChange = (input) => {

        const label = input.target.previousElementSibling;


        if (input.target.value === "") {
            label.classList.remove("active", "highlight");
        } else {
            label.classList.add("active", "highlight");
        }
       
    };

    const handleClickSignUp = async (e) => {
        e.preventDefault();

        const user = { isVendor, email, firstName, lastName, password };

        const response = await fetch("http://localhost:8080/utilisateurs/add", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user)
        })

        const result = await response.text();
        setExist(result === '');

    }

    // const handleClickLogIn = async (e) => {
    //     e.preventDefault();
    //     const user = { email, password };

    //     const response = await fetch("http://localhost:8080/utilisateurs/logIn", {
    //         method: "POST",
    //         headers: { "Content-type": "application/json" },
    //         body: JSON.stringify(user)
    //     })
    //     // const result = await response.text();
    //     // setLogIn(result === '');
    // }


    

    const handleClickLogIn = async (e) => {
        e.preventDefault();
        const user = { email, password };

        const response = await fetch("http://localhost:8080/utilisateurs/logIn", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user)
        });
    
        const result = await response.text();
        console.log(result);
        setLogIn(result === '');
        
        if (result === 'user log') {
            // User logged in successfully, create a session
            const userData = await fetch("http://localhost:8080/utilisateurs/getByEmail?email=" + email);
            const userInfo = await userData.json();
    
            // Store user information in sessionStorage
            sessionStorage.setItem('user', JSON.stringify(userInfo));


            // Redirect based on user role
            if (userInfo.isVendor) {
                console.log("vendeur")
                console.log(userInfo.firstName);
                // history.push('/home'); // Redirect to the home page for vendors
                navigate(`/vendeur`)

            } else {
                console.log("acheteur")
                navigate('/')
            }
        }
    };
    


    return (
        <>
            <img src={back} alt="" className="back"/>

            <div className="authenticate">
                <div className="form">
                    <ul className="tab-group">
                        <li className={`tab ${activeTab === "signup" ? "active" : ""}`}>
                            <a href="#signup" onClick={() => handleTabClick("signup")}>
                                Sign Up
                            </a>
                        </li>
                        <li className={`tab ${activeTab === "login" ? "active" : ""}`}>
                            <a href="#login" onClick={() => handleTabClick("login")}>
                                Log In
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div id="signup" style={{ display: activeTab === "signup" ? "block" : "none" }}>
                            <h1>Sign Up </h1>

                            <form action="/" method="post" onSubmit={handleClickSignUp}>
                                <div className="top-row">
                                    <div className="field-wrap">
                                        <label htmlFor="cc">
                                            First Name<span className="req">*</span>
                                        </label>
                                        <input type="text" required autoComplete="off" onChange={(e) => {
                                            setFirstName(e.target.value);
                                            handleInputChange(e);
                                        }} />
                                    </div>

                                    <div className="field-wrap">
                                        <label>
                                            Last Name<span className="req">*</span>
                                        </label>
                                        <input type="text" required autoComplete="off" onChange={(e) => {
                                            setLastName(e.target.value);
                                            handleInputChange(e);
                                        }} />
                                    </div>
                                </div>

                                <div className="field-wrap">
                                    <label>
                                        Email Address<span className="req">*</span>
                                    </label>
                                    <input type="email" required autoComplete="off" onChange={(e) => {
                                        setEmail(e.target.value);
                                        handleInputChange(e);
                                    }} />
                                </div>

                                <div className="field-wrap">
                                    <label>
                                        Set A Password<span className="req">*</span>
                                    </label>
                                    <input type="password" required autoComplete="off" onChange={(e) => {
                                        setPwd(e.target.value);
                                        handleInputChange(e);
                                    }} />
                                </div>

                                <div className="field-wrap">
                                    <label>Vendeur / Acheteur</label>
                                    <select name="cars" className="select" defaultValue="" required onChange={(e) => {
                                        if (e.target.value === "vendeur") {
                                            setIsVendor(1);
                                        } else
                                            setIsVendor(0);
                                        handleInputChange(e);
                                    }}>
                                        <option value="" disabled hidden></option>
                                        <option value="vendeur">Vendeur</option>
                                        <option value="acheteur">Acheteur</option>
                                    </select>
                                </div>
                                {exist === true &&
                                    <div className="alert alert-danger">
                                        <strong>User already exist!</strong> Please try another time.
                                    </div>
                                }

                                {exist === false &&
                                    <div className="alert alert-success">
                                        <strong>Registration succeded</strong> Congrats
                                    </div>
                                }


                                <button type="submit" className="button button-block" >
                                    Sign Up
                                </button>
                            </form>
                        </div>

                        <div id="login" style={{ display: activeTab === "login" ? "block" : "none" }}>
                            <h1>Log In </h1>

                            <form method="post" action="/" onSubmit={handleClickLogIn}>
                                <div className="field-wrap">
                                    <label>
                                        Email Address<span className="req">*</span>
                                    </label>
                                    <input type="email" required autoComplete="off" onChange={(e) => {
                                        setEmail(e.target.value);
                                        handleInputChange(e);
                                    }} />
                                </div>

                                <div className="field-wrap">
                                    <label>
                                        Password<span className="req">*</span>
                                    </label>
                                    <input type="password" required autoComplete="off" onChange={(e) => {
                                        setPwd(e.target.value);
                                        handleInputChange(e);
                                    }} />
                                </div>

                                <p className="forgot">
                                    <a href="#">Forgot Password?</a>
                                </p>
                                {login === true &&
                                    <div className="alert alert-danger">
                                        <strong>Email or Password not correct</strong> Please try another time.
                                    </div> 
                                }
                                {login === false &&
                                    <div className="alert alert-success">
                                        <strong>Login succeded</strong> 
                                    </div>
                                }

                                <button className="button button-block">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
