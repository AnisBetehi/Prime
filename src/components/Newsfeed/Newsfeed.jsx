import React from 'react';
import styled from 'styled-components';
import AddPost from './AddPost';
import Posts from './Posts';

const Newsfeed = () => {
  return (
    <Container>
        <AddPost />
        <Posts />
    </Container>
  )
}

export default Newsfeed;

const Container = styled.section`
    min-height: 100vh;
    width: 700px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`