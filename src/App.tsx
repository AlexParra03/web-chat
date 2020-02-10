import React, { Children } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatContainer from './chat-app/ChatContainer';
import Header from './chat-app/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import { createStore } from 'redux';
import CreateChat from './chat-app/CreateChat';
import { connect } from 'react-redux'


const App: React.FC = (props: any) => {



  let AppContent = null;
  // TODO: Make authentication function
  const isAuthenticated = !!props.token ;
  if (!isAuthenticated) {
    AppContent = () => (
      <div className="App">
        <Home />
      </div>
      );
  } else {
      AppContent = () => (
        <div>
          <ChatContainer />
        </div>
      )
  }

  let routes = [
    <Route path="/" exact  component={AppContent} />
  ];

  // routes valid only when authenticated
  const authRoutes = [
    <Route path="/create-chat" exact component={CreateChat} />
  ];

  if (isAuthenticated) {
    for(const authRoute of authRoutes) {
      routes.push(authRoute)
    }
  } else {
    for(const authRoute of authRoutes) {
      routes.push(<Redirect to='/' />);
      break;
    }
  }
  console.log(routes);
  return (<Router>
       {routes}
      </Router>);
      
}

function mapStateToProps(state: any) {
  return { token: state.user.token }
}

export default connect(mapStateToProps)(App);
