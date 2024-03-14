import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../../context/AuthContext"; 

// Componentes que você criou
import QuadraSelector from "../../components/Scheduler/QuadraSelector";
import AgendamentoCard from "../../components/Scheduler/AgendamentoCard";
import DiaSelector from "../../components/Scheduler/DiaSelector";
import HorarioSelector from "../../components/Scheduler/HorarioSelector";
import { BsCheckLg, BsChevronRight, BsCartPlus } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";

const Home = () => {
  const [selectedQuadra, setSelectedQuadra] = useState(null);
  const [selectedDia, setSelectedDia] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [total, setTotal] = useState(0); // Estado para armazenar o total
  const { user } = useAuthValue();

  const navigate = useNavigate();
  const { documents: quadras, loading: loadingQuadras, error } = useFetchDocuments("courts");

  useEffect(() => {
    // Atualiza o total sempre que os agendamentos mudarem
    const novoTotal = agendamentos.reduce((acc, curr) => acc + curr.preco, 0);
    setTotal(novoTotal);
  }, [agendamentos]);

  const handleQuadraSelected = (quadra) => {
    setSelectedQuadra(quadra);
    setSelectedDia(null);
    setSelectedHorario("");
  };

  const todosCamposSelecionados = () => {
    return selectedQuadra && selectedDia && selectedHorario;
  };

  const handleAgendar = () => {
    if (selectedQuadra && selectedDia && selectedHorario) {
      const novoAgendamento = {
        quadra: selectedQuadra,
        dia: selectedDia.dia,
        mes: selectedDia.mes,
        diaDaSemana: selectedDia.diaDaSemana,
        horario: selectedHorario,
        preco: selectedQuadra.price,
      };
      setAgendamentos([...agendamentos, novoAgendamento]);
    } else {
      alert("Por favor, selecione uma quadra, um dia e um horário.");
    }
  };

  const handleExcluirAgendamento = (index) => {
    const novosAgendamentos = agendamentos.filter((_, i) => i !== index);
    setAgendamentos(novosAgendamentos);
  };

  const handleIrParaPagamento = () => {
    navigate('/payment', { state: { total } });
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };


  if (loadingQuadras) return <div>Carregando quadras...</div>;
  if (error) return <div>Erro ao buscar quadras.</div>;

  return (
    <div className={styles.home}>
      <div className={styles.fundoCinza}>
      <p className={styles.p}> Bem vindo,</p>
      <p className={styles.userName}>{user ? user.displayName : <Link to="/login">Fazer login</Link>}</p>
      <div className={styles.AgendamentoContainer}>
        <QuadraSelector quadras={quadras} onQuadraSelected={handleQuadraSelected} />
          <>
          <h3 className={styles.h3}>Para quando você gostaria de agendar?</h3>
            <DiaSelector onDiaSelected={setSelectedDia} />
            <h3 className={styles.h3}>Que horas?</h3>
            <HorarioSelector onHorarioSelected={setSelectedHorario} />
            {todosCamposSelecionados() && (
            <button onClick={handleAgendar} className={styles.confirmarAgendamento}><BsCheckLg size='1.5em'/></button>
            )}
            <h3 className={styles.h3}>Itens selecionados</h3>

            {agendamentos.length === 0 ? (
              <div className={styles.emptyMessage}>
                <p>Nenhum item selecionado!</p>
                <BsCartPlus size="3em" /> {/* Ajuste o tamanho conforme necessário */}
              </div>
            ) : (
              <>
                <div className={styles.agendamentosContainer}>
                  {/* Renderização dos agendamentos */}
                </div>
                {/* Restante do conteúdo */}
              </>
            )}
           
            {agendamentos.length > 0 && (
              <>
                <div className={styles.agendamentosContainer}>
                {agendamentos.map((agendamento, index) => (
                  <AgendamentoCard
                    key={index}
                    quadra={agendamento.quadra}
                    dia={`${agendamento.diaDaSemana} ${agendamento.dia} ${agendamento.mes}`}
                    horario={agendamento.horario}
                    preco={agendamento.preco}
                    onExcluirAgendamento={() => handleExcluirAgendamento(index)}
                  />
                ))}
                </div>
                <div className={styles.totalContainer}>
                  <h3 className={styles.h3}>Total a pagar: R$ {total.toFixed(2)}</h3>
                  <button onClick={handleIrParaPagamento} className={styles.buttonPayment}>Finalizar agendamento <MdArrowForwardIos /></button>
                  
                  
                </div>
              </>
            )}
          </>
          </div>
        </div>
    </div>
  );
};

export default Home;
