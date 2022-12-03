import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Google from "../../static/images/icons8-google-48.png";
import Facebook from "../../static/images/facebook.png";
import Github from "../../static/images/github.png";
import { attemptLogin } from "../store";

const Login = () => {
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({ //set the credentials state for login
        email: '',
        password: ''
    });

    const onChange = (ev) => {
        setCredentials({...credentials, [ev.target.name]: ev.target.value}); //update the credentials
    }
    
    const onsubmit = (ev) => { //handle the submit event for loginButton
        ev.preventDefault();
        dispatch(attemptLogin(credentials));
    };

    return (
        <div className = "login">
            <h1 className = "loginTitle">Choose a Login Method</h1>
            <div className = "wrapper">
                <div className = "left">
                    <div className = "loginButton google">
                        <img src = {Google} className = "icon" />
                        Google
                    </div>
                    <div className = "loginButton facebook">
                        <img src = {Facebook} className = "icon" />
                        Facebook
                    </div>
                    <div className = "loginButton github">
                        <img src = {Github} className = "icon" />
                        Github
                    </div>
                </div>
                <div className = "center">
                    <div className = "line" />
                    <div className = "or">OR</div>
                </div>
                <div className = "right">
                    <input type = "text" placeholder = "Email" name = 'email' value = {credentials.email} onChange = {onChange} />
                    <input type = "text" placeholder = "Password" name = 'password' value = {credentials.password} onChange = {onChange} />
                    <button className = "submit" onClick = {onsubmit} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;