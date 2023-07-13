import './App.css';
import React  from 'react';
import Nav from './components/Nav';
import Main from './pages/Main';
import axios from 'axios';
import GoogleLogin from './components/GoogleLogin';
import { AuthProvider } from './auth';



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
        <GoogleLogin/>
      </header>

    <AuthProvider>
      <Main/>
    </AuthProvider>
    </div>
  );
}

export default App;
