import React from 'react';
import {
  BrowserRouter as Router, Route, Routes as Switch,
} from 'react-router-dom';
import SignInView from './containers/SignInView';
import SignUpView from './containers/SignUpView';
import TodosList from './containers/TodosList';
import './App.css';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" element={<TodosList />} />
      <Route exact path="/signin" element={<SignInView />} />
      <Route exact path="/signup" element={<SignUpView />} />
    </Switch>
  </Router>
);

export default Routes;
