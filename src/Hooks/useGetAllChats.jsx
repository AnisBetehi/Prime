import {useState, useEffect} from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';


export const useGetAllChats = () => {

    const [allChats, setAllChats] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllChats = async () => {
        let chats = [];
        onSnapshot(collection(db, "chats"), (snapShot) => {
            snapShot.forEach((chat) => {
                chats = [...chats, {chatId: chat.id, ...chat.data()}];
              });
              setAllChats(chats);
              setLoading(false);
              chats = [];
        });  
    }

    useEffect(() => {
        fetchAllChats();
    }, [])
    

    return [allChats, loading];
}