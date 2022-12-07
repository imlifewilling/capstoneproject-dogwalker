import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Google from "../../static/images/icons8-google-48.png";
import Facebook from "../../static/images/facebook.png";
import Github from "../../static/images/github.png";
import { attemptLogin, logwith3rdParty} from "../store";
import axios from "axios";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ //set the credentials state for login
        email: '',
        password: ''
    });

    const onChange = (ev) => {
        setCredentials({...credentials, [ev.target.name]: ev.target.value}); //update the credentials
    }
    
    const onsubmit = (ev) => { //handle the submit event for loginButton
        ev.preventDefault();
        dispatch(attemptLogin(credentials, navigate));
    };

    const google = async() => {
        window.open('http://localhost:3000/api/auth/google')
        const response = await axios.get('/api/auth/login/success')
        const userinfo = { //set the user info from google for setting new user in db
            email: response.data.user._json.email,
            firstname: response.data.user._json.given_name,
            lastname: response.data.user._json.family_name,
            password: response.data.user.id
        }
        console.log(userinfo)
        dispatch(logwith3rdParty(userinfo, navigate))
    }

    const github = async() => {
        window.open('http://localhost:3000/api/auth/github')
        const response = await axios.get('/api/auth/login/success')
        const userinfo = { //set the user info from google for setting new user in db
            email: response.data.user.emails[0].value,
            firstname: response.data.user.displayName,
            password: response.data.user.nodeId,
            avatar: response.data.user._json.avatar_url
        }
        dispatch(logwith3rdParty(userinfo, navigate))
    }

    return (
        <div className = "login">
            <h1 className = "loginTitle">Choose a Login Method</h1>
            <div className = "wrapper">
                <div className = "left">
                    <div className = "loginButton google" onClick = {google}>
                        <img src = {Google} className = "icon" />
                        Google
                    </div>
                    <div className = "loginButton facebook">
                        <img src = {Facebook} className = "icon" />
                        Facebook
                    </div>
                    <div className = "loginButton github" onClick = {github}>
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
            <h5 className = "signupLink">Don't have an account? Sign up <a href = "#/signup">here</a></h5>
        </div>
    )
}

export default Login;