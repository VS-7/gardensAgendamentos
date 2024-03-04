import React from 'react';
import { Link } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin'; // Ajuste o caminho conforme necessário
import styles from './AdminDashboard.module.css'
import { BsCalendar, BsPersonFill, BsFillPeopleFill, BsFillClockFill, BsTools } from "react-icons/bs";


const AdminDashboard = () => {
    const { isAdmin, loading } = useAdmin();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!isAdmin) {
        return <div>Acesso Negado</div>;
    }

    return (
        <div className={styles.dashboard}>
        <aside className={styles.sidebar}>
            <h1 className={styles.logo}>Gardens Agendamentos</h1>
            <nav className={styles.nav}>
                <Link className={styles.navItem} to=""><BsCalendar className={styles.icon}/>Agendamentos</Link>
                <Link className={styles.navItem} to=""><BsFillPeopleFill className={styles.icon}/>Clientes</Link>
                <Link className={styles.navItem} to=""><BsFillClockFill className={styles.icon}/>Horários</Link>
                <Link className={styles.navItem} to=""><BsTools className={styles.icon}/>Serviços</Link>
            </nav>
        </aside>
        <main className={styles.mainContent}>
            <header className={styles.navbar}>
                <span>João Paulo</span>
                {/* Aqui você pode adicionar mais elementos à navbar, como notificações, perfil, etc. */}
            </header>
            {/* O conteúdo de cada página específica do admin será renderizado aqui */}
            {/* Você pode usar o componente <Outlet> do react-router-dom para renderizar os componentes filhos das rotas */}
        </main>
    </div>
    );
};

export default AdminDashboard;