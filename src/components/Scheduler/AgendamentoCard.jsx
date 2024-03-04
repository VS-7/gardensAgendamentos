import React from 'react';
import styles from './AgendamentoCard.module.css'; // Certifique-se de que o caminho está correto
import { BsFillTrashFill } from "react-icons/bs";

const AgendamentoCard = ({ quadra, dia, horario, preco, onExcluirAgendamento }) => {
  return (
    <div className={styles.agendamentoRow}>
    <div className={styles.agendamentoCard}>
      {/* Acessando diretamente a propriedade `imageUrl` do objeto `quadra` passado via props */}
      <img src={quadra.image} alt={`Quadra: ${quadra.name}`} className={styles.cardImage} />
      <div className={styles.cardDetails}>
        <h2>{quadra.name}</h2>
        <p>{dia} {dia.mes}</p>
        <p>ás {horario}h</p>
        <p>Subtotal: R$ {preco.toFixed(2)}</p>
        <button onClick={() => onExcluirAgendamento(quadra.id)}><BsFillTrashFill /></button>
      </div>
    </div>
    </div>
  );
};

export default AgendamentoCard;