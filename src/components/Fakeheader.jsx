import Link from 'next/link';
import styles from '../styles/Fakeheader.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>ClinicFlow</h1>
                <span className={styles.tagline}>Gestão Inteligente de Consultas</span>
            </div>
            <nav className={styles.nav}>
                <Link href="/login" className={styles.navLink}>Entrar</Link>
                <Link href="/register" className={styles.navButton}>Cadastrar-se</Link>
            </nav>
        </header>
    );
}
