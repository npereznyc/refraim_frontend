import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Registration from '../pages/Registration';
import Welcome from '../pages/Welcome';
import Disclaimer from '../pages/Disclaimer';
import RefraimSession from '../pages/RefraimSession';
import Login from '../pages/Login';
import AllConversations from '../pages/SessionHistory';
import AuthContext from '../auth';
import { useContext } from 'react';
import PrePrompt from './PrePrompt';

function Main() {
  let {user} = useContext(AuthContext)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          refr<span style={{ color: 'cornflowerblue' }}>ai</span>m
        </p>
      </header> 
      <Routes>
        <Route path='/' element={<Disclaimer />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/register' element={<Registration />} />
        <Route path='login' element={<Login />} />
        <Route path='/pre-prompt' element={!user ? <Navigate to="/welcome" /> : <PrePrompt />} />
        <Route path='/session' element={!user ? <Navigate to="/welcome" /> : <RefraimSession />} />
        <Route path='history/:id' element={<AllConversations />}/>
      </Routes>
    </div>
  );
}

export default Main;