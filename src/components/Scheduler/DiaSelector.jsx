import React, { useState, useEffect } from 'react';
import styles from './DiaSelector.module.css'; // Ajuste o caminho conforme necessário

const DiaSelector = ({ onDiaSelected }) => {
  const [selectedDiaIndex, setSelectedDiaIndex] = useState(null);
  const [diasDisponiveis, setDiasDisponiveis] = useState([]);

  useEffect(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Remove as horas, minutos e segundos para comparação apenas pela data
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    const novosDiasDisponiveis = Array.from({ length: diasNoMes }, (_, index) => {
      const diaDate = new Date(anoAtual, mesAtual, index + 1);
      const dia = diaDate.getDate();
      const diaDaSemana = diaDate.toLocaleDateString('pt-BR', { weekday: 'short' });
      const mes = diaDate.toLocaleDateString('pt-BR', { month: 'long' });
      const isPast = diaDate < hoje; // Verifica se o dia é anterior ao dia atual

      return { dia, mes, diaDaSemana: diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1), isPast };
    });

    setDiasDisponiveis(novosDiasDisponiveis);
  }, []);

  const handleDiaClick = (index) => {
    const dia = diasDisponiveis[index];
    if (dia.isPast) {
      return; // Não faz nada se o dia for passado
    }
    setSelectedDiaIndex(index);
    onDiaSelected(dia);
  };

  return (
    <div className={styles.diaSelector}>
      <div className={styles.diasContainer}>
        {diasDisponiveis.map((dia, index) => (
          <button
            key={index}
            className={`${styles.diaButton} ${index === selectedDiaIndex ? styles.selected : ''}`}
            onClick={() => handleDiaClick(index)}
            disabled={dia.isPast} // Desabilita o botão se o dia for passado
          >
            <span className={styles.diaDaSemana}>{dia.diaDaSemana}</span>
            <span className={styles.diaNumero}>{dia.dia}</span>
            <span className={styles.diaMes}>{dia.mes}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiaSelector;
