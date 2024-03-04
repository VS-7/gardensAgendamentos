import React, { useState, useEffect } from 'react';
import styles from './HorarioSelector.module.css'; // Certifique-se de que o caminho está correto

// Utilitário para gerar slots de horário
const generateTimeSlots = (startTime, endTime, interval, isToday) => {
  const times = [];
  let current = new Date();
  const now = new Date();
  if (!isToday) {
    // Se não for hoje, comece do horário inicial definido
    current.setHours(startTime, 0, 0, 0);
  } else {
    // Se for hoje, comece do horário atual ou do startTime, o que for maior
    const currentHour = now.getHours();
    if (currentHour < startTime) {
      current.setHours(startTime, 0, 0, 0);
    } else {
      current.setMinutes(current.getMinutes() + (interval - current.getMinutes() % interval));
    }
  }
  const end = new Date();
  end.setHours(endTime, 0, 0, 0);

  while (current <= end) {
    times.push(current.toTimeString().substring(0, 5));
    current = new Date(current.getTime() + interval * 60000);
  }

  return times;
};

const HorarioSelector = ({ selectedDay, onHorarioSelected }) => {
  const [selectedHorario, setSelectedHorario] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  useEffect(() => {
    const today = new Date();
    const isToday = selectedDay && (selectedDay.getDate() === today.getDate() &&
      selectedDay.getMonth() === today.getMonth() &&
      selectedDay.getFullYear() === today.getFullYear());

    // Supondo que você queira horários das 7:00 às 18:00 com intervalos de 60 minutos
    const generatedTimeSlots = generateTimeSlots(7, 20, 60, isToday);
    setHorariosDisponiveis(generatedTimeSlots);
  }, [selectedDay]);

  const handleHorarioClick = (horario) => {
    setSelectedHorario(horario);
    onHorarioSelected(horario);
  };

  return (
    <div className={styles.horarioSelector}>
      {horariosDisponiveis.map((horario, index) => (
        <button
          key={index}
          className={`${styles.horarioCard} ${selectedHorario === horario ? styles.selected : ''}`}
          onClick={() => handleHorarioClick(horario)}
          disabled={new Date().toTimeString().substring(0, 5) > horario && new Date(selectedDay).toDateString() === new Date().toDateString()}
        >
          {horario}
        </button>
      ))}
    </div>
  );
};

export default HorarioSelector;
