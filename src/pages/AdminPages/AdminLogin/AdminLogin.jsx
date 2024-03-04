import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Importa funções adicionais do Firestore
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css'

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore(); // Inicializa o Firestore

    const checkIfAdmin = async (uid) => {
        const userRef = doc(db, 'usersAdmin', uid); // Ajuste o caminho conforme sua estrutura no Firestore
        const docSnap = await getDoc(userRef);

        if (docSnap.exists() && docSnap.data().isAdmin) {
            // Usuário é um administrador, redireciona para o dashboard do administrador
            navigate('/admin/dashboard');
        } else {
            // Usuário não é um administrador, mostra um erro
            setError('Acesso negado. Você não tem permissões de administrador.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Chama checkIfAdmin para verificar se o usuário é um administrador
            await checkIfAdmin(user.uid);
        } catch (error) {
            setError('Falha no login. Verifique suas credenciais.');
            console.error('Erro de login:', error);
        }
    };

    return (
        <div>
            <h2 className={styles.h2}>Entrar como Administrador</h2>
            <p className={styles.p}>Faça login para utilizar o sistema</p>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin} className={styles.formAdmin}>
                <input
                    type="email"
                    placeholder="Email do usuário"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Insira sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className='btn'>Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;