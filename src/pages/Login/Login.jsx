import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Login.module.css";

const Login = () => {
  const { signInWithGoogle, error: authError, loading } = useAuthentication();
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setError(""); // Limpa erros anteriores
    try {
      await signInWithGoogle(); // Tenta fazer login com o Google
    } catch (error) {
      console.error("Falha ao fazer login com Google", error);
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError); // Define o erro de autenticação, se houver
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para utilizar o sistema</p>
      <button 
        onClick={handleGoogleSignIn} 
        disabled={loading} 
        className="btn"
      >
        {loading ? "Aguarde..." : "Entrar com Google"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;