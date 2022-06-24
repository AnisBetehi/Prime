import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import {GrClose} from 'react-icons/gr';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';


const ViewComments = ({comments, postId, setOpenComments}) => {

    const {user, allUsers} = useSelector(state => state);
    const [organizedComments, setOrganizedComments] = useState([]);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [removedCommentId, setRemovedCommentId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        comments?.length > 0 && setOrganizedComments([...comments].sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds));
    }, [comments])
    

    const removeComment = async (commentId) => {
        setConfirmDeleteVisible(false);
        const postRef = doc(db, "posts", postId);

        await updateDoc(postRef, {
            comments: [...comments.filter(comment => comment.commentId != commentId)]
        }); 
        setRemovedCommentId('');
    }

  return (
    <Container>
        <CommentsContainer>
            <Title>
                <h5>Comments</h5>
                <GrClose onClick={() => setOpenComments(false)} />
            </Title>        
            {comments.length > 0 ? 
            <InnerCommentsContainer>
                    {organizedComments.map(comment => {
                        return (
                            <CommentRow myComment={comment.userId === user.userId} key={uuidv4()}>
                                <img onClick={() => navigate(`/users/${comment.userId}`)} src={allUsers.find(user => user.userId === comment.userId).photo} alt="" />
                                <div>
                                    <div>
                                        <h6 onClick={() => navigate(`/users/${comment.userId}`)}>{comment.user}</h6>
                                        <h5>{comment.timeStamp && moment(comment.timeStamp.seconds * 1000).fromNow()}</h5>
                                    </div>
                                    <p>{comment.text}</p>
                                </div>
                                {comment.userId === user.userId && 
                                    <AiOutlineDelete onClick={() => {
                                        setConfirmDeleteVisible(true)
                                        setRemovedCommentId(comment.commentId);
                                    }
                                    } className='remove-comment'/>
                                }
                            </CommentRow>
                        )
                    })}
            </InnerCommentsContainer>
            :         
            <NoCommentsYet>
                No comments yet
            </NoCommentsYet>
            }

            <ConfirmDelete visible={confirmDeleteVisible}>
                <h4>Are you sure ?</h4>
                <div>
                    <h6 onClick={() => removeComment(removedCommentId)}>Delete</h6>
                    <h6 onClick={() => setConfirmDeleteVisible(false)}>Cancel</h6>
                </div>
            </ConfirmDelete>
        </CommentsContainer>
    </Container>
  )
}

export default ViewComments;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .6);
    backdrop-filter: blur(5px);
    z-index: 1000;
`

const CommentsContainer = styled.div`
    width: max(40vw, 600px);
    height: max(40vw, 650px);
    background: white;
    padding: 1em 1.5em;
    padding-top: 0;
    position: relative;
    overflow: auto;
    border-radius: 10px;

    @media(max-width: 800px) {
        width: 100%;
        height: 80%;
    }
`

const Title = styled.div`
    width: 100%;
    display: flex;
    height: 3.1em;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;

    h5 {
        font-size: .95em;
    }

    svg {
        font-size: 1.1em;
        cursor: pointer;
    }
`

const InnerCommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.8em;
    margin-top: 3.1em;
`
const CommentRow = styled.div`
    display: flex;
    min-height: 3.3em;
    gap: .6em;
    width: 100%;

    > img {
        width: 1.8em;
        height: 1.8em;
        border-radius: 1.1em;
        object-filt: cover;
        cursor: pointer;
    }

    > div {
        max-width: 70%;

        > div {
            display: flex;
            gap: .4em;
            align-items: center;

            h5 {
                font-size: .6em;
                color: gray;
            }
        }

        h6 {
            font-size: .8em;
            color: ${({theme}) => theme.mainColor};
            cursor: pointer;
        }

        p {
            font-size: .8em;
            width: max-content;
            background-color: ${({theme, myComment}) => myComment ? theme.mainColor : theme.mainBg};
            color: ${({theme, myComment}) => myComment ? 'white' : theme.accent};
            border-radius: .6em;
            padding: .4em .7em;
            margin-top: .4em;
        }
    }

    .remove-comment {
        font-size: 1em;
        cursor: pointer;
        margin-left: auto;
    }

`

const NoCommentsYet = styled.h5`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: .8em;
`

const ConfirmDelete = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 30;
    display: flex;
    flex-direction: column;
    gap: .6em;
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
        gap: 1.8em;

        h6 {
            font-size: .8em;
            padding: .4em .7em;
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


