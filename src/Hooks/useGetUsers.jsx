import {useState, useEffect} from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';


export const useGetUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        let users = [];
        onSnapshot(collection(db, "users"), (snapShot) => {
            snapShot.forEach((user) => {
                users = [...users, {userId: user.id, ...user.data()}];
              });
              setUsers(users);
              setLoading(false);
              users = [];
        });  
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    

    return [users, loading];
}