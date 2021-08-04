import React, { useRef } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectRoomId } from '../features/appSlice';
import { db } from '../firebase';
import ChatInput from './ChatInput';
import Message from './Message';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useEffect } from 'react';

const Chat = () => {
  const chatRef = useRef(null);

  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );
  // console.log(roomDetails?.data());

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );
  // console.log(roomMessages);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <span>#{roomDetails?.data().name}</span>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              // console.log(doc.data());
              const { message, user, userImage, timestamp } = doc.data(); //Destructuring
              return (
                <Message
                  key={doc.id}
                  message={message}
                  user={user}
                  userImage={userImage}
                  timestamp={timestamp}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          {/* <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              console.log(doc.data())
              return (     
                  <Message
                    key={doc.id}
                    message={doc.data().message}
                    timestamp={doc.data().timestamp}
                    user={doc.data().user}
                    userImage={doc.data().userImage}
                  />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages> */}

          {/* <ChatMessages>
            {roomMessages?.docs.map((doc) => (
              <Message
                key={doc.id}
                message={doc.data().message}
                timestamp={doc.data().timestamp}
                user={doc.data().user}
                userImage={doc.data().userImage}
              />
            ))}
            <ChatBottom ref={chatRef} />
          </ChatMessages> */}

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
