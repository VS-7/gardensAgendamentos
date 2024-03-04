import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
    const [phoneNumber, setPhoneNumber] = useState(""); // Para coletar o número de telefone
    const [displayName, setDisplayName] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [code, setCode] = useState(""); // Para o código de verificação
    const [confirmationResult, setConfirmationResult] = useState(null); // Para armazenar o resultado da solicitação de envio do código

    const { sendVerificationCode, verifyCode, error: authError, loading } = useAuthentication();

    // Handler para enviar o código de verificação
    const handleSendCode = async (e) => {
        e.preventDefault();
        const result = await sendVerificationCode(phoneNumber);
        if (result) {
            setConfirmationResult(result);
        }
    };

    // Handler para verificar o código inserido pelo usuário
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (confirmationResult) {
            const user = await verifyCode(confirmationResult, code);
            if (user) {
                console.log("Usuário autenticado:", user);
                // Aqui você pode adicionar o usuário ao seu banco de dados com as informações adicionais como displayName e isStudent
                // Isso pode envolver uma chamada a uma função separada que atualize essas informações no perfil do usuário ou em outro lugar apropriado
            }
        }
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.register}>
            <h1>Cadastre-se e faça parte do grupo!</h1>
            <p>Crie seu usuário e compartilhe seus conhecimentos</p>
            {!confirmationResult ? (
                <form onSubmit={handleSendCode}>
                    {/* Campos para número de telefone e envio do código */}
                    <label>
                        <span>Número de telefone:</span>
                        <input
                            type="text"
                            required
                            placeholder="Seu número de telefone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    {!loading && <button className="btn">Enviar Código</button>}
                </form>
            ) : (
                <form onSubmit={handleVerifyCode}>
                    {/* Campos para código de verificação */}
                    <label>
                        <span>Código de Verificação:</span>
                        <input
                            type="text"
                            required
                            placeholder="Digite o código recebido"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </label>
                    {!loading && <button className="btn">Verificar Código</button>}
                </form>
            )}
            {loading && <button className="btn" disabled>Aguarde...</button>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Register;