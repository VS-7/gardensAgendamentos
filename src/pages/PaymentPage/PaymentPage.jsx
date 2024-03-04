import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Para fazer requisições HTTP
import QRCode from 'qrcode.react'; // Componente para renderizar o QR Code
import styles from './PaymentPage.module.css'; // Seus estilos importados

const PaymentPage = () => {
    const location = useLocation();
    const [pixData, setPixData] = useState(null); // Estado para armazenar os dados do PIX

    const agendamentos = location.state?.agendamentos || [];
    const total = location.state?.total || 0;

    const gerarPagamentoPIX = async () => {
        try {
            // Requisição ao backend para gerar os dados do PIX
            const response = await axios.post('http://localhost:3000/create-pix-payment', { total });
            setPixData(response.data); // Armazena os dados do PIX no estado
        } catch (error) {
            console.error('Erro ao gerar pagamento PIX:', error);
            alert('Erro ao gerar o pagamento via PIX. Tente novamente.');
        }
    };

    // Simulação da confirmação de pagamento
    const confirmarPagamento = () => {
        console.log('Pagamento confirmado com sucesso!');
        // Aqui você adicionaria a lógica para tratar a confirmação de pagamento
        // Por exemplo, atualizar o estado do pedido no banco de dados, enviar e-mail de confirmação, etc.
    };

    return (
        <div className={styles.paymentContainer}>
            <button className={styles.adicionarPayment}>Adicionar mais horários</button>
            <div className={styles.agendamentosContainer}>
                {agendamentos.map((agendamento, index) => (
                    <div key={index} className={styles.agendamentoCard}>
                        <img src={agendamento.quadra.image} alt={`Quadra: ${agendamento.quadra.name}`} />
                        <div className={styles.agendamentoInfo}>
                            <h2>{agendamento.quadra.name}</h2>
                            <p>{`Dia: ${agendamento.diaDaSemana}, ${agendamento.dia} de ${agendamento.mes}`}</p>
                            <p>{`Horário: ${agendamento.horario}`}</p>
                            <p>{`Subtotal: R$ ${agendamento.preco.toFixed(2)}`}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.pagamentoInfo}>
                <button className={styles.metodoPagamento} onClick={gerarPagamentoPIX}>
                    Pagar com PIX
                </button>
                {pixData && (
                    <div>
                        {pixData.pixKey && <p>Chave PIX: {pixData.pixKey}</p>}
                        {pixData.qrCode && <QRCode value={pixData.qrCode} />}
                    </div>
                )}
            </div>
            <div className={styles.cupomContainer}>
                <h2>Possui cupom?</h2>
                <button className={styles.selecionarCupom}>Selecionar Cupom</button>
            </div>
            <div className={styles.totalContainer}>
                <h2>Total a pagar</h2>
                <span className={styles.total}>R$ {total.toFixed(2)}</span>
            </div>
            <button className={styles.confirmarPagamento} onClick={confirmarPagamento}>
                CONFIRMAR PAGAMENTO
            </button>
        </div>
    );
};

export default PaymentPage;
