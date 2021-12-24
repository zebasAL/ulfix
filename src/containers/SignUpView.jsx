/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button, SendMessageIcon, toaster } from 'evergreen-ui';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '../components/TextField';
import { Users } from '../Firebase';
import photo from '../assets/Boost-Productivity.jpg';
import logo from '../assets/horizontal-logo.png';

const SignUpView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    Users.signUpUser(userForm.email, userForm.password)
      .then(() => {
        Users.createProfile({
          name: userForm.name,
          email: userForm.email,
          created_at: Date.now().toString(),
        })
          .then(() => {
            toaster.success('Signed up successfully');
            navigate('/');
          })
          .catch(() => {
            toaster.warning('Something went wrong');
          });
      })
      .catch(() => {
        setIsLoading(false);
        toaster.warning('Something went wrong');
      });
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-image-wrapper">
        <div className="slogan">
          <img alt="logo" src={logo} />
          <p>Do not try to memorize, better write it down</p>
        </div>
        <img alt="SignUp" src={photo} />
      </div>
      <form className="sign-up-form" onSubmit={(e) => handleSubmit(e)}>
        <p>Sign Up</p>
        <div className="sign-up-wrapper">
          <label htmlFor="name">Name:</label>
          <TextField
            id="name"
            label="Type your name"
            value={userForm.name}
            setValue={(value) => setUserForm((prevState) => ({
              ...prevState, name: value,
            }))}
            type="text"
          />

          <label htmlFor="email">Email:</label>
          <TextField
            id="email"
            label="Type your email"
            value={userForm.email}
            setValue={(value) => setUserForm((prevState) => ({
              ...prevState, email: value,
            }))}
            type="email"
            required
          />

          <label htmlFor="password">Password:</label>
          <TextField
            id="password"
            label="Type a password"
            value={userForm.password}
            setValue={(value) => setUserForm((prevState) => ({
              ...prevState, password: value,
            }))}
            type="password"
            required
          />

          <TextField
            id="confirm-password"
            label="Confirm your password"
            value={confirmPassword}
            setValue={(value) => setConfirmPassword(value)}
            type="password"
            required
          />

          <Link data-cy="redirect-to-signin" to="/signin">Already have an account? sign in</Link>

          <Button
            borderRadius={17}
            maxWidth={200}
            height={40}
            display="flex"
            type="submit"
            isLoading={isLoading}
            margin="auto"
            marginTop={30}
            iconAfter={SendMessageIcon}
            disabled={!userForm.name || !userForm.email || !userForm.password
            || (confirmPassword !== userForm.password)}
          >
            Submit
          </Button>
          `
        </div>
      </form>
    </div>
  );
};

export default SignUpView;
