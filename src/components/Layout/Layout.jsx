import React from 'react';
import styled from 'styled-components';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { Routes, Route } from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed';
import PersonalProfile from '../Profile/PersonalProfile';
import { useSelector } from 'react-redux';
import OthersProfile from '../Profile/OthersProfile';

const Layout = () => {

  const {user} = useSelector(state => state);

  return (
    <Container>
        <LeftSideBar />
        <Routes>
            <Route path='/settings' element={<h1>Hey</h1>} />
            <Route path='/' element={<Newsfeed />} />
            <Route path='/profile' element={<PersonalProfile />} />
            <Route path='/messages' element={<h1>messages</h1>} />
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