import React from "react";
import Google from "../../static/images/icons8-google-48.png";
import Facebook from "../../static/images/facebook.png";
import Github from "../../static/images/github.png";

const LoginAll = () => {
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
                    <input type = "text" placeholder = "Email" />
                    <input type = "text" placeholder = "Password" />
                    <button className = "submit" >Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginAll;