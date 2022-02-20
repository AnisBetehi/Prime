import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AddComment = () => {

    const {user} = useSelector(state => state);
    const [comment, setComment] = useState('');


  return (
    <Container >
        <ProfilePicture src={user.photo} alt="" />
        <InputField value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Comment on this post' type='text'/>
        <PostButton>Comment</PostButton>
    </Container>
  )
}

export default AddComment;


const Container = styled.div`
    width: 100%;
    min-height: 30px;
    background: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;

`

const ProfilePicture = styled.img`
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 20px;
`

const InputField = styled.input`
    background: transparent;
    outline: none;
    border: none;
    flex: 1;
    padding-left: 1rem;
    font-size: 12px;

`

const PostButton = styled.button`
    background-color: ${({theme}) => theme.mainColor};
    outline: none;
    border: none;
    color: white;
    padding: 7px 1.3rem;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
`