import React from "react";
import styles from './login.module.css';
import { FaEnvelope, FaLock, FaEye, FaUser } from 'react-icons/fa';

export default function Login() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1>Login Page</h1>
            </div>
            <div className={styles.loginContainer}>
                <div className={styles.loginSwap}>
                    <div className={styles.active}>
                        <h2 className={styles.TextActive}>Login</h2>
                    </div>
                    <div className={styles.inactive}>
                        <h2>Cadastre-se</h2>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}>Email</label>
                        <div className={styles.inputWithIcon}>
                            <FaEnvelope className={styles.inputIcon} />
                            <input 
                                type="email" 
                                placeholder="seu email" 
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}>Senha</label>
                        <div className={styles.inputWithIcon}>
                            <FaLock className={styles.inputIcon} />
                            <input 
                                type="password" 
                                placeholder="sua senha" 
                                className={styles.input}
                            />
                            <FaEye className={styles.eyeIcon} />
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}>Tipo de Usuário</label>
                        <div className={styles.selectWithIcon}>
                            <FaUser className={styles.inputIcon} />
                            <select className={styles.select}>
                                <option value="paciente">Paciente</option>
                                <option value="medico">Médico</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>Login</button>
                </div>
            </div>
        </div>
    );
}