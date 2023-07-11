import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>
        refr<span style={{color:'cornflowerblue'}}>ai</span>m
      </p>
      </header>
      <Nav />
 
    </div>
  );
}

export default App;
