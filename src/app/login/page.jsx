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
    
    // Estados para cadastro
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [emailCadastro, setEmailCadastro] = useState('');
    const [senhaCadastro, setSenhaCadastro] = useState('');
    const [receberNotificacoes, setReceberNotificacoes] = useState(false);
    
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email === 'teste@gmail.com' && senha === '1234') {
            router.push('/home');
        } else {
            alert('Email ou senha incorretos!\nUse: teste@gmail.com / 1234');
        }
    };

    const handleCadastro = (e) => {
        e.preventDefault();
        alert('Cadastro realizado com sucesso!');
        setIsLogin(true);
        // Limpar campos
        setNome('');
        setEmailCadastro('');
        setDataNascimento('');
        setTelefone('');
        setCpf('');
        setSenhaCadastro('');
        setReceberNotificacoes(false);
    };

    const formatCPF = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }
        return cleaned.substring(0, 11);
    };

    const formatTelefone = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return cleaned.substring(0, 11);
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

                    {isLogin ? (
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
                                    Não tem conta? <span className={styles.linkText} onClick={() => setIsLogin(false)}>crie aqui</span>
                                </p>
                            </form>
                        </div>
                    ) : (
                        <div className={styles.formContent}>
                            <h2 className={styles.formTitle}>
                                Olá, seja muito bem vindo a ClinicFlow
                            </h2>
                            <p className={styles.formSubtitle}>
                                Realize o seu cadastro abaixo
                            </p>

                            <form onSubmit={handleCadastro} className={styles.form}>
                                <div className={styles.formRow}>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>Email</label>
                                        <div className={styles.inputWithIcon}>
                                            <input
                                                type="email"
                                                className={styles.input}
                                                value={emailCadastro}
                                                onChange={(e) => setEmailCadastro(e.target.value)}
                                                placeholder="Digite um email válido"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>Data de Nascimento</label>
                                        <div className={styles.inputWithIcon}>
                                            <input
                                                type="date"
                                                className={styles.input}
                                                value={dataNascimento}
                                                onChange={(e) => setDataNascimento(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>Nome</label>
                                        <div className={styles.inputWithIcon}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                placeholder="Nome completo"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>Telefone</label>
                                        <div className={styles.inputWithIcon}>
                                            <input
                                                type="tel"
                                                className={styles.input}
                                                value={telefone}
                                                onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                                                placeholder="(00) 00000-0000"
                                                maxLength={15}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>CPF</label>
                                        <div className={styles.inputWithIcon}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                value={cpf}
                                                onChange={(e) => setCpf(formatCPF(e.target.value))}
                                                placeholder="000.000.000-00"
                                                maxLength={14}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>Senha</label>
                                        <div className={styles.inputWithIcon}>
                                            <input
                                                type="password"
                                                className={styles.input}
                                                value={senhaCadastro}
                                                onChange={(e) => setSenhaCadastro(e.target.value)}
                                                placeholder="Digite sua senha"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        id="notificacoes"
                                        className={styles.checkbox}
                                        checked={receberNotificacoes}
                                        onChange={(e) => setReceberNotificacoes(e.target.checked)}
                                    />
                                    <label htmlFor="notificacoes" className={styles.checkboxLabel}>
                                        Ativo para receber notificações
                                    </label>
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    Cadastrar-se
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}