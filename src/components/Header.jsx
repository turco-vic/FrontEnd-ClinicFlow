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
                <Link href="/home" className={styles.navLink}>Home</Link>
                <Link href="/sobre" className={styles.navLink}>Sobre</Link>
                <Link href="/consultas" className={styles.navLink}>Consultas</Link>
                <Link href="/login" className={styles.navLink}>Entrar</Link>
            </nav>
        </div>
    );
}
