'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './selecionar-papel.module.css';

export default function SelecionarPapel() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [selecionado, setSelecionado] = useState('');

    useEffect(() => {
        if (isLoaded && user) {
            const role = user.publicMetadata?.role;
            if (role) {
                router.push('/home');
            }
        }
    }, [isLoaded, user, router]);

    const selecionarPapel = async (papel) => {
        setSelecionado(papel);
        try {
            await user.update({
                publicMetadata: {
                    role: papel
                }
            });
            router.push('/home');
        } catch (error) {
            console.error('Erro ao definir papel:', error);
        }
    };

    if (!isLoaded) {
        return <div className={styles.loading}>Carregando...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Bem-vindo ao ClinicFlow</h1>
                <p className={styles.subtitle}>Selecione seu tipo de perfil para continuar</p>

                <div className={styles.cards}>
                    <button
                        className={`${styles.card} ${selecionado === 'paciente' ? styles.selected : ''}`}
                        onClick={() => selecionarPapel('paciente')}
                        disabled={selecionado !== ''}
                    >
                        <div className={styles.icon}>👤</div>
                        <h2 className={styles.cardTitle}>Paciente</h2>
                        <p className={styles.cardDescription}>
                            Agende consultas, visualize seu histórico médico e acompanhe seus atendimentos
                        </p>
                    </button>

                    <button
                        className={`${styles.card} ${selecionado === 'medico' ? styles.selected : ''}`}
                        onClick={() => selecionarPapel('medico')}
                        disabled={selecionado !== ''}
                    >
                        <div className={styles.icon}>⚕️</div>
                        <h2 className={styles.cardTitle}>Médico</h2>
                        <p className={styles.cardDescription}>
                            Gerencie sua agenda, consulte prontuários e atenda seus pacientes
                        </p>
                    </button>

                    <button
                        className={`${styles.card} ${selecionado === 'secretaria' ? styles.selected : ''}`}
                        onClick={() => selecionarPapel('secretaria')}
                        disabled={selecionado !== ''}
                    >
                        <div className={styles.icon}>📋</div>
                        <h2 className={styles.cardTitle}>Secretária</h2>
                        <p className={styles.cardDescription}>
                            Organize agendamentos, gerencie pacientes e coordene a clínica
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
