import React from 'react';
import SidebarOption from './SidebarOption';
import { useCollection } from 'react-firebase-hooks/firestore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// import { useSelector } from 'react-redux';
// import { selectUser } from '../features/userSlice';

const Sidebar = () => {
  //   const [channels, loading, error] = useCollection(db.collection('rooms'));
  //   const [user, loading, error] = useAuthState(auth);

  const [channels] = useCollection(db.collection('rooms'));
  const [user] = useAuthState(auth);

  // const user = useSelector(selectUser);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>MS</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOption Icon={InsertCommentIcon} title='Threads' />
      <SidebarOption Icon={InboxIcon} title='Mentions 	&amp; reactions' />
      <SidebarOption Icon={DraftsIcon} title='Saved items' />
      <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
      <SidebarOption Icon={PeopleAltIcon} title='People &amp; user groups' />
      <SidebarOption Icon={AppsIcon} title='Apps' />
      <SidebarOption Icon={FileCopyIcon} title='File browser' />
      <SidebarOption Icon={ExpandLessIcon} title='Show less' />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title='Channels' />
      <hr />
      <SidebarOption
        Icon={AddIcon}
        addChannelOption={true}
        title='Add Channel'
      />
      {/* <SidebarOption Icon={AddIcon} addChannelOption title='Add Channel' /> */}

      {channels?.docs.map((doc) => {
        // console.log(doc.data());
        return (
          <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
        );
      })}
      {/*
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}

      {channels?.docs.map(({ id, data: { name } }) => {
        return <SidebarOption key={id} id={id} title={name} />;
      })}

      {channels?.docs.map(({ id, data: { name } }) => (
        <SidebarOption key={id} id={id} title={name} />
      ))}
*/}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  flex: 0.3;
  max-width: 260px;
  color: white;
  background-color: var(--slack-color);
  border-top: 1px solid #49274b;
  margin-top: 60px;
  overflow-y: scroll;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
// ............................................................................ //
/*
  import React, { useEffect, useState } from 'react';
  import SidebarOption from './SidebarOption';
  import { useSelector } from 'react-redux';
  import { selectUser } from '../features/userSlice';
  import { db } from '../firebase';
  import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
  import CreateIcon from '@material-ui/icons/Create';
  import InsertCommentIcon from '@material-ui/icons/InsertComment';
  import InboxIcon from '@material-ui/icons/Inbox';
  import DraftsIcon from '@material-ui/icons/Drafts';
  import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
  import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
  import AppsIcon from '@material-ui/icons/Apps';
  import FileCopyIcon from '@material-ui/icons/FileCopy';
  import ExpandLessIcon from '@material-ui/icons/ExpandLess';
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
  import AddIcon from '@material-ui/icons/Add';
  import styled from 'styled-components';

  const Sidebar = () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
      db.collection('rooms').onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map(
            (doc) => (
              console.log(doc),
              {
                id: doc.id,
                data: doc.data(),
              }
            )
          )
        )
      );
    }, []);

    const user = useSelector(selectUser);

    return (
      <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo>
            <h2>MS</h2>
            <h3>
              <FiberManualRecordIcon />
              {user?.displayName}
            </h3>
          </SidebarInfo>

          <CreateIcon />
        </SidebarHeader>

        <SidebarOption Icon={InsertCommentIcon} title='Threads' />
        <SidebarOption Icon={InboxIcon} title='Mentions   &amp; reactions' />
        <SidebarOption Icon={DraftsIcon} title='Saved items' />
        <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
        <SidebarOption Icon={PeopleAltIcon} title='People &amp; user groups' />
        <SidebarOption Icon={AppsIcon} title='Apps' />
        <SidebarOption Icon={FileCopyIcon} title='File browser' />
        <SidebarOption Icon={ExpandLessIcon} title='Show less' />
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title='Channels' />
        <hr />
        <SidebarOption
          Icon={AddIcon}
          addChannelOption={true}
          title='Add Channel'
        />

        {channels.map(({ id, data: { name } }) => (
          <SidebarOption key={id} id={id} title={name} />
        ))}
      </SidebarContainer>
    );
  };

  export default Sidebar;

  const SidebarContainer = styled.div`
    flex: 0.3;
    max-width: 260px;
    color: white;
    background-color: var(--slack-color);
    border-top: 1px solid #49274b;
    margin-top: 60px;
    overflow-y: scroll;
    > hr {
      margin-top: 10px;
      margin-bottom: 10px;
      border: 1px solid #49274b;
    }
  `;

  const SidebarHeader = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    > .MuiSvgIcon-root {
      padding: 8px;
      color: #49274b;
      font-size: 18px;
      background-color: white;
      border-radius: 50%;
    }
  `;

  const SidebarInfo = styled.div`
    flex: 1;
    > h2 {
      font-size: 15px;
      font-weight: 900;
      margin-bottom: 5px;
    }

    > h3 {
      display: flex;
      font-size: 13px;
      font-weight: 400;
      align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
      font-size: 14px;
      margin-top: 1px;
      margin-right: 2px;
      color: green;
    }
  `;
*/  
// ............................................................................ //
