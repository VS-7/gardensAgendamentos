import {db} from "../firebase/config";
import {
    getAuth,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [user, setUser] = useState(null); // Adicione um estado para o usuário

    const auth = getAuth();

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
            const result = await signInWithPopup(auth, provider);
            // Define o usuário no estado
            const profile = result.user;
            setUser({
              displayName: profile.displayName,
              email: profile.email,
              photoURL: profile.photoURL // Aqui você obtém a URL da foto do perfil
            });
            return profile;
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
            setUser(null); // Limpa o usuário do estado
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
        user // Retorne o usuário como parte do hook
    };
};