import './App.css';
import React, { useEffect, useState } from 'react';
import Pokedoro from './components/Pokedoro';
import GoogleLoginButton from './components/GoogleLoginButton';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div>
        {!loggedIn && <GoogleLoginButton />}

        <Pokedoro />
      </div>
    </>
  );
}

export default App;
