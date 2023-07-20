import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Registration from '../pages/Registration';
import Welcome from '../pages/Welcome';
import Disclaimer from '../pages/Disclaimer';
import RefraimSession from '../pages/RefraimSession';
import Login from '../pages/Login';
import AllConversations from '../pages/SessionHistory';
import AuthContext from '../auth';
import { useContext } from 'react';
import PrePrompt from './PrePrompt';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import Complete from './Complete';


function Main() {
  const theme = useTheme()
  let {user} = useContext(AuthContext)
  return (
    <div className="App">
      <header className="App-header">
      <Typography variant="h1" color='primary' >Refr<span style={{ color: theme.palette.secondary.main }}>ai</span>m</Typography>
 
      </header> 
      <Routes>
        <Route path='/' element={<Disclaimer />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/register' element={<Registration />} />
        <Route path='login' element={<Login />} />
        <Route path='/pre-prompt' element={!user ? <Navigate to="/welcome" /> : <PrePrompt />} />
        <Route path='/session' element={!user ? <Navigate to="/welcome" /> : <RefraimSession />} />
        <Route path='history/:id' element={<AllConversations />}/>
        <Route path='/complete' element={<Complete />} />
      </Routes>
    </div>
  );
}

export default Main;