import React, {useState} from 'react';
import styled from 'styled-components';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import Vector from '../../images/undraw_secure_files_re_6vdh.svg';
import {auth} from '../../firebase/config'
import { setUser } from '../../features/userSlice';
import { setLoading } from '../../features/ui';
import { setDoc, doc} from 'firebase/firestore';
import { db } from '../../firebase/config';
import {AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri';
import {BsPerson} from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [signIn, setSignIn] = useState(true);

    const navigate = useNavigate();

    const clearFields = () => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
    }
    
    const dispatch = useDispatch();

    const createUser = async (e) => {
        e.preventDefault();
        if (confirmPassword !== password) {return setErrorMessage('Passwords dont match');}
        try {
          const {user} = await createUserWithEmailAndPassword(auth, email, password);  
          await updateProfile(user, {displayName: name, photoURL: 'https://firebasestorage.googleapis.com/v0/b/social-platform-1875f.appspot.com/o/blank-profile-picture-973460.png?alt=media&token=b150014f-d1c4-489c-823a-8897496e0f4d'});
          await setDoc(doc(db, 'users', user.uid), {
            name: name,
            photo: 'https://firebasestorage.googleapis.com/v0/b/social-platform-1875f.appspot.com/o/blank-profile-picture-973460.png?alt=media&token=b150014f-d1c4-489c-823a-8897496e0f4d'
          })
          dispatch(setUser({email: user.email, userId: user.uid, isLoggedIn: true, userName: name, photo: user.photoURL}));
          dispatch(setLoading(false));
          navigate('/');
        } catch(error) {
          switch(error.message) {
            case 'Firebase: Error (auth/email-already-in-use).':
                setErrorMessage('Email already in use!')
                break;
            case 'Firebase: Error (auth/invalid-email).':
                setErrorMessage('Invalid Email Address!');
                break
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                setErrorMessage('Password should be at least 6 characters!');
                break
            default:
                setErrorMessage('Error occured, please try again!')
         } 
        }
      
    } 

    const loginUser = async (e) => {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate('/');
        } catch(error) {
          switch(error.message) {
            case 'Firebase: Error (auth/wrong-password).':
                setErrorMessage('Incorrect Password!')
                break;
            case 'Firebase: Error (auth/user-not-found).':
                setErrorMessage('User not found!');
                break
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                setErrorMessage('Password should be at least 6 characters!');
                break
            default:
                setErrorMessage('Error occured, please try again!')
         }  
        }
    }

  return (

    <BodyBackground>
      <OuterContainer>
        <LoginContainer>
          <LoginImg src={Vector} />
          <LoginForm onSubmit={signIn ? loginUser : createUser}>
              <Error>{errorMessage}</Error>

              {!signIn && 
                  <InputContainer>
                    <BsPerson />
                    <input className='name' value={name} onChange={(e) => setName(e.target.value)} id='name' type="text" />
                    <label htmlFor="name">Username</label>
                  </InputContainer>
              }
              <InputContainer>
                  <AiOutlineMail />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="text" />
                  <label htmlFor="email">Email</label>
              </InputContainer>

              <InputContainer>
                  <RiLockPasswordLine />
                  <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' type="password" />
                  <label htmlFor="password">Password</label>
              </InputContainer>

              {!signIn && 
                  <InputContainer>
                    <RiLockPasswordLine />
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirm-password" type="password" />
                    <label htmlFor="confirm-password">Confirm Password</label>
                  </InputContainer>
              }

              <input type="submit" value={signIn ? 'Sign in' : 'Sign up'} />
          </LoginForm>
          <h5 onClick={() => {
            setSignIn(!signIn);
            clearFields();
          }}
          >{signIn ? `Dont't have an account ?` : 'Already have an account ?'}</h5>
        </LoginContainer>
      </OuterContainer>
    </BodyBackground>
  )
}

export default Login;


const BodyBackground = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: #247ef2;
`


const OuterContainer = styled.section`
  position: fixed;
  width: clamp(350px, 23vw, 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: .6em;
  font-size: 1rem;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 105%;
    background-color: rgba(255, 255, 255, .8);
    height: 90%;
    border-radius: .6em;
    z-index: -1;
  }

  @media(min-width: 1800px) {
    font-size: 1.4rem;
  }

  @media(min-width: 2100px) {
    font-size: 1.9rem;
  }

  @media(min-width: 2800px) {
    font-size: 2.8rem;
  }

  @media(min-width: 4400px) {
    font-size: 3.45rem;
  }
`

const LoginContainer = styled.div`
    border-radius: .6em;
    width: 100%;
    min-height: 30vw;
    box-shadow: rgba(149, 157, 165, 0.2) 0px .4em 1.1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block: 3em;
    background-color: white;

    > h5 {
      margin-top: .9em;
      font-size: .7em;
      color: ${({theme}) => theme.mainColor};
      cursor: pointer;
    }

`

const LoginImg = styled.img`
  width: 70%;
`

const Error = styled.h4`
  min-height: 2em;
  text-align: center;
  margin-top: 20px;
  font-size: .75em;
  color: crimson;
`

const LoginForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2em;


  input[type="submit"] {
    outline: none;
    border: none;
    background: ${({theme}) => theme.mainColor};
    color: white;
    padding-block: .5em;
    font-size: .75em;
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
  }

`

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  height: 2.2em;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 5px;

  .name {
    text-transform: capitalize;
  }

  > label {
    position: absolute;
    font-size: .65em;
    top: 0;
    left: .6em;
    transform: translateY(-50%);
    padding-inline: .3em;
    transition: .3s ease;
    color: ${({theme}) => theme.mainColor};
    font-weight: bolder;
    background-color: white;
  }

  > input {
    border: none;
    outline: none;
    height: 100%;
    flex: 1;
    font-size: .65em;
    padding-left: .5em;
    background-color: transparent;
  }

  > svg {
    font-size: 1em;
    margin-left: .6em;
    color: ${({theme}) => theme.mainColor};
  }
`