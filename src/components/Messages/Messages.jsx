import { useState, useEffect } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Messages = () => {

    const {user, allUsers, allChats} = useSelector(state => state);
    const [messages, setMessages] = useState();

    const navigate = useNavigate();

    const findYourMessages = () => {
        if (allChats.length === 0) return;
        return allChats?.filter(chat => chat.user1 === user.userId ||  chat.user2 === user.userId);
    }

    const sortMessages = (messages) => {
        if (allChats.length === 0) return;
        return messages.sort((a, b) => {
            if (a.messages.length === 0) return 1
            if (b.messages.length === 0) return 0
            return b.messages.slice(-1)[0].at.seconds - a.messages.slice(-1)[0].at.seconds
        });
    }

    useEffect(() => { 
      setMessages(sortMessages(findYourMessages()));
    }, [user, allChats])

    const findReciver = (message) => {
        const user1 = message.user1;
        const user2 = message.user2;
        if (user1 === user.userId) return allUsers.filter(user => user.userId === user2)[0];
        if (user2 === user.userId) return allUsers.filter(user => user.userId === user1)[0];
    }


  return (
    <Container>
        <h3>Your Messages</h3>
        {messages?.map(message => {       
                return (
                <ChatRow  key={uuidv4()} onClick={() => navigate(`/messages/${findReciver(message).userId}`)}>
                    <img src={findReciver(message).photo} alt="" />
                    <div>
                        <h5>{findReciver(message).name}</h5>
                        {message.messages?.length > 0 && <h6>{allUsers.filter(user => user.userId === message.messages.slice(-1)[0].by)[0].userId === user.userId && 'You: '} {message.messages.slice(-1)[0].text}</h6>}
                    </div>
                </ChatRow>
                )
            })}
            <ChatRow onClick={() => navigate('/messages/bot')}>
                <img src={'https://firebasestorage.googleapis.com/v0/b/social-platform-1875f.appspot.com/o/istockphoto-1221348467-612x612.jpg?alt=media&token=0c4a27c5-78b5-490f-84d5-4b2bf4198b5f'} alt="" />
                <div>
                    <h5>Prime bot</h5>
                    <h6>Hello {user.userName}, welcome to Prime and we hope you enjoy your stay</h6>
                </div>
            </ChatRow>
    </Container>
  )
}

export default Messages;


const Container = styled.section`
    min-height: 100vh;
    width: max(50vw, 600px);
    display: flex;
    flex-direction: column;
    gap: .6em;
    font-size: 1rem;

    > h3 {
        font-size: .9em;
    }

    @media(max-width: 900px) {
        width: 100%;
    }

    @media(max-width: 900px) {
        display: none;
    }

    @media(min-width: 1700px) {
        font-size: 1.3rem;
    }

    @media(min-width: 2000px) {
        font-size: 1.9rem;
    }

    @media(min-width: 2800px) {
        font-size: 2.7rem;
    }

    @media(min-width: 4000px) {
        font-size: 3rem;
    }

    @media(min-width: 5000px) {
        font-size: 3.7rem;
    }
`

const ChatRow = styled.div`

    cursor: pointer;
    display: flex;
    gap: .6em;
    background: white;
    padding: .5em 1em;
    border-radius: .6em;

    img {
        width: 2.3em;
        height: 2.3em;
        border-radius: 1.1em;
        object-fit: cover;

    }

     > div {
        h5 {
            color: ${({theme}) => theme.mainColor};
        }


        .new-messages {
            color: red;
            font-weight: bolder;
        }
     }

`