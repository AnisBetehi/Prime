import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
import {AiOutlineMessage} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';


const Header = () => {

    const navigate = useNavigate();

  return (
    <Container>
        <Logo>
            <span onClick={() => navigate('/')}>Prime</span>
        </Logo>
        <NavLinks>
            <AiOutlineMessage onClick={() => navigate('/messages')} />
            <CgProfile onClick={() => navigate('/profile')} />
        </NavLinks>
        <Signout onClick={() => {auth.signOut()}}>Sign out</Signout>
    </Container>
  )
}

export default Header;


const Container = styled.header`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    position: sticky;
    top: 0;
    padding-inline: 5vw;
    padding-block: 1em;
    border-bottom: .05em solid rgba(0, 0, 0, .1);
    gap: 1em;
    z-index: 1000;
    font-size: 1rem;

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

const Logo = styled.h1`
    font-size: 1.3em;
    color: ${({theme}) => theme.mainColor};
    user-select: none;
    flex: 1;

    span {
        cursor: pointer;
    }
`

const Signout = styled.button`
    background-color: ${({theme}) => theme.mainColor};
    color: white;
    padding: .4em 1em;
    outline: none;
    border: none;
    border-radius: .4em;
    font-size: .75em;
    cursor: pointer;

    @media(max-width: 800px) {
        font-size: 10px;
        padding-block: 7px;
        width: 100px;
    }
`

const NavLinks = styled.nav`
    display: flex;
    gap: 15px;
    
    svg {
        font-size: 25px;
        cursor: pointer;
        color: ${({theme}) => theme.mainColor};
    }

    @media(min-width: 900px) {
        display: none;
    }
`