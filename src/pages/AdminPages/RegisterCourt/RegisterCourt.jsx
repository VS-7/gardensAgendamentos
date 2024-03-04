import { useState } from "react";
import { useAuthValue } from "../../../../context/AuthContext";
import { useInsertDocument } from "../../../hooks/useInsertDocument";
import { useUploadDocument } from "../../../hooks/useUploadDocument";
import styles from './RegisterCourt.module.css';

// Esta função pode ser movida para uma utilidade ou serviço de data
const generateTimeSlots = (startTime, endTime, interval) => {
  const times = [];
  let current = new Date(0, 0, 0, startTime, 0);
  const end = new Date(0, 0, 0, endTime, 0);

  while (current <= end) {
    times.push(current.toTimeString().substring(0, 5));
    current = new Date(current.getTime() + interval * 60000);
  }

  return times;
};

// Gerar horários dinamicamente das 7:00 às 18:00 com intervalos de 60 minutos
const timeSlots = generateTimeSlots(7, 18, 60);

const RegisterCourt = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [price, setPrice] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("courts");
  const { uploadDocument } = useUploadDocument(); 

  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  // Função para lidar com a seleção/desseleção de dias
  const toggleDaySelection = (day) => {
    setSelectedDays(prev => (
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    ));
  };

  // Função para lidar com a seleção/desseleção de horários
  const toggleTimeSelection = (time) => {
    setSelectedTimes(prev => (
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    ));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
  
    const formattedPrice = parseFloat(price);
    if (isNaN(formattedPrice)) {
      setFormError("Por favor, insira um valor numérico para o preço.");
      return;
    }
  
    if (!image) {
      setFormError("Por favor, selecione uma imagem da quadra.");
      return;
    }
  
    try {
      // Note que `useUploadDocument` é agora chamado diretamente como uma função assíncrona
      const imageUrl = await useUploadDocument(image, "courtImages");
      await insertDocument({
        name,
        availableDays: selectedDays,
        availableTimes: selectedTimes,
        image: imageUrl, // Usamos diretamente a URL da imagem obtida
        price: formattedPrice,
        createdBy: user.uid,
      });
      // Aqui você pode redirecionar o usuário ou limpar o formulário
      // Resetando o estado do formulário após o sucesso
      setName('');
      setImage(null);
      setSelectedDays([]);
      setSelectedTimes([]);
      setPrice('');
    } catch (error) {
      console.error("Erro ao fazer upload da imagem ou ao registrar a quadra:", error);
      setFormError("Erro ao registrar a quadra. Tente novamente.");
    }
  };

  return (
    <div className={styles.registerCourt}>
      <h2>Cadastrar Quadra</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome da Quadra:</span>
          <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Imagem da Quadra:</span>
          <input 
            type="file" 
            onChange={handleImageChange} 
            accept="image/*"
          />
        </label>

        <div className={styles.daySelection}>
          <span>Dias Disponíveis:</span>
          {daysOfWeek.map(day => (
            <button 
              type="button" 
              key={day} 
              className={`${styles.dayCard} ${selectedDays.includes(day) ? styles.selected : ''}`} 
              onClick={() => toggleDaySelection(day)}>
              {day}
            </button>
          ))}
        </div>
        <div className={styles.timeSelection}>
          <span>Horários Disponíveis:</span>
          {timeSlots.map(time => (
            <button 
              type="button" 
              key={time} 
              className={`${styles.timeCard} ${selectedTimes.includes(time) ? styles.selected : ''}`} 
              onClick={() => toggleTimeSelection(time)}>
              {time}
            </button>
          ))}
        </div>
        <label>
          <span>Preço da Reserva (em R$):</span>
          <input 
            type="text" 
            required 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit" disabled={response.loading}>
          {response.loading ? "Cadastrando..." : "Cadastrar Quadra"}
        </button>
        {formError && <p className={styles.error}>{formError}</p>}
      </form>
    </div>
  );
};

export default RegisterCourt;
