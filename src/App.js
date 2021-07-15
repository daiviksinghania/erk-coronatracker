import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './components/Navbar';
import { Routes } from './routes';


function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
