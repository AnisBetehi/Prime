import {useState, useEffect} from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';


export const useGetPosts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        let docs = [];
        onSnapshot(collection(db, "posts"), (snapShot) => {
            snapShot.forEach((doc) => {
                docs = [...docs, {postId: doc.id, ...doc.data()}];
              });
              setPosts(docs);
              setLoading(false);
              docs = [];
        });  
    }

    useEffect(() => {
        fetchPosts();
    }, [])
    

    return [posts, loading];
}