import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Nav from '../components/Nav';
import ConversationBox from '../components/ConversationBox';
import Registration from '../pages/Registration';
import Welcome from '../pages/Welcome';
import Disclaimer from '../pages/Disclaimer';
import RefraimSession from '../pages/RefraimSession';
import Login from '../pages/Login';
import AllConversations from '../pages/SessionHistory';
import AuthContext from '../auth';
import { useContext } from 'react';

function Main() {
  let {user} = useContext(AuthContext)
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Registration />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Disclaimer />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/session' element={!user ? <Navigate to="/" /> : <RefraimSession />} />
        <Route path='history/:id' element={<AllConversations />}/>
        {/* Other routes here */}
      </Routes>
    </div>
  );
}

export default Main;