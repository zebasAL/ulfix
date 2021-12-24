import React from 'react';
import {
  BrowserRouter as Router, Route, Routes as Switch, Navigate,
} from 'react-router-dom';
import SignInView from './containers/SignInView';
import SignUpView from './containers/SignUpView';
import SignOutView from './containers/SignOutView';
import TodosList from './containers/TodosList';
import AllUsersView from './containers/AllUsersView';
import ProfileView from './containers/profiles/ProfileView';
import './App.css';
import { FirebaseProvider } from './Firebase';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const Routes = () => (
  <FirebaseProvider>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/signup" element={<SignUpView />} />
        <Route exact path="/signin" element={<SignInView />} />

        <Route exact path="/" element={<PrivateRoute><TodosList /></PrivateRoute>} />
        <Route exact path="/profiles" element={<AllUsersView />} />
        <Route exact path="/profiles/:key" element={<PrivateRoute><ProfileView /></PrivateRoute>} />
        <Route exact path="/logout" element={<SignOutView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </Router>
  </FirebaseProvider>

);

export default Routes;
