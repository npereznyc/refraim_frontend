import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './Nav';
import ConversationBox from './ConversationBox';
import Registration from './Registration';

function Main() {
  return (
    <div className="App">
      <ConversationBox />
 
    </div>
  );
}

export default Main;