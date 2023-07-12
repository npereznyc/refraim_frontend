import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './Nav';
import ConversationBox from './ConversationBox';

function Main() {
  return (
    <div className="App">
      <ConversationBox />
      <Nav />
 
    </div>
  );
}

export default Main;