import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "./features/userSlice";
import { setLoading } from "./features/ui";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";

const HandleData = ({children}) => {


    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
    const {ui} = useSelector(state => state);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        user && dispatch(setUser({email: user.email, userId: user.uid, isLoggedIn: true, userName: user.displayName, photo: user.photoURL}));
        !user && dispatch(logoutUser());
        console.log(user);
        dispatch(setLoading(false))
        })
    }, [])




  return (
    <>
        {ui.loading ? <h1>Loading</h1> : user?.isLoggedIn ? children :  <Login />}
    </>
  )
}

export default HandleData;