'use client';

import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
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
