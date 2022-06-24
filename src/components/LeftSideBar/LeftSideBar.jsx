import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {AiOutlineMessage} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import {BiNews} from 'react-icons/bi';
import styled, {css} from 'styled-components';
import { useDispatch } from 'react-redux';
import { setVisibleComponent } from '../../features/ui';
import { useNavigate, useLocation } from 'react-router-dom';

const LeftSideBar = () => {

    const {user, ui} = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation()

    const handleClick = (path) => {
        path === 'News Feed' ? navigate('/') : navigate(`/${path.toLowerCase()}`);   
    }

    useEffect(() => {
        if (location.pathname != '/') {
            dispatch(setVisibleComponent(location.pathname.replace('/', '')))
        } else {
            dispatch(setVisibleComponent('News Feed'));
        }
     
    }, [location.pathname])


    const settingsArray = [[<CgProfile />, <h4>Profile</h4>], [<AiOutlineMessage />, <h4>Messages</h4>], [<BiNews />,  <h4>News Feed</h4>]];

  return (

    <Container>
        <Profile>
            <Photo src={user.photo} />
            <h4>{user.userName}</h4>
        </Profile>
        <Settings>

            {settingsArray.map((setting, index) => {
                return (
                    <SettingContainer onClick={() => handleClick(setting[1].props.children)} isSelected={ui.visibleComponent.toLowerCase() == setting[1].props.children.toLowerCase()} key={index}>
                        {setting[0]}
                        {setting[1]}
                    </SettingContainer>
                )
            })     
            }


        </Settings>
    </Container>
  )
}

export default LeftSideBar;


const Container = styled.aside`
    width: max(20%, 250px);
    border-radius: .6em;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 1rem;

    @media(max-width: 900px) {
        display: none;
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

const Profile = styled.div`
    display: flex;
    padding-left: 2em;
    min-height: 6vw;
    border-radius: .6em;
    gap: .6em;
    align-items: center;
    background: white;

    > h4 {
        font-size: .9em;
    }

    > h4:first-letter {
        text-transform: capitalize;
    }

    @media(max-width: 900px) {
        display: none;
    }
`

const Photo = styled.img`
    width: 2.4em;
    height: 2.4em;
    border-radius: 1em;
    object-fit: cover;
`

const Settings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: .6em;
    box-shadow: 0 0 .35em rgba(0, 0, 0, .1);

    > div:not(:last-child) {
            border-bottom: .1em solid #dfe2e6;   
    }

`

const SettingContainer = styled.div`
    width: 100%;
    padding-left: 2em;
    display: flex;
    align-items: center;
    gap: .6em;
    height: 3.45em;
    cursor: pointer;
    transition: .2s ease;

    > svg {
        color: gray;
        font-size: 1.3em;
        user-select: none;
    }

    > h4 {
        font-size: .75em;
        color: ${({theme}) => theme.accent};
        user-select: none;
    }

    ${({isSelected}) => isSelected && css`
        background: ${({theme}) => theme.mainBg};
        border-left: .27em solid ${({theme}) => theme.mainColor};
            
        > svg, > h4 {
            color: ${({theme}) => theme.mainColor};
        }
    `}
`