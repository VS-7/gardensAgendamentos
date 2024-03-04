import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            const auth = getAuth();
            const db = getFirestore();
            const user = auth.currentUser;

            if (!user) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            const userRef = doc(db, 'usersAdmin', user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists() && docSnap.data().isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        };

        checkAdminStatus();
    }, []);

    return { isAdmin, loading };

    
};

export default useAdmin;