import {useState, useEffect} from 'react';
import {getDoc, doc} from 'firebase/firestore';
import { db } from '../firebase/config';



export const useGetUser = (id) => {

    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchUserInfo = async () => {
            setLoading(true);
            const docsnap = await getDoc(doc(db, 'users', id));   
            setUserInfo(docsnap.data());
            setLoading(false);
    }

    useEffect(() => {
        fetchUserInfo();
    }, [id])
    

    return [userInfo, loading];
}