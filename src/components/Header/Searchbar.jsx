import React from 'react';
import styled from 'styled-components';
import {BiSearch} from 'react-icons/bi'

const Searchbar = () => {
  return (
    <Container>
        <BiSearch />
        <input placeholder='Search' type="text" />
    </Container>
  )
}

export default Searchbar;

const Container = styled.div`
    width: 250px;
    border-radius: 10px;
    background: ${({theme}) => theme.mainBg};
    padding: 5px;
    padding-inline: 10px;
    gap: 5px;
    display: flex;
    align-items: center;

    input {
        outline: none;
        border: none;
        font-size: 12px;
        background-color: transparent;
        flex: 1;
    }

    @media(max-width: 500px) {
        width: 200px;
    }
`