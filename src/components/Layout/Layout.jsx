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
    padding-block: 1rem;
    padding-inline: 2rem;
    display: flex;
    justify-content: center;
    gap: 3rem;
`