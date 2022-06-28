import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { updateDoc, addDoc, collection } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Navigate } from 'react-router-dom';



const Chatbox = () => {

    const {user, allUsers, allChats} = useSelector(state => state);
    const {id} = useParams();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const navigate = useNavigate()

    const createNewChatBox = async () => {
        if (id === 'bot') return;
        if (id === user.userId) return;
        await addDoc(collection(db, 'chats'), {
            user1: user.userId,
            user2: id,
            messages: [],
            replyable: true
        })
    }

    const addMessage = async (e) => {
        e.preventDefault();
        if (message.length === 0) return;
        setMessage('');
        await updateDoc(doc(db, 'chats', chat.chatId), {
            messages: [...chat.messages, {
                text: message,
                at: new Date(),
                by: user.userId,
                read: false
            }]
        })
    }
    

    const findExistingChatBox = () => {
        if (allChats.length === 0) return;
        return allChats?.filter(chat => chat.user1 === user.userId && chat.user2 === id || chat.user1 === id && chat.user2 === user.userId)
    }


    useEffect(() => {
        if (allChats.length >= 1 && findExistingChatBox().length === 0) {
            createNewChatBox();
        } else if (allChats.length >= 1 && findExistingChatBox().length === 1) {
            setChat(findExistingChatBox()[0]);
        }
    }, [id, allChats])



    if (id === user.userId) return <Navigate to='/' />
    

    if (id === 'bot') {
        return (
        <Container>
            {allUsers?.length > 0 &&
            <>
            <MessageTitle>
                  <img src={'https://firebasestorage.googleapis.com/v0/b/social-platform-1875f.appspot.com/o/istockphoto-1221348467-612x612.jpg?alt=media&token=0c4a27c5-78b5-490f-84d5-4b2bf4198b5f'} alt="" />
                  <h5>Prime bot</h5>
              </MessageTitle>
      
              <MessagesContainer>
                    <MessageRow byMe={false}>
                        <ProfilePic src={'https://firebasestorage.googleapis.com/v0/b/social-platform-1875f.appspot.com/o/istockphoto-1221348467-612x612.jpg?alt=media&token=0c4a27c5-78b5-490f-84d5-4b2bf4198b5f'} />
                        <MessageContent byMe={message.by === user.userId}>Hello {user.userName}, welcome to Prime and we hope you enjoy your stay</MessageContent>
                    </MessageRow>
              </MessagesContainer>
                <CantReply>You cant reply to this conversation</CantReply>
              </>
              }
          </Container>
        )
    }
  return (
      
    <Container>
      {allUsers?.length > 0 && 
      <>
      <MessageTitle onClick={() => navigate(`/users/${id}`)}>
            <img src={allUsers.filter(user => user.userId === id)[0].photo} alt="" />
            <h5>{allUsers.filter(user => user.userId === id)[0].name}</h5>
        </MessageTitle>
        <MessagesContainer>
            {chat?.messages?.length ? 
                    chat.messages.map(message => {
                        return  (
                            <MessageRow key={message.at?.seconds || Math.random()} byMe={message.by === user.userId}>
                                {message.by !== user.userId && <ProfilePic src={allUsers.filter(user => user.userId === message.by)[0].photo} />}
                                <MessageContent byMe={message.by === user.userId}>{message.text}</MessageContent>
                                {message.at && <MessageAt>{moment(message.at.seconds * 1000).fromNow()}</MessageAt>}
                            </MessageRow>
                            )
                        })
                :
                <></>
            }
      </MessagesContainer>

        {chat?.replyable ?
            <AddMessage onSubmit={addMessage}>
                <MessageField onChange={(e) => setMessage(e.target.value)} type="text" value={message} />
                <AddMessageButton type='submit' value='send' />
            </AddMessage>
        : <CantReply>You cant reply to this conversation</CantReply>}
        </>
        }
    </Container>
  )
}

export default Chatbox;


const Container = styled.section`
    max-height: 70vh;
    background: white;
    width: 50vw;
    display: flex;
    flex-direction: column;
    gap: .6em;
    display: flex;
    padding-bottom: .5em;
    font-size: 1rem;

    @media(max-width: 900px) {
        width: 100%;
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

const MessagesContainer = styled.div`
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1.1em;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
    width: .5em;
    }

    /* Track */

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: .4em;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`

const MessageRow = styled.div`
    display: flex;
    padding-inline: 1em;
    flex-direction: ${({byMe}) => byMe ? 'row-reverse' : 'row'};
    width: 80%;
    align-self: ${({byMe}) => byMe ? 'flex-end' : 'flex-start'};
    align-items: center;
    gap: .6em;

    @media(max-width: 1000px) {
        width: 100%;
    }
`

const ProfilePic = styled.img`
    width: 2em;
    height: 2em;
    border-radius: 1.1em;
    object-fit: cover;
`



const MessageContent = styled.p`
    font-size: .75em;
    background-color: ${({theme, byMe}) => byMe ? theme.mainColor : '#dee3e3'};
    color: ${({byMe}) => byMe ? 'white' : 'black'};
    padding: .6em .8em;
    border-radius: .4em;

`

const MessageAt = styled.h5`
    font-size: .6em;
    color: gray;

    @media(max-width: 1000px) {
        font-size: 9px
    }
`

const MessageTitle = styled.div`
    display: flex;
    align-items: center;
    gap: .4em;
    background: white;
    border-bottom: .05em solid rgba(0, 0, 0, .1);
    padding: .5em 1em;
    cursor: pointer;

    img {
        width: 2.4em;
        height: 2.4em;
        border-radius: 1.1em;
        object-fit: cover;
    }

    h5 {
        color: ${({theme}) => theme.mainColor};
    }
`

const AddMessage = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: .6em;
`

const MessageField = styled.input`
    border: 1px solid rgba(0, 0, 0, .1);
    outline: none;
    border-radius: .6em;
    padding: .4em .95em;
    width: 85%;
    font-size: .8em;
`

const AddMessageButton = styled.input`
    outline: none;
    border: none;
    color: white;
    background-color: ${({theme}) => theme.mainColor};
    padding: .4em .95em;
    border-radius: .8em;
    font-size: .8em;
    cursor: pointer;
`

const CantReply = styled.h3`
    font-size: .85em;
    text-align: center;
    padding-block: .3em;
    color:  white;
    font-weight: lighter;
    background: crimson;
`