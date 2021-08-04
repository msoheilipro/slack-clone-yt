import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Spinner from 'react-spinkit';
import styled from 'styled-components';
import './App.css';

function App() {
  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
            alt=''
          />
          <Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route exact path='/'>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  > img {
    object-fit: contain;
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

// ............................................................................ //
// How I can implement loading feature?
/*  
  import React, { useEffect } from 'react';
  import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
  import Login from './components/Login';
  import Header from './components/Header';
  import Sidebar from './components/Sidebar';
  import Chat from './components/Chat';
  import { useDispatch, useSelector } from 'react-redux';
  import { login, selectUser } from './features/userSlice';
  import { auth } from './firebase';
  import styled from 'styled-components';
  import './App.css';

  function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
                                                  
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          dispatch(
            login({
              displayName: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
            })
          );
        }
      });
    }, [dispatch]);

    return (
      <div className='app'>
        <Router>
          {!user ? (
            <Login />
          ) : (
            <>
              <Header />
              <AppBody>
                <Sidebar />
                <Switch>
                  <Route exact path='/'>
                    <Chat />
                  </Route>
                </Switch>
              </AppBody>
            </>
          )}
        </Router>
      </div>
    );
  }

  export default App;

  const AppBody = styled.div`
    display: flex;
    height: 100vh;
  `;
*/
// ............................................................................ //
