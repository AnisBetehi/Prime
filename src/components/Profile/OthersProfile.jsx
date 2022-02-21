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

    const {user} = useSelector(state => state);
    const {id} = useParams();
    const [website, setWebsite] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    
    const getUserInfo = async () => {
        const profileRef = doc(db, 'users', id);
        const info = await getDoc(profileRef);
        setWebsite(info.data().website || '');
        setAboutMe(info.data().aboutMe || '')
        setProfilePicture(info.data().photo);
        setName(info.data().name)
        console.log(info.data())
    }

    useEffect(() => {
        getUserInfo();
    }, [id])
    

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
        <Message onClick={() => navigate('/messages')}><AiOutlineMessage/> Message</Message>
    </ProfileTitle>
    <MyPosts>Posts</MyPosts>
    <Posts userId={id} />
</Container>
  )
}

export default OthersProfile

const Container = styled.section`
    min-height: 100vh;
    width: 700px;
    display: flex;
    flex-direction: column;
    gap: 10px;

`

const ProfileTitle = styled.div`
    display: flex;
    gap: 20px;
    background-color: white;
    padding: 1rem;
    border-radius: 10px;
    position: relative;
    overflow: hidden;

    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 50%;

        h2 {
            font-size: 16px;
            color: ${({theme}) => theme.mainColor};
        }

        > div:first-of-type {
            display: flex;
            gap: 5px;
            align-items: center;
            

            a {
                text-decoration: none;
                font-size: 12px;
                font-weight: bolder;
                color: ${({theme}) => theme.mainColor};
            }

            svg {
                color: ${({theme}) => theme.mainColor};
                font-size: 12px;
            }


        }
    }

    @media(max-width: 500px) {
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
    padding: 10px;
    border-radius: 5px;
    font-size: 13px;
    text-align: center;
`

const About = styled.div`
    display: flex
    flex-direction: column;
    margin-top: 10px;

    h5 {
        font-size: 13px;
    }

    p {
        font-size: 12px;
        margin-top: 5px;
    }
`

const Message = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 5px 10px;
    font-size: 12px;
    background-color: ${({theme}) => theme.mainColor};
    outline: none;
    border: none;
    color: white;;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`




