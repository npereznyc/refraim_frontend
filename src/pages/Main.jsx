import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from '../components/Nav';
import ConversationBox from '../components/ConversationBox';

function Main() {
  return (
    <div className="App">
      <ConversationBox />
      <Nav />
 
    </div>
  );
}

export default Main;