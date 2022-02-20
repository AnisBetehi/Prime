import React from 'react';
import styled from 'styled-components';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { Routes, Route } from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed';

const Layout = () => {
  return (
    <Container>
        <LeftSideBar />
        <Routes>
            <Route path='/settings' element={<h1>Hey</h1>} />
            <Route path='/' element={<Newsfeed />} />
            <Route path='/profile' element={<h1>profile</h1>} />
            <Route path='/messages' element={<h1>messages</h1>} />
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