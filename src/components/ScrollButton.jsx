import React from 'react';
import styled, {keyframes} from 'styled-components';
import {IoIosArrowUp} from 'react-icons/io';

const ScrollButton = () => {
  return (
    <Button onClick={() => window.scrollTo(0, 0)}>
        <IoIosArrowUp />
    </Button>
  )
}

export default ScrollButton;

const Bounce = keyframes`
    from {
        transform: translateY(0px);
    }

    to {
        transform: translateY(10px);
    }
`

const Button = styled.div`
    position: fixed;
    bottom: 3rem;
    right: 5rem;
    background-color: ${({theme}) => theme.mainColor};
    height: 50px;
    width: 50px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .2);
    animation: ${Bounce} .5s infinite alternate;
    z-index: 20;

    svg {
        font-size: 1.5rem;
        color: white;
    }


    @media(max-width: 1000px) {
        right: 2rem;
        bottom: 2rem;

        svg {
            color: white;
        }
    }
`
