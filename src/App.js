import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './pages/Main';
import Registration from './pages/Registration';
import Welcome from './pages/Welcome';
import Disclaimer from './pages/Disclaimer';
import RefraimSession from './pages/RefraimSession';
import axios from 'axios';
import GoogleLogin from './components/GoogleLogin';
import { AuthProvider } from './auth';
import AuthContext from './auth';
import Login from './pages/Login';
import AllConversations from './pages/SessionHistory';
import PrePrompt from './pages/PrePrompt';


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

  let {user} = useContext(AuthContext)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          refr<span style={{ color: 'cornflowerblue' }}>ai</span>m
        </p>
        <GoogleLogin/>
      </header>

    <AuthProvider>
      <Routes>
        <Route path='/register' element={<Registration />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Disclaimer />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/session' element={!user ? <Navigate to="/" /> : <RefraimSession />} />
        <Route path='history/:id' element={<AllConversations />}/>
        {/* Other routes here */}
      </Routes>
    </AuthProvider>
    </div>
  );
}

export default App;
