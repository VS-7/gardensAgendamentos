import {db} from "../firebase/config";
import {
    getAuth,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    // Autenticação com Google
    const signInWithGoogle = async () => {
        checkIfIsCancelled();

        setError(null);

        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider); // Utiliza signInWithPopup para autenticação com Google
            const user = result.user;
            return user;
        } catch (error) {
            console.error(error.message);

            let systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            if (error.message.includes('popup-closed-by-user')) {
                systemErrorMessage = "A janela de login foi fechada antes de completar a autenticação.";
            }

            setError(systemErrorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Função para logout
    const logout = async () => {
        checkIfIsCancelled();

        try {
            setLoading(true);
            await signOut(auth);
        } catch (error) {
            console.error(error);
            setError("Falha ao tentar sair.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        signInWithGoogle,
        logout,
        error,
        loading,
    };
};