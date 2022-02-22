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

    > div:not(:last-child) {
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

    .edit-profile {
        font-size: 20px;
        cursor: pointer;
        color: ${({theme}) => theme.mainColor};
        position: absolute;
        top: 20px;
        right: 20px;
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
    margin-top: 10px;

    h5 {
        font-size: 13px;
    }

    p {
        font-size: 12px;
        margin-top: 5px;
    }
`

const UploadImg = styled.label`

    div {
        width: 200px;
        height: 200px;
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
            font-size: 14px;
            background-color: rgba(0, 0, 0, .5);
            color: white;
            font-weight: bolder;
            opacity: 0;
            position: absolute;
            pointer-events: none;
            cursor: pointer;
            backdrop-filter: blur(5px);
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
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    background: rgba(0, 0, 0, .5);
    color: white;
`

const MyPosts = styled.h4`
    background: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 13px;
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
    padding: 1rem 2em;
    transition: .2s ease;
    opacity: ${({visible}) => visible ? '1' : '0'};
    pointer-events: ${({visible}) => visible ? 'all' : 'none'};

    > form {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        gap: 5px;

        > div {
            display: flex;
            flex-direction: column;
            gap: 5px;

            > label {
                font-size: 12px;
                font-weight: bold;
            }

            > input {
                width: 200px;
                height: 30px;
            }

            > input, textarea {
                padding: .5rem 1rem;
                outline: none;
                border: .3px solid rgba(0, 0, 0, .2);
                border-radius: 5px;
                box-shadow: 0px 0px 20px rgba(0, 0, 0, .1);
                resize: none;
                font-size: 12px;
            }
        }

        > input {
            outline: none;
            border: none;
            color: white;
            padding: 5px 15px;
            background-color: ${({theme}) => theme.mainColor};
            border-radius: 5px;
            cursor: pointer;
            max-width: 90px;
            align-self: flex-end;
            margin-top: 10px;
        }
    }
`

const EditTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    > h5 {
        font-size: 16px;
        color: ${({theme}) => theme.mainColor};
    }
    > svg {
        cursor: pointer;
        font-size: 20px;
        user-select: none;
    }

`