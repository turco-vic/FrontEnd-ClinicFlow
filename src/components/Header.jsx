'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    console.log("User in Header:", user);

    if (!isLoaded) {
        return (
            <div className={styles.header}>
                <div className={styles.logo}>
                    <h1>ClinicFlow</h1>
                    <span className={styles.tagline}>Gestão Inteligente de Consultas</span>
                </div>
                <nav className={styles.nav}>
                    <Link href="/sobre" className={styles.navLink}>Sobre</Link>
                    <Link href="/especialidades" className={styles.navLink}>Especialidades</Link>
                    <Link href="/agendamento" className={styles.navLink}>Agendamento</Link>
                    <Link href="/meus-agendamentos" className={styles.navLink}>Minhas consultas</Link>
                    <Link href="/contato" className={styles.navLink}>Contato</Link>
                </nav>
            </div>
        );
    }
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <h1>ClinicFlow</h1>
                <span className={styles.tagline}>Gestão Inteligente de Consultas</span>
            </div>

            {user?.user?.role === "PACIENTE" 
            ?
            <nav className={styles.nav}>
                <Link href="/sobre" className={styles.navLink}>Sobre</Link>
                <Link href="/especialidades" className={styles.navLink}>Especialidades</Link>
                <Link href="/agendamento" className={styles.navLink}>Agendamento</Link>
                <Link href="/meus-agendamentos" className={styles.navLink}>Minhas consultas</Link>
                <Link href="/contato" className={styles.navLink}>Contato</Link>
            </nav> 
            :
            <nav className={styles.nav}>
                <Link href="/sobre" className={styles.navLink}>Sobre</Link>
                <Link href="/prontuario" className={styles.navLink}>Prontuário</Link>
                <Link href="/contato" className={styles.navLink}>Contato</Link>
            </nav>
        }
        </div>
    );
}
