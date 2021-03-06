import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {ImAttachment} from 'react-icons/im';
import {BsFillImageFill} from 'react-icons/bs';
import styled from 'styled-components';
import useStorage from '../../Hooks/useStorage';
import { doc, setDoc} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { v4 as uuidv4 } from 'uuid';

const AddPost = () => {

    const {user} = useSelector(state => state);
    const [post, setPost] = useState('');
    const [selectedImg, setSelectedImg] = useState();
    const [url, loading] = useStorage(selectedImg);

    const addPostToCollection = async () => {
        if (post.length < 10 && !url) return;
        if (selectedImg) {
            await setDoc(doc(db, "posts", uuidv4()), {
                text: post,
                userId: user.userId,
                userImg: user.photo,
                userName: user.userName,
                likes: [],
                comments: [],
                timeStamp: new Date(),
                imgUrl: url
              });
        } else {
            await setDoc(doc(db, "posts", uuidv4()), {
                text: post,
                userId: user.userId,
                userImg: user.photo,
                userName: user.userName,
                likes: [],
                comments: [],
                timeStamp: new Date()
              });
        }
          setPost('');
          setSelectedImg('');
    }

    const cancelImgUpload = () => {
        setSelectedImg('');
    }

  return (
    
    <OuterContainer>
        <Container >
            <ProfilePicture src={user.photo} alt="" />
            <InputField value={post} onChange={(e) => setPost(e.target.value)} placeholder={`What's on your mind, ${user.userName}`} type='text'/>
            <PostButton loading={loading} onClick={() => {addPostToCollection()}}><ImAttachment />{loading ? 'Loading' : ' Post it!'}</PostButton>
        </Container>
        {!url ?
        <InsertImg loading={loading}>
            <label htmlFor='file'> <BsFillImageFill />{loading ? 'Loading' : 'Attach an image'}</label>
            <input id='file' accept="image/*" onChange={(e) => setSelectedImg(e.target.files[0])} style={{display: 'none'}} type="file" />
        </InsertImg> : <RemoveImg onClick={cancelImgUpload}><h4>Remove Image</h4></RemoveImg>}
    </OuterContainer>
  )
}

export default AddPost;

const OuterContainer = styled.div`
    position: relative;
`

const Container = styled.div`
    width: 100%;
    min-height: 3.1em;
    background: white;
    border-radius: .4em;
    display: flex;
    align-items: center;
    position: relative;
    padding-inline: 1em;
    z-index: 10;

`

const ProfilePicture = styled.img`
    width: 2em;
    height: 2em;
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

    @media(max-width: 700px) {
        flex: 0;
    }

`

const PostButton = styled.button`
    background-color: ${({loading, theme}) => loading ? 'gray' : theme.mainColor};
    outline: none;
    border: none;
    color: white;
    padding: .35em 1em;
    border-radius: .4em;
    font-weight: bold;
    font-size: .7em;
    cursor: pointer;
    pointer-events: ${({loading}) => loading ? 'none' : 'all'};
    margin-left: auto;

    @media(max-width: 600px) {
        font-size: 10px;
        padding: 5px 10px;
    }
`

const InsertImg = styled.div`
    width: 100%;
    display: flex;
    padding-block: .5em;
    justify-content: center;
    align-items: center;
    gap: .4em;
    color: gray;
    background: white;
    cursor: pointer;
    pointer-events: ${({loading}) => loading ? 'none' : 'all'};
    transform: translateY(-5px);
    border-radius: 0 0 .6em .6em;
    transition: .5s ease;
    z-index: 1;

    label {
        font-size: .75em;
        display: flex;
        align-items: center;
        gap: .6em;
        height: 100%;
        cursor: pointer;
        pointer-events: ${({loading}) => loading ? 'none' : 'all'};
    }

    svg {
        display: ${({loading}) => loading ? 'none' : 'block'};
    }


`

const RemoveImg = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    padding-block: .6em;
    transform: translateY(-5px);
    border-radius: 0 0 .6em .6em;
    cursor: pointer;

    h4 {
        color: ${({theme}) => theme.mainColor};
        font-size: .75em;
    }
`