import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {ImAttachment} from 'react-icons/im';
import {BsFillImageFill} from 'react-icons/bs';
import styled from 'styled-components';
import useStorage from '../../Hooks/useStorage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { v4 as uuidv4 } from 'uuid';

const AddPost = () => {

    const {user} = useSelector(state => state);
    const [post, setPost] = useState('');
    const [selectedImg, setSelectedImg] = useState();

    const addPostToCollection = async () => {
        if (post.length < 10) return;
        await setDoc(doc(db, "posts", uuidv4()), {
            text: post,
            userId: user.userId,
            userImg: user.photo,
            userName: user.userName,
            likes: [],
            comment: [],
            timeStamp: new Date(),
          });
          setPost('');
          setSelectedImg('');
    }


  return (
    
    <OuterContainer>
        <Container >
            <ProfilePicture src={user.photo} alt="" />
            <InputField value={post} onChange={(e) => setPost(e.target.value)} placeholder={`What's on your mind, ${user.userName}`} type='text'/>
            <PostButton onClick={() => {addPostToCollection()}}><ImAttachment /> Post it!</PostButton>
        </Container>
        {!selectedImg ?
        <InsertImg>
            <label htmlFor='file'> <BsFillImageFill /> Attach image</label>
            <input id='file' accept="image/*" onChange={(e) => setSelectedImg(e.target.files[0])} style={{display: 'none'}} type="file" />
        </InsertImg> : <RemoveImg onClick={() => setSelectedImg('')}><h4>Remove Image</h4></RemoveImg>}
    </OuterContainer>
  )
}

export default AddPost;

const OuterContainer = styled.div`
    position: relative;
`

const Container = styled.div`
    width: 100%;
    min-height: 50px;
    background: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
    padding-inline: 1rem;
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
    border-radius: 10px;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
`

const InsertImg = styled.div`
    width: 100%;
    display: flex;
    padding-block: .5rem;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: gray;
    background: white;
    cursor: pointer;
    transform: translateY(-5px);
    border-radius: 0 0 10px 10px;
    transition: .5s ease;
    z-index: 1;

    label {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        height: 100%;
        cursor: pointer;
    }
`

const RemoveImg = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    padding-block: 10px;
    transform: translateY(-5px);
    border-radius: 0 0 10px 10px;
    cursor: pointer;

    h4 {
        color: ${({theme}) => theme.mainColor};
        font-size: 12px;
    }
`