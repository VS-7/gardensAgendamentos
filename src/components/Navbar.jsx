import React from 'react';
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./Navbar.module.css";
import { IoHomeOutline, IoLogInOutline, IoPersonAddOutline, IoCreateOutline, IoBarChartOutline, IoAddCircle, IoInformationCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import { BsCalendar, BsPersonFill } from "react-icons/bs";
import { MdCalendarToday } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";

const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <>
        {/* 
        <div className={styles.headerContent}>
                <NavLink to="/" className={styles.brand}>
                    <img src="../../public/logo.svg" alt="" />
                </NavLink>
            </div> */}
            <nav className={styles.navbar}>
                <ul className={styles.links_list}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                            <MdCalendarToday className={styles.icon}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/publication" className={({ isActive }) => (isActive ? styles.active : "")}>
                            <IoMdPhotos className={styles.icon}/>
                        </NavLink>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>
                                    <IoLogInOutline className={styles.icon}/>
                                </NavLink>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li>
                                <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.activePlus : "")}>
                                    <IoAddCircle className={styles.icon} size='1.5em'/>
                                </NavLink>
                            </li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.activeProfile : "")}>
                                {/* Se o usuário estiver logado e tiver uma foto, mostra a foto */}
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Perfil" className={styles.profilePhoto} />
                                ) : (
                                    // Se não houver foto, mostra o ícone padrão
                                    <BsPersonFill className={styles.icon}/>
                                )}
                            </NavLink>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;