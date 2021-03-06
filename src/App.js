import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Switch, 
  Link, 
  Route
} from 'react-router-dom';
import SecureRoute from './components/SecureRoute';
import SignIn from './pages/user/SignIn';
import Habits from './pages/activity/Activity.List';
import { userContext } from './Context';

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Activity Tracker</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/user'>Login</Link></li>
          <li><Link to='activities'>Tracker</Link></li>
        </ul>
        <Switch>
          <Route path='/signIn'><SignIn /></Route>
          <Route path='/activities'><Habits /></Route>
          <SecureRoute path='/' />
      </Switch>
      </Router>
    </div>
  );
}

export default App;


