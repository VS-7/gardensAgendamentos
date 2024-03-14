import React from 'react';
import { Link } from "react-router-dom"; // Importe o componente Link
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../../context/AuthContext";

import styles from "./Settings.module.css"

import { IoIosArrowForward } from "react-icons/io";


const Settings = ( ) => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <>
        <div className={styles.settings}>
          <button className={styles.adicionarPayment}>Configurações</button>
        </div>

        <div className={styles.buttons}>
            <Link to="/resetPassword" className={styles.button}>Redefinir senha <IoIosArrowForward size="1em" /></Link>
            <div className={styles.buttons}>{user && (
                        
                        
                        <a onClick={logout} className={styles.button}>
                            Desconectar {user.displayName} <IoIosArrowForward size="1em" />
                        </a>
                    )}</div>
            
        </div>        

        </>
    );
}

export default Settings;