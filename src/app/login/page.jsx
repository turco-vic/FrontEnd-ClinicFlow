'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar validação ou autenticação futura
        router.push('/home');
    };

    return (
        <div className={styles.main}>
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <h1>Entrar no ClinicFlow</h1>
                    <p>Faça login para acessar o sistema</p>
                    
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        
                        <button type="submit" className={styles.submitButton}>
                            Entrar
                        </button>
                    </form>
                    
                    <p className={styles.cadastroLink}>
                        Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
                    </p>
                </div>
            </div>
        </div>
    );
}