'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Image from 'next/image';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('Paciente');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/home');
    };

    return (
        <div className={styles.main}>
            <div className={styles.leftSection}>
                <div className={styles.logoContainer}>
                    <Image 
                        src="/images/logo.png" 
                        alt="ClinicFlow Logo" 
                        width={60} 
                        height={60}
                        className={styles.logo}
                    />
                </div>
                
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Saúde, confiança e bem-estar — tudo começa aqui.
                    </h1>
                    
                    <div className={styles.imageContainer}>
                        <Image 
                            src="/images/doctor.jpg"
                            alt="Médicos Profissionais" 
                            width={500} 
                            height={500}
                            className={styles.heroImage}
                            priority
                        />
                        <div className={styles.imageCaption}>
                            <span>Médicos Profissionais e Qualificados</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.formContainer}>
                    <div className={styles.loginSwap}>
                        <div 
                            className={isLogin ? styles.active : styles.inactive}
                            onClick={() => setIsLogin(true)}
                        >
                            <h2 className={isLogin ? styles.TextActive : ''}>Login</h2>
                        </div>
                        <div 
                            className={!isLogin ? styles.active : styles.inactive}
                            onClick={() => setIsLogin(false)}
                        >
                            <h2 className={!isLogin ? styles.TextActive : ''}>Cadastre-se</h2>
                        </div>
                    </div>

                    <div className={styles.formContent}>
                        <h2 className={styles.formTitle}>
                            Faça login para iniciar sua sessão
                        </h2>
                        <p className={styles.formSubtitle}>
                            Utilize suas credenciais abaixo
                        </p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputWrapper}>
                                <label className={styles.inputLabel}>Email</label>
                                <div className={styles.inputWithIcon}>
                                    <input
                                        type="email"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Seu email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.inputWrapper}>
                                <label className={styles.inputLabel}>Senha</label>
                                <div className={styles.inputWithIcon}>
                                    <input
                                        type={mostrarSenha ? 'text' : 'password'}
                                        className={styles.input}
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="Sua senha"
                                        required
                                    />
                                    <span 
                                        className={styles.eyeIcon}
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                    >
                                        {mostrarSenha ? '👁' : '👁‍🗨'}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.inputWrapper}>
                                <label className={styles.inputLabel}>Tipo de Usuário</label>
                                <div className={styles.selectWithIcon}>
                                    <select
                                        className={styles.select}
                                        value={tipoUsuario}
                                        onChange={(e) => setTipoUsuario(e.target.value)}
                                        required
                                    >
                                        <option value="Paciente">Paciente</option>
                                        <option value="Médico">Médico</option>
                                        <option value="Administrador">Administrador</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Entrar
                            </button>

                            <p className={styles.footerText}>
                                Não tem conta? <span className={styles.linkText}>crie aqui</span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}