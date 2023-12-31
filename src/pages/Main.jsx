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
import Favorites from './Favorites';
import Settings from './Settings';
import Home from './Home';


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
        <Route path='history/:id' element={!user ? <Navigate to="/welcome" /> : <AllConversations />}/>
        <Route path='/complete' element={!user ? <Navigate to="/welcome" /> : <Complete />} />
        <Route path='favorites/:id' element={!user ? <Navigate to="/welcome" /> : <Favorites />} />
        <Route path='settings/:id' element={!user ? <Navigate to="/welcome" /> : <Settings />} />
        <Route path='home' element={!user ? <Navigate to="/welcome" /> : <Home />} />
      </Routes>
    </div>
  );
}

export default Main;