import {useState, useEffect} from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const useStorage = (file) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!file) {
            setUrl('');
            setLoading(false);
            return
        };
        setLoading(true);
        const storageRef = ref(storage, file.name);

        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUrl(url);
                setLoading(false);
            });
          })
    }, [file])
    

    return [url, loading];

}

export default useStorage;

