import React from 'react';
import styled from 'styled-components';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { Routes, Route } from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed';
import PersonalProfile from '../Profile/PersonalProfile';
import OthersProfile from '../Profile/OthersProfile';
import Messages from '../Messages/Messages';
import Chatbox from '../Messages/Chatbox';

const Layout = () => {


  return (
    <Container>
        <LeftSideBar />
        <Routes>
            <Route path='/' element={<Newsfeed />} />
            <Route path='/profile' element={<PersonalProfile />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/messages/:id' element={<Chatbox />} />
            <Route path='/users/:id' element={<OthersProfile />} />
        </Routes>
    </Container>
  )
}

export default Layout;

const Container = styled.section`
    width: 100vw;
    min-height: 100vh;
    padding-block: 1em;
    padding-inline: 1em;
    display: flex;
    justify-content: center;
    gap: 3em;

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
        font-size: 4rem;
    }
`