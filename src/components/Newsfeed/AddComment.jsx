import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { v4 as uuidv4 } from 'uuid';

const AddComment = ({postId, setOpenComments, comments}) => {

    const {user} = useSelector(state => state);
    const [comment, setComment] = useState('');

    const clearField = () => {
        setComment('');
    }

    const addComment = async () => {
        if (comment.length === 0) return;
        console.log(typeof comments)
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            comments: [...comments, {user: user.userName, userId: user.userId, photo: user.photo, text: comment, timeStamp: new Date(), commentId: uuidv4()}]
        });  
        clearField();
        setOpenComments(true);
    }   

  return (
    <Container >
        <ProfilePicture src={user.photo} alt="" />
        <InputField value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Comment on this post' type='text'/>
        <PostButton onClick={addComment}>Comment</PostButton>
    </Container>
  )
}

export default AddComment;


const Container = styled.div`
    width: 100%;
    min-height: 1.8em;
    background: white;
    border-radius: .4em;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;

`

const ProfilePicture = styled.img`
    width: 1.6em;
    height: 1.6em;
    object-fit: cover;
    border-radius: 1.1em;
`

const InputField = styled.input`
    background: transparent;
    outline: none;
    border: none;
    flex: 1;
    padding-left: 1em;
    font-size: .7em;

`

const PostButton = styled.button`
    background-color: ${({theme}) => theme.mainColor};
    outline: none;
    border: none;
    color: white;
    padding: .4em 1em;
    border-radius: .4em;
    font-size: .7em;
    cursor: pointer;
`