import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {AiOutlineLike, AiFillLike} from 'react-icons/ai';
import {BsThreeDots} from 'react-icons/bs';
import AddComment from './AddComment';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import moment from 'moment';

const Post = ({likes, postId, timestamp, userId, userImg, userName, text, img}) => {
    const {user} = useSelector(state => state);


    const addLike = async () => {
        console.log( user.userName, user.userId, user.photo, postId)

        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            likes: [...likes, {user: user.userName, userId: user.userId, photo: user.photo }]
        });  
    }   

    const removeLike = async () => {


        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            likes: [...likes.filter(like => like.userId != user.userId)]
        }); 
    }
    
  return (
    <Container>
        <Title>
            <img src={userImg} alt="" />
            <div>
                <h4>{userName}</h4>
                <h6>{moment(timestamp.seconds * 1000).fromNow()}</h6>
            </div>
            {userId === user.userId && <BsThreeDots className='edit-post' />}
        </Title>
        <PostBody>
            <PostText>
                {text}
            </PostText>
            {img && <PostPhoto src={img}/>}
        </PostBody>
        <Likes>
            {likes.find(like => like.userId === user.userId) ? <AiFillLike onClick={removeLike} className="fill" /> : <AiOutlineLike className="outline" onClick={addLike} />}
            <h4>{likes.length}</h4>
        </Likes>
        <AddComment />
    </Container>
  )
}

export default Post;

const Container = styled.div`
    width: 100%;
    min-height: 50px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background: white;
    border-radius: 5px;
`

const Title = styled.div`

    display: flex;
    align-items: center;
    gap: 10px;

    > img {
        width: 35px;
        height: 35px;
        border-radius: 20px;
        object-fit: cover;
    }

    > div {
        > h4 {
            font-size: 14px;
            color: ${({theme}) => theme.mainColor};
            cursor: pointer;
        }

        > h6 {
            font-weight: 100;
            font-size: 10px;
        }
    }

    .edit-post {
        justify-self: end;
        font-size: 20px;
        margin-left: auto;
        cursor: pointer;
        color: gray;
        user-select: none;
    }
`

const PostBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

`

const PostText = styled.p`
    font-size: 12px;
    font-weight: 500;
`

const PostPhoto = styled.img`
    width: 100%;
    height: 400px;
    object-fit: cover;
`

const Likes = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;


    svg, h4 {
        color: gray;
        font-size: 14px;
    }

    svg {
        font-size: 20px;
        cursor: pointer;
    }

    .fill {
        color: ${({theme}) => theme.mainColor};
    }

`