import React from 'react';
import { Avatar } from '@material-ui/core';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styled from 'styled-components';


const Header = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut()
    .then(() => {
      dispatch(logout());
    });
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          // onClick={() => auth.signOut()}
          onClick={signOut}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </HeaderLeft>

      <HeaderSearch>
        <SearchIcon />
        <input placeholder='Search...' />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

// ------------------------------------------------------------------- //
/*
  import React from 'react';
  import { useDispatch, useSelector } from "react-redux";
  import { logout, selectUser } from '../features/userSlice';
  import { auth } from '../firebase';
  import { Avatar } from '@material-ui/core';
  import AccessTimeIcon from '@material-ui/icons/AccessTime';
  import SearchIcon from '@material-ui/icons/Search';
  import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
  import styled from 'styled-components';


  const Header = () => {
    const [user] = useSelector(selectUser);
    const dispatch = useDispatch();

    const signOut = () => {
      auth.signOut()
      .then(() => {
        dispatch(logout());
      });
    };

    return (
      <HeaderContainer>
        <HeaderLeft>
          <HeaderAvatar
            onClick={signOut}
            alt={user?.displayName}
            src={user?.photoURL}
          />
          <AccessTimeIcon />
        </HeaderLeft>

        <HeaderSearch>
          <SearchIcon />
          <input placeholder='Search...' />
        </HeaderSearch>

        <HeaderRight>
          <HelpOutlineIcon />
        </HeaderRight>
      </HeaderContainer>
    );
  };

  export default Header;
*/
// ------------------------------------------------------------------- //

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

