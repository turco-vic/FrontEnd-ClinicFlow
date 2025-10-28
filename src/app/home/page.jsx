import Link from 'next/link';
import { FaCalendarAlt, FaBell, FaUserMd } from 'react-icons/fa';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
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

            <main className={styles.main}>
                <section className={styles.hero}>
                    <h2>Simplifique seus agendamentos médicos</h2>
                    <p>Conectamos pacientes e profissionais de saúde de forma rápida e eficiente</p>
                    <div className={styles.heroButtons}>
                        <Link href="/paciente" className={styles.primaryButton}>
                            Sou Paciente
                        </Link>
                        <Link href="/medico" className={styles.secondaryButton}>
                            Sou Profissional
                        </Link>
                    </div>
                </section>

                <section className={styles.features}>
                    <div className={styles.featureCard}>
                        <div className={styles.icon}>
                            <FaCalendarAlt />
                        </div>
                        <h3>Agendamento Fácil</h3>
                        <p>Marque consultas em poucos cliques</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.icon}>
                            <FaBell />
                        </div>
                        <h3>Lembretes Automáticos</h3>
                        <p>Nunca perca uma consulta importante</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.icon}>
                            <FaUserMd />
                        </div>
                        <h3>Gestão Completa</h3>
                        <p>Painel intuitivo para profissionais</p>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>&copy; 2025 ClinicFlow - Todos os direitos reservados</p>
            </footer>
        </div>
    );
}
