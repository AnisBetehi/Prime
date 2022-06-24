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
    width: max(50vw, 600px);
    display: flex;
    flex-direction: column;
    gap: .6em;
    font-size: 1rem;

    @media(max-width: 900px) {
      width: 100%;
    }

    @media(min-width: 1700px) {
        font-size: 1.3rem;
    }

    @media(min-width: 2000px) {
        font-size: 1.9rem;
    }

    @media(min-width: 2800px) {
        font-size: 2.7rem;
    }

    @media(min-width: 4000px) {
        font-size: 3rem;
    }

    @media(min-width: 5000px) {
        font-size: 3.7rem;
    }
`