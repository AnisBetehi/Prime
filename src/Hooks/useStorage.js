import {useState, useEffect} from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytes } from 'firebase/storage';

const useStorage = (file) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!file) return;
        const storageRef = ref(storage, file.name);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log(snapshot);
          });
    }, [file])
    

    return [url, loading];

}

export default useStorage;