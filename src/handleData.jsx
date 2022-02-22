import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "./features/userSlice";
import { setLoading } from "./features/ui";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";
import { setAllUsers } from "./features/allUsers";
import { setAllChats } from "./features/allChats";
import { useGetUsers} from "./Hooks/useGetUsers";
import { useGetAllChats } from "./Hooks/useGetAllChats";
import styled from "styled-components";
import Loader from './images/Loader.gif'


const HandleData = ({children}) => {


    const dispatch = useDispatch();
    const {user, ui} = useSelector(state => state);

    const [users] = useGetUsers();
    const [allChats] = useGetAllChats();

    const updateUserInfo = (user) => {
      dispatch(setLoading(true));
      if (user !== null) {
        dispatch(setUser({email: user.email, userId: user.uid, isLoggedIn: true, userName: user.displayName, photo: user.photoURL}));
      } else if (user === null) {
        dispatch(logoutUser())
      }
      dispatch(setLoading(false))
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {  
            updateUserInfo(user);
        })
    }, [])

    useEffect(() => {
      dispatch(setAllUsers(users));
      dispatch(setAllChats(allChats));
    }, [users, allChats])
    




  return (
    <>
        {ui.loading ? <LoaderImg src={Loader} alt="" /> : user?.isLoggedIn ? children :  <Login />}
    </>
  )
}

export default HandleData;

const LoaderImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(.7);

`