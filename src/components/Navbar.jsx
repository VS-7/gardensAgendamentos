import React from 'react';
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./Navbar.module.css";
import { IoHomeOutline, IoLogInOutline, IoPersonAddOutline, IoCreateOutline, IoBarChartOutline, IoAddCircle, IoInformationCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import { BsCalendar, BsPersonFill } from "react-icons/bs";

const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <>
            <nav className={styles.navbar}>
                <ul className={styles.links_list}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                            <BsCalendar className={styles.icon}/>
                        </NavLink>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>
                                    <IoLogInOutline className={styles.icon}/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>
                                    <IoPersonAddOutline className={styles.icon}/>
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
                            <li>
                                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>
                                    <BsPersonFill className={styles.icon}/>
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;