import React from 'react';

const LoginwithGithub = () => {
  return (
    <div className = "loginButton github" >
      <a
        style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center'  }}
        href={`https://github.com/login/oauth/authorize?client_id=${window.GITHUB_CLIENT_ID}`}
      >
        <img src = '../../static/images/github.png' className = "icon" />
        Github 
      </a>
    </div>
  );
};

export default LoginwithGithub;