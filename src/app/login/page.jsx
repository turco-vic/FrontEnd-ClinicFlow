'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/home');
    };

    return (
        <div className={styles.main}>
            <div className={styles.leftPanel}>
                <div className={styles.logoContainer}>
                    <Image 
                        src="/images/logo.png" 
                        alt="ClinicFlow" 
                        width={60} 
                        height={60}
                        className={styles.logo}
                    />
                </div>
                <h2 className={styles.welcomeTitle}>Saúde, confiança e bem-estar — tudo começa aqui.</h2>
                <div className={styles.imageContainer}>
                    <Image 
                        src="/image/medicos.png" 
                        alt="Médicos" 
                        width={400} 
                        height={350}
                        className={styles.medicosImage}
                    />
                </div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.loginSwap}>
                    <div 
                        className={activeTab === 'login' ? styles.active : styles.inactive}
                        onClick={() => setActiveTab('login')}
                    >
                        <h2 className={activeTab === 'login' ? styles.TextActive : ''}>Login</h2>
                    </div>
                    <div 
                        className={activeTab === 'cadastro' ? styles.active : styles.inactive}
                        onClick={() => setActiveTab('cadastro')}
                    >
                        <h2 className={activeTab === 'cadastro' ? styles.TextActive : ''}>Cadastrar-se</h2>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h3 className={styles.formTitle}>
                        {activeTab === 'login' ? 'Faça login para iniciar sua sessão' : 'Olá, seja muito bem vindo a ClinicFlow'}
                    </h3>
                    <p className={styles.formSubtitle}>
                        {activeTab === 'login' ? 'É bom ter você de volta' : 'Vamos lá, cadastre-se abaixo'}
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputContainer}>
                            <div className={styles.inputWrapper}>
                                <label className={styles.inputLabel}>
                                    {activeTab === 'login' ? 'E-mail' : 'E-mail'}
                                </label>
                                <div className={styles.inputWithIcon}>
                                    <FiMail className={styles.inputIcon} />
                                    <input
                                        type="email"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="clinicflow@gmail.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.inputWrapper}>
                                <label className={styles.inputLabel}>Senha</label>
                                <div className={styles.inputWithIcon}>
                                    <FiLock className={styles.inputIcon} />
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        className={styles.input}
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <div onClick={() => setMostrarSenha(!mostrarSenha)} className={styles.eyeIcon}>
                                        {mostrarSenha ? <FiEyeOff /> : <FiEye />}
                                    </div>
                                </div>
                            </div>

                            {activeTab === 'login' && (
                                <div className={styles.checkboxWrapper}>
                                    <input type="checkbox" id="lembrar" />
                                    <label htmlFor="lembrar">Permanecer conectado</label>
                                </div>
                            )}
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.button}>
                                {activeTab === 'login' ? 'Entrar' : 'Criar conta'}
                            </button>
                        </div>

                        {activeTab === 'login' && (
                            <p className={styles.forgotPassword}>
                                Não tem conta? <a href="#">Clique aqui</a>
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}