import React from 'react';
import LoginwithGoogle from './LoginwithGoogle';
import LoginwithGithub from './LoginwithGithub';
import LoginwithCredentials from './LoginwithCredentials';


const Login = () => {
  return (
    <div className = "login">
        <h1 className = "loginTitle">Choose a Login Method</h1>
        <div className = "wrapper">
            <div className = "left">
                <LoginwithGoogle />
                <>
                    <div className = "loginButton facebook">
                        <img src = '../../static/images/facebook.png' className = "icon" />
                        Facebook
                    </div>
                    <div style = {{height: 15}}></div>
                </>   
                <>
                    <LoginwithGithub />  
                    <div style = {{height: 15}}></div>
                </>
               
            </div>
            <div className = "center">
                <div className = "line" />
                <div className = "or">OR</div>
            </div>
            <div className = "right">
                <LoginwithCredentials />
            </div>
        </div>
        <h5 className = "signupLink">Don't have an account? Sign up <a href = "#/signup">here</a></h5>
    </div>
  );
};

export default Login;