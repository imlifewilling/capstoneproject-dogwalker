import React from 'react';

const LoginwithGithub = () => {
  return (
    <a
      style={{ textDecoration: 'none' }}
      href={`https://github.com/login/oauth/authorize?client_id=${window.GITHUB_CLIENT_ID}`}
    >
      <div
        style={{
          height: '30px',
          display: 'flex',
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '5px',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: '3px',
        }}
      >
        <p style={{ color: 'rgba(0, 0, 0, 0.875)', fontSize: '0.875rem' }}>
          Sign in with GitHub
        </p>
        <img
          style={{
            resizeMode: 'center',
            height: '20px',
            width: '20px',
          }}
          src="../../static/images/github_icon.png"
        />
      </div>
    </a>
  );
};

export default LoginwithGithub;