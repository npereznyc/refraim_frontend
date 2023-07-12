import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main';
import Registration from './components/Registration';
import Welcome from './pages/Welcome';
import Disclaimer from './pages/Disclaimer';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>
        refr<span style={{color:'cornflowerblue'}}>ai</span>m
      </p>
      </header>

      
      <Routes>
        <Route path='/register' element={<Registration/>} />
        <Route path='/' element={<Main />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/disclaimer' element={<Disclaimer />} />
        {/* Other routes here */}
      </Routes>
      
    </div>
  );
}

export default App;
