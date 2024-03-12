import './App.css';
import React from 'react';
import Pokedoro from './components/Pokedoro';
import GoogleLoginButton from './components/GoogleLoginButton';

function App() {
  return (
    <>
      <div>
        <GoogleLoginButton />
        <Pokedoro />
      </div>
    </>
  );
}

export default App;
