import React, {useEffect} from 'react';
import styled from 'styled-components';
import Post from './Post';
import { useGetPosts } from '../../Hooks/useGetPosts';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../features/posts';

const Posts = () => {

    const [posts, loading] = useGetPosts();
    const dispatch = useDispatch();
    const {posts: postsState} = useSelector(state => state);

    useEffect(() => {
      dispatch(setPosts([...posts.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds)]));
    }, [posts])
    

  return (
    <Container>
       {!loading && postsState?.map(post => {
           return (
               <Post key={post.postId} postId={post.postId} timestamp={post.timeStamp} userId={post.userId} likes={post.likes} userName={post.userName} userImg={post.userImg} userId={post.userId} img={post.imgUrl} text={post.text}/>
           )
       })}
    </Container>
  )
}

export default Posts;


const Container = styled.section`
    width: 100%;
    min-height: 40vh;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 40px;
`