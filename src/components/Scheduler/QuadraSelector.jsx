import { useEffect, useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments'; // Supondo que você tenha um hook personalizado para buscar documentos
import styles from './QuadraSelector.module.css'; // Importe seu arquivo CSS
import { BsCheck2 } from "react-icons/bs";

const QuadraSelector = ({ onQuadraSelected }) => {
  const [quadras, setQuadras] = useState([]);

  // Supondo que `useFetchDocuments` seja um hook para buscar documentos no Firebase
  const { documents: fetchedQuadras, loading, error } = useFetchDocuments('courts');

  useEffect(() => {
    if (fetchedQuadras) {
      setQuadras(fetchedQuadras);
    }
  }, [fetchedQuadras]);

  const handleScheduleClick = (quadra) => {
    onQuadraSelected(quadra); // Passando a quadra selecionada para o componente pai
  };

  if (loading) return <div>Carregando quadras...</div>;
  if (error) return <div>Erro ao buscar quadras.</div>;

  return (
    <div className={styles.quadraSelector}>
      <div className={styles.quadraContainer}>
      {quadras.map((quadra) => (
        <div key={quadra.id} className={styles.card}>
          <img src={quadra.image} alt={quadra.name} className={styles.cardImage} />
          <div className={styles.cardContent}>
            <h3>{quadra.name}</h3>
            <button className={styles.btnAgenda} onClick={() => handleScheduleClick(quadra)}>Agendar <BsCheck2 /></button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default QuadraSelector;