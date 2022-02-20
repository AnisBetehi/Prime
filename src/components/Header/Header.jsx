import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Searchbar from './Searchbar';





const Header = () => {

    const {user} = useSelector(state => state);
    const navigate = useNavigate();


  return (
    <Container>
        <Logo>
            <span onClick={() => navigate('/')}>Prime</span>
        </Logo>
        <Searchbar />
        <ProfilePicture src={user.photo} />
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
    padding-block: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    gap: 20px;
    z-index: 1000;

`

const Logo = styled.h1`
    font-size: 20px;
    color: ${({theme}) => theme.mainColor};
    user-select: none;
    flex: 1;

    span {
        cursor: pointer;
    }
`

const ProfilePicture = styled.img`
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;
`