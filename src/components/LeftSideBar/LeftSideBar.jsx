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
    width: 300px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media(max-width: 900px) {
        display: none;
    }
`

const Profile = styled.div`
    display: flex;
    padding-left: 2rem;
    height: 100px;
    border-radius: 10px;
    gap: 10px;
    align-items: center;
    background: white;

    > h4 {
        font-size: 14px;
    }

    > h4:first-letter {
        text-transform: capitalize;
    }

    @media(max-width: 900px) {
        display: none;
    }
`

const Photo = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 20px;
    object-fit: cover;
`

const Settings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);

    > div:not(:last-child) {
            border-bottom: 1px solid #dfe2e6;   
    }

`

const SettingContainer = styled.div`
    width: 100%;
    padding-left: 2rem;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 55px;
    cursor: pointer;
    transition: .2s ease;

    > svg {
        color: gray;
        font-size: 22px;
        user-select: none;
    }

    > h4 {
        font-size: 12px;
        color: ${({theme}) => theme.accent};
        user-select: none;
    }

    ${({isSelected}) => isSelected && css`
        background: ${({theme}) => theme.mainBg};
        border-left: 4px solid ${({theme}) => theme.mainColor};
            
        > svg, > h4 {
            color: ${({theme}) => theme.mainColor};
        }
    `}
`