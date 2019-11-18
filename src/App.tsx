import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Chat} from './chat/Chat';
import {Header} from './Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/chat" exact component={Chat} />
        <Route path="/" exact component={Home} />
      </Router>
      
    </div>
    
  );
}

export default App;
