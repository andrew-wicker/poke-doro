import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google/callback';
  };

  return <button onClick={handleLogin}>Log in with Google</button>;
};

export default GoogleLoginButton;
