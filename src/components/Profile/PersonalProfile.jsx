import { updateProfile } from 'firebase/auth';
import { getDoc, updateDoc, setDoc } from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {AiOutlineEdit, AiOutlineClose} from 'react-icons/ai';
import { changeProfilePhoto } from '../../features/userSlice';
import { auth, db } from '../../firebase/config';
import { doc } from 'firebase/firestore';
import useStorage from '../../Hooks/useStorage';
import Posts from '../Newsfeed/Posts';
import {BsGlobe} from 'react-icons/bs';
import { updateCurrentUserProfile } from '../../features/userSlice';

const PersonalProfile = () => {

    const {user, allUsers} = useSelector(state => state);
    const [selectedImg, setSelectedImg] = useState('');
    const [url, loading] = useStorage(selectedImg);
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [website, setWebsite] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    const dispatch = useDispatch();

    const updateProfilePhoto = async (url) => {
        await updateProfile(auth.currentUser, {
            photoURL: url
        })
        dispatch(changeProfilePhoto(url));
        await setDoc(doc(db, 'users', user.userId), {
            photo: url
        }, {merge: true})
    }


    const getProfileInfo = async () => {
        const info = allUsers.filter(inf => inf.userId === user.userId);
        if (info) {
            setWebsite(info[0].website || '');
            setAboutMe(info[0].aboutMe || '');
        }   
    }

    const closeEdit = () => {
        setOpenEditProfile(false);
    }

    const updateProfileInfo = async (e) => {
        e.preventDefault();
        await setDoc(doc(db, 'users', user.userId), {
            website,
            aboutMe
        }, {merge: true})
        dispatch(updateCurrentUserProfile({website, aboutMe}));
        closeEdit()
    }

    useEffect(() => {
        getProfileInfo();
        if (url.length > 0) updateProfilePhoto(url);
        setSelectedImg('');
    }, [url, allUsers])
    
    
  return (
    <Container>
        <ProfileTitle>     
            <input id='file' accept="image/*" onChange={(e) => setSelectedImg(e.target.files[0])} style={{display: 'none'}} type="file" />  
            {!loading ?  
            <UploadImg htmlFor='file' loading={loading}>
                <div>
                    <img src={user.photo} alt="" />
                    <div className='overlay'>
                        Change Picture
                    </div>
                </div>     
            </UploadImg>
            :
            <UploadingImg>Uploading image...</UploadingImg>
            }         
            <div>
                <h2>{user.userName}</h2>
                {website && <div>
                    <BsGlobe />
                    <a target='_blank' href={`https://${website}`}>{website}</a>
                </div>}
               {aboutMe && <About>
                    <h5>About me</h5>
                    <p>{aboutMe}</p>
                </About>}
            </div>
            <AiOutlineEdit onClick={() => setOpenEditProfile(true)} className='edit-profile' />
            <EditProfile visible={openEditProfile}>
                <EditTitle>
                    <h5>Edit Profile</h5>
                    <AiOutlineClose onClick={closeEdit} />
                </EditTitle>
                <form onSubmit={updateProfileInfo}>
                    <div>
                        <label htmlFor="website">Website</label>
                        <input value={website} onChange={(e) => setWebsite(e.target.value)} id='website' type="text" />
                    </div>

                    <div>
                        <label htmlFor="about-me">About me</label>
                        <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} id='about-me' maxlength='200' />
                    </div>
                    <input type="submit" value='save' />
                </form>
            </EditProfile>
        </ProfileTitle>
        <MyPosts>My Posts</MyPosts>
        <Posts userId={user.userId} />
    </Container>
    )
}

export default PersonalProfile;


const Container = styled.section`
    min-height: 100vh;
    width: max(50vw, 600px);
    display: flex;
    flex-direction: column;
    gap: .4em;
    font-size: 1rem;

    @media(max-width: 900px) {
        width: 100%;
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

const ProfileTitle = styled.div`
    display: flex;
    gap: 1.3em;
    background-color: white;
    padding: 1em;
    border-radius: .6em;
    position: relative;
    min-height: 16em;

    > div:not(:last-child) {
        display: flex;
        flex-direction: column;
        gap: .6em;
        max-width: 50%;

        h2 {
            font-size: .9em;
            color: ${({theme}) => theme.mainColor};
        }

        > div:first-of-type {
            display: flex;
            gap: .4em;
            align-items: center;
            

            a {
                text-decoration: none;
                font-size: .75em;
                font-weight: bolder;
                color: ${({theme}) => theme.mainColor};
            }

            svg {
                color: ${({theme}) => theme.mainColor};
                font-size: .75em;
            }


        }
    }

    .edit-profile {
        font-size: 1.5em;
        cursor: pointer;
        color: ${({theme}) => theme.mainColor};
        position: absolute;
        top: 1em;
        right: 1em;
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

const About = styled.div`
    display: flex
    flex-direction: column;
    margin-top: .6em;

    h5 {
        font-size: .85em;
    }

    p {
        font-size: .75em;
        margin-top: .4em;
    }
`

const UploadImg = styled.label`

    div {
        width: 12.8em;
        height: 12.8em;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
       
       .overlay {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .9em;
            background-color: rgba(0, 0, 0, .5);
            color: white;
            font-weight: bolder;
            opacity: 0;
            position: absolute;
            pointer-events: none;
            cursor: pointer;
            backdrop-filter: blur(.4em);
            top: 0;
            left: 0;
            transition: .2s ease;

        }

        &:hover .overlay {
            opacity: 1;
            pointer-events: all;
        }
    }

    pointer-events: ${({loading}) => loading ? 'none' : 'all'};


`

const UploadingImg = styled.div`
    width: 12.8em;
    height: 12.8em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .9em;
    font-weight: bold;
    background: rgba(0, 0, 0, .5);
    color: white;
`

const MyPosts = styled.h4`
    background: white;
    padding: .6em;
    border-radius: .4em;
    font-size: .8em;
    text-align: center;
`

const EditProfile = styled.div`
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, .8);
    backdrop-filter: blur(10px);
    padding: 1em 2em;
    transition: .2s ease;
    opacity: ${({visible}) => visible ? '1' : '0'};
    pointer-events: ${({visible}) => visible ? 'all' : 'none'};

    > form {
        display: flex;
        flex-direction: column;
        margin-top: .4em;
        gap: .4em;

        > div {
            display: flex;
            flex-direction: column;
            gap: .4em;

            > label {
                font-size: .8em;
                font-weight: bold;
            }

            > input {
                width: 35%;
                height: 2.8em;
            }

            > input, textarea {
                padding: .5em 1em;
                outline: none;
                border: .05em solid rgba(0, 0, 0, .2);
                border-radius: .4em;
                box-shadow: 0px 0px 1.1em rgba(0, 0, 0, .1);
                resize: none;
                font-size: .8em;
            }
        }

        > input {
            outline: none;
            border: none;
            color: white;
            padding: .4em .95em;
            background-color: ${({theme}) => theme.mainColor};
            border-radius: .4em;
            cursor: pointer;
            max-width: 6.5em;
            align-self: flex-end;
            margin-top: .6em;
            font-size: .75em;
        }
    }
`

const EditTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    > h5 {
        font-size: 1em;
        color: ${({theme}) => theme.mainColor};
    }
    > svg {
        cursor: pointer;
        font-size: 1.15em;
        user-select: none;
    }

`