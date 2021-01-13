import React from 'react';
import './App.css';
import Pixabay from './components/Pixabay'
import { NavBar } from './components/NavBar';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { Logo } from './components/Logo';
import { UserInfoEdit } from './components/UserInfoEdit';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/"><Redirect to="/logo" /></Route>
          <Route exact path='/logo' component={() => <Logo />} />
          <Route path='/registration' component={() => <Registration />} />
          <Route path='/login' component={() => <Login />} />
          <Route path='/edit' component={() => <UserInfoEdit />} />
          <Route path='/pixabay' component={() => <Pixabay />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
