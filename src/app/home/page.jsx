import Link from 'next/link';
import { FaCalendarAlt, FaBell, FaUserMd } from 'react-icons/fa';
import Header from '@/components/Fakeheader';
import Footer from '@/components/Footer';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.hero}>
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
                </div>

                <div className={styles.features}>
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
                </div>
            </main>

            <Footer />
        </div>
    );
}
