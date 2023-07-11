import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main';
import Registration from './components/Registration';


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
        {/* Other routes here */}
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
