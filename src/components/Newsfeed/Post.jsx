import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {AiOutlineLike, AiFillLike} from 'react-icons/ai';
import {AiOutlineDelete} from 'react-icons/ai';
import AddComment from './AddComment';
import ViewComments from './ViewComments';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Post = ({likes, comments, postId, timestamp, userId, userImg, userName, text, img}) => {
    const {user, allUsers} = useSelector(state => state);
    const [openComments, setOpenComments] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const navigate = useNavigate();


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

    const removePostFromCollection = async () => {
        setConfirmDeleteVisible(false);
        await deleteDoc(doc(db, "posts", postId));
    }
    
  return (
    <Container>
        <Title>
            <img onClick={() => navigate(`/users/${userId}`)} src={allUsers.find(user => user.userId === userId).photo} alt="" />
            <div>
                <h4 onClick={() => navigate(`/users/${userId}`)}>{userName}</h4>
                <h6>{moment(timestamp.seconds * 1000).fromNow()}</h6>
            </div>
            {userId === user.userId && <AiOutlineDelete onClick={() => setConfirmDeleteVisible(true)} className='remove-post' />}
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
        <h5 onClick={() => setOpenComments(true)}>View comments ({comments.length})</h5>
        {openComments && <ViewComments postId={postId} comments={comments} setOpenComments={setOpenComments} />}
        <AddComment setOpenComments={setOpenComments} postId={postId} comments={comments} />
        <ConfirmDelete visible={confirmDeleteVisible}>
                <h4>Are you sure ?</h4>
                <div>
                    <h6 onClick={() => removePostFromCollection()}>Delete</h6>
                    <h6 onClick={() => setConfirmDeleteVisible(false)}>Cancel</h6>
                </div>
        </ConfirmDelete>
    </Container>
  )
}

export default Post;

const Container = styled.div`
    width: 100%;
    min-height: 50px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1.9em;
    background: white;
    border-radius: .4em;

    > h5 {
        font-size: .75em;
        cursor: pointer;
        color: ${({theme}) => theme.mainColor};
        user-select: none;
    }
`

const Title = styled.div`

    display: flex;
    align-items: center;
    gap: .4em;

    > img {
        width: 2.3em;
        height: 2.3em;
        border-radius: 1.1em;
        object-fit: cover;
        cursor: pointer;
    }

    > div {
        > h4 {
            font-size: .85em;
            color: ${({theme}) => theme.mainColor};
            cursor: pointer;
        }

        > h6 {
            font-weight: 100;
            font-size: .6em;
        }
    }

    .remove-post {
        justify-self: end;
        font-size: 1.1em;
        margin-left: auto;
        cursor: pointer;
        color: gray;
        user-select: none;
    }
`

const PostBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.1em;

`

const PostText = styled.p`
    font-size: .75em;
    font-weight: 500;
`

const PostPhoto = styled.img`
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;

    @media(max-width: 700px) {
        height: 300px;
    }
`

const Likes = styled.div`
    display: flex;
    align-items: center;
    gap: .4em;
    transform: translateY(.4em);


    svg, h4 {
        color: gray;
        font-size: .85em;
        user-select: none;
    }

    svg {
        font-size: 1.2em;
        cursor: pointer;
    }

    .fill {
        color: ${({theme}) => theme.mainColor};
    }

`

const ConfirmDelete = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 400;
    display: flex;
    flex-direction: column;
    gap: .4em;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .5);
    backdrop-filter: blur(.4em);
    opacity: ${({visible}) => visible ? '1' : '0'};
    pointer-events: ${({visible}) => visible ? 'all' : 'none'};
    transition: .2s ease;

    > h4 {
        font-size: 1.1em;
        color: white;
    }

    > div {
        display: flex;
        gap: 1.2em;

        h6 {
            font-size: .8em;
            padding: .4em .9em;
            border-radius: .4em;
            background: ${({theme}) => theme.mainColor};
            color: white;
            font-weight: 200;
            cursor: pointer;
        }

        h6:first-child {
            color: white;
            background: red;
        }
    }
`