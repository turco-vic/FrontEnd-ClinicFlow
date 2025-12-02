"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './pacientes.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [medico, setMedico] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Verificar se o usuário está logado e é médico
        const userStorage = localStorage.getItem('user');
        if (!userStorage) {
            router.push('/login');
            return;
        }

        const userData = JSON.parse(userStorage);
        if (userData.role !== 'MEDICO') {
            alert('Acesso restrito para médicos');
            router.push('/home');
            return;
        }

        setMedico(userData);
        carregarPacientes();
    }, []);

    const carregarPacientes = async () => {
        try {
            setCarregando(true);
            const response = await fetch('http://localhost:8080/users?role=PACIENTE', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPacientes(data);
                setPacientesFiltrados(data);
            } else {
                setErro('Erro ao carregar pacientes');
            }
        } catch (error) {
            console.error('Erro ao carregar pacientes:', error);
            setErro('Erro ao conectar com o servidor');
        } finally {
            setCarregando(false);
        }
    };

    const filtrarPacientes = (termoBusca) => {
        setBusca(termoBusca);
        
        if (termoBusca.trim() === '') {
            setPacientesFiltrados(pacientes);
            return;
        }

        const termo = termoBusca.toLowerCase();
        const filtrados = pacientes.filter(paciente => 
            paciente.nome.toLowerCase().includes(termo) ||
            paciente.email.toLowerCase().includes(termo)
        );
        setPacientesFiltrados(filtrados);
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Meus Pacientes</h1>
                            <p className={styles.subtitle}>
                                Visualize e gerencie seus pacientes cadastrados
                            </p>
                        </div>
                        {medico && (
                            <div className={styles.medicoInfo}>
                                <p className={styles.medicoNome}>{medico.nome}</p>
                                <p className={styles.medicoRole}>Médico(a)</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.searchSection}>
                        <div className={styles.searchBox}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Buscar por nome ou email..."
                                value={busca}
                                onChange={(e) => filtrarPacientes(e.target.value)}
                            />
                            <span className={styles.searchIcon}>🔍</span>
                        </div>
                        <div className={styles.stats}>
                            <span className={styles.statItem}>
                                Total de pacientes: <strong>{pacientes.length}</strong>
                            </span>
                            {busca && (
                                <span className={styles.statItem}>
                                    Resultados: <strong>{pacientesFiltrados.length}</strong>
                                </span>
                            )}
                        </div>
                    </div>

                    {carregando ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Carregando pacientes...</p>
                        </div>
                    ) : erro ? (
                        <div className={styles.erro}>
                            <p>{erro}</p>
                            <button onClick={carregarPacientes} className={styles.retryButton}>
                                Tentar novamente
                            </button>
                        </div>
                    ) : pacientesFiltrados.length === 0 ? (
                        <div className={styles.empty}>
                            <p>
                                {busca 
                                    ? 'Nenhum paciente encontrado com esse termo de busca' 
                                    : 'Nenhum paciente cadastrado ainda'}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pacientesFiltrados.map((paciente) => (
                                        <tr key={paciente.id}>
                                            <td>#{paciente.id}</td>
                                            <td className={styles.patientName}>{paciente.nome}</td>
                                            <td>{paciente.email}</td>
                                            <td>
                                                <button 
                                                    className={styles.viewButton}
                                                    onClick={() => router.push(`/prontuario?pacienteId=${paciente.id}`)}
                                                >
                                                    Ver Prontuário
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}