import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom';
import { BsGlobe } from 'react-icons/bs';
import {AiOutlineMessage} from 'react-icons/ai';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Posts from '../Newsfeed/Posts';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const OthersProfile = () => {

    const {user, allUsers} = useSelector(state => state);
    const {id} = useParams();
    const [website, setWebsite] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    
    const getUserInfo = async () => {
        const info = allUsers.filter(user => user.userId === id);
        if (info) {
            setWebsite(info[0].website || '');
            setAboutMe(info[0].aboutMe || '');
            setProfilePicture(info[0].photo);
            setName(info[0].name);
        }   

    }

    useEffect(() => {
        getUserInfo();
    }, [id, allUsers])
    

    if (user.userId === id) return <Navigate to='/profile' />;

  return (
    <Container>
    <ProfileTitle>      
        <img src={profilePicture} alt="" />
        <div>
            <h2>{name}</h2>
        {website && 
            <div>
                <BsGlobe />
                <a target='_blank' href={`https://${website}`}>{website}</a>
            </div>
            }
          {aboutMe && 
            <About>
                <h5>About me</h5>
                <p>{aboutMe}</p>
            </About>
            }
        </div>
        <AiOutlineMessage className='message' onClick={() => navigate(`/messages/${id}`)}/>
    </ProfileTitle>
    <MyPosts>Posts</MyPosts>
    <Posts userId={id} />
</Container>
  )
}

export default OthersProfile

const Container = styled.section`
    min-height: 100vh;
    width: max(50vw, 600px);
    display: flex;
    flex-direction: column;
    gap: .4em;
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
        font-size: 3.7rem;
    }

`

const ProfileTitle = styled.div`
    display: flex;
    gap: 1.1em;
    background-color: white;
    padding: 1em;
    border-radius: .6em;
    position: relative;
    overflow: hidden;

    img {
        width: 12.8em;
        height: 12.8em;
        object-fit: cover;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: .4em;
        max-width: 50%;

        h2 {
            font-size: 1em;
            color: ${({theme}) => theme.mainColor};
        }

        > div:first-of-type {
            display: flex;
            gap: .4em;
            align-items: center;
            

            a {
                text-decoration: none;
                font-size: .8em;
                font-weight: bolder;
                color: ${({theme}) => theme.mainColor};
            }

            svg {
                color: ${({theme}) => theme.mainColor};
                font-size: .8em;
            }


        }
    }

   .message {
        position: absolute;
        top: .4em;
        right: .4em;
        padding: 5px 10px;
        font-size: 2.6em;
        color:  ${({theme}) => theme.mainColor};
        cursor: pointer;
   }

    @media(max-width: 700px) {
        flex-direction: column;
        align-items: center;

        > div:not(:last-child) {
            max-width: 100%;

            h2 {
                text-align: center;
                margin-bottom: 20px;
            }
        }
    }

`

const MyPosts = styled.h4`
    background: white;
    padding: .4em;
    border-radius: .4em;
    font-size: .85em;
    text-align: center;
`

const About = styled.div`
    display: flex
    flex-direction: column;
    margin-top: .4em;

    h5 {
        font-size: .85em;
    }

    p {
        font-size: .8em;
        margin-top: .4em;
    }
`





