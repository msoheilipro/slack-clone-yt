import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth, provider } from '../firebase';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const Login = () => {
  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((user) =>
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        )
      )
      .catch((error) => alert(error.message));
  };

  return (
    <LoginContainer>
      <LoginIneerContainer>
        <img
          src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
          alt=''
        />
        <h1>Sign In To The Slack Comunity</h1>
        <p>my.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginIneerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginIneerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;     // What text-transform:inherit do for us? and Why !important?
    background-color: #0a8d48 !important;   // Why !important?
    color: white;
  }
`;
