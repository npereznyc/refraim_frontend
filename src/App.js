import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './pages/Main';
import Registration from './pages/Registration';
import Welcome from './pages/Welcome';
import Disclaimer from './pages/Disclaimer';
import RefraimSession from './pages/RefraimSession';
import axios from 'axios';


function App() {
  // Set up interceptor that attaches a token to every request:
  axios.interceptors.request.use((config) => {
    // Get the token from local storage
    const token = localStorage.getItem('access_token');

    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    // Set the content type to JSON
    config.headers['Content-Type'] = 'application/json';
    return config;
  });
  return (
    <div className="App">
      <header className="App-header">
        <p>
          refr<span style={{ color: 'cornflowerblue' }}>ai</span>m
        </p>
      </header>


      <Routes>
        <Route path='/register' element={<Registration />} />
        <Route path='/' element={<Disclaimer />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/session' element={<RefraimSession />} />
        {/* Other routes here */}
      </Routes>

    </div>
  );
}

export default App;
