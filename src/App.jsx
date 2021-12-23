import React from 'react';
import {
  BrowserRouter as Router, Route, Routes as Switch,
} from 'react-router-dom';
import SignInView from './containers/SignInView';
import SignUpView from './containers/SignUpView';
import SignOutView from './containers/SignOutView';
import TodosList from './containers/TodosList';
import Profile from './containers/Profile';
import './App.css';
import { FirebaseProvider } from './Firebase';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const Routes = () => (
  <FirebaseProvider>
    <Router>
      <Switch>
        <Route exact path="/signup" element={<SignUpView />} />
        <Route exact path="/signin" element={<SignInView />} />
      </Switch>

      <nav className="navbar">
        <Navbar />
      </nav>

      <div className="main-container">
        <Switch>
          <Route exact path="/" element={<PrivateRoute><TodosList /></PrivateRoute>} />
          <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route exact path="/logout" element={<SignOutView />} />
        </Switch>
      </div>
    </Router>
  </FirebaseProvider>

);

export default Routes;
