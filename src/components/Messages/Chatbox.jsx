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
    width: 700px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    display: flex;
    padding-bottom: .5rem;
   
`

const MessagesContainer = styled.div`
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
    width: 7px;
    }

    /* Track */

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`

const MessageRow = styled.div`
    display: flex;
    padding-inline: 1rem;
    flex-direction: ${({byMe}) => byMe ? 'row-reverse' : 'row'};
    width: 80%;
    align-self: ${({byMe}) => byMe ? 'flex-end' : 'flex-start'};
    align-items: center;
    gap: 10px;

    @media(max-width: 1000px) {
        width: 100%;
    }
`

const ProfilePic = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 20px;
    object-fit: cover;
`



const MessageContent = styled.p`
    font-size: 12px;
    background-color: ${({theme, byMe}) => byMe ? theme.mainColor : '#dee3e3'};
    color: ${({byMe}) => byMe ? 'white' : 'black'};
    padding: 5px 10px;
    border-radius: 5px;

`

const MessageAt = styled.h5`
    font-size: 10px;
    color: gray;

    @media(max-width: 1000px) {
        font-size: 9px
    }
`

const MessageTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    background: white;
    border-bottom: .1px solid rgba(0, 0, 0, .1);
    padding: .5rem 1rem;
    cursor: pointer;

    img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
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
    gap: 10px;
`

const MessageField = styled.input`
    border: 1px solid rgba(0, 0, 0, .1);
    outline: none;
    border-radius: 10px;
    padding: 5px 15px;
    width: 85%;
    font-size: 12px;
`

const AddMessageButton = styled.input`
    outline: none;
    border: none;
    color: white;
    background-color: ${({theme}) => theme.mainColor};
    padding: 5px 15px;
    border-radius: 12px;
    font-size: 12px;
    cursor: pointer;
`

const CantReply = styled.h3`
    font-size: 13px;
    text-align: center;
    padding-block: .3rem;
    color:  white;
    font-weight: lighter;
    background: crimson;
`