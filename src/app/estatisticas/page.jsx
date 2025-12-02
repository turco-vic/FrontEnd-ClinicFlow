"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './estatisticas.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Estatisticas() {
    const [medico, setMedico] = useState(null);
    const [periodo, setPeriodo] = useState('mes');
    const [carregando, setCarregando] = useState(true);
    const router = useRouter();

    useEffect(() => {
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
        
        // Simular carregamento de dados
        setTimeout(() => {
            setCarregando(false);
        }, 1000);
    }, []);

    // Dados simulados
    const estatisticas = {
        resumo: {
            totalConsultas: 248,
            consultasHoje: 12,
            pacientesAtivos: 156,
            taxaCancelamento: 5.2
        },
        consultasPorMes: [
            { mes: 'Jan', quantidade: 18 },
            { mes: 'Fev', quantidade: 22 },
            { mes: 'Mar', quantidade: 25 },
            { mes: 'Abr', quantidade: 28 },
            { mes: 'Mai', quantidade: 32 },
            { mes: 'Jun', quantidade: 30 },
            { mes: 'Jul', quantidade: 35 },
            { mes: 'Ago', quantidade: 38 },
            { mes: 'Set', quantidade: 42 },
            { mes: 'Out', quantidade: 40 },
            { mes: 'Nov', quantidade: 45 },
            { mes: 'Dez', quantidade: 28 }
        ],
        consultasPorDia: [
            { dia: 'Seg', quantidade: 8 },
            { dia: 'Ter', quantidade: 12 },
            { dia: 'Qua', quantidade: 10 },
            { dia: 'Qui', quantidade: 15 },
            { dia: 'Sex', quantidade: 11 },
            { dia: 'Sáb', quantidade: 5 },
            { dia: 'Dom', quantidade: 2 }
        ],
        especialidades: [
            { nome: 'Clínico Geral', quantidade: 85, cor: '#44C4FF' },
            { nome: 'Cardiologia', quantidade: 52, cor: '#FF6B6B' },
            { nome: 'Pediatria', quantidade: 48, cor: '#4ECDC4' },
            { nome: 'Dermatologia', quantidade: 35, cor: '#FFD93D' },
            { nome: 'Ortopedia', quantidade: 28, cor: '#A8E6CF' }
        ],
        horariosPico: [
            { horario: '08:00', quantidade: 15 },
            { horario: '09:00', quantidade: 25 },
            { horario: '10:00', quantidade: 30 },
            { horario: '11:00', quantidade: 22 },
            { horario: '14:00', quantidade: 28 },
            { horario: '15:00', quantidade: 32 },
            { horario: '16:00', quantidade: 26 },
            { horario: '17:00', quantidade: 18 }
        ]
    };

    const maxConsultasMes = Math.max(...estatisticas.consultasPorMes.map(m => m.quantidade));
    const maxConsultasDia = Math.max(...estatisticas.consultasPorDia.map(d => d.quantidade));
    const maxConsultasHora = Math.max(...estatisticas.horariosPico.map(h => h.quantidade));

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Estatísticas</h1>
                            <p className={styles.subtitle}>
                                Visualize métricas e indicadores de desempenho
                            </p>
                        </div>
                        {medico && (
                            <div className={styles.medicoInfo}>
                                <p className={styles.medicoNome}>{medico.nome}</p>
                                <p className={styles.medicoRole}>Médico(a)</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.periodFilter}>
                        <button 
                            className={periodo === 'semana' ? styles.periodButtonActive : styles.periodButton}
                            onClick={() => setPeriodo('semana')}
                        >
                            Semana
                        </button>
                        <button 
                            className={periodo === 'mes' ? styles.periodButtonActive : styles.periodButton}
                            onClick={() => setPeriodo('mes')}
                        >
                            Mês
                        </button>
                        <button 
                            className={periodo === 'ano' ? styles.periodButtonActive : styles.periodButton}
                            onClick={() => setPeriodo('ano')}
                        >
                            Ano
                        </button>
                    </div>

                    {carregando ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Carregando estatísticas...</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{estatisticas.resumo.totalConsultas}</div>
                                    <div className={styles.statLabel}>Total de Consultas</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{estatisticas.resumo.consultasHoje}</div>
                                    <div className={styles.statLabel}>Consultas Hoje</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{estatisticas.resumo.pacientesAtivos}</div>
                                    <div className={styles.statLabel}>Pacientes Ativos</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{estatisticas.resumo.taxaCancelamento}%</div>
                                    <div className={styles.statLabel}>Taxa Cancelamento</div>
                                </div>
                            </div>

                            {/* Gráfico de Consultas por Mês */}
                            <div className={styles.chartSection}>
                                <h2 className={styles.sectionTitle}>Consultas por Mês</h2>
                                <div className={styles.barChart}>
                                    {estatisticas.consultasPorMes.map((item, index) => (
                                        <div key={index} className={styles.barColumn}>
                                            <div className={styles.barWrapper}>
                                                <div 
                                                    className={styles.bar}
                                                    style={{ height: `${(item.quantidade / maxConsultasMes) * 100}%` }}
                                                >
                                                    <span className={styles.barValue}>{item.quantidade}</span>
                                                </div>
                                            </div>
                                            <span className={styles.barLabel}>{item.mes}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.twoColumns}>
                                {/* Consultas por Dia da Semana */}
                                <div className={styles.chartSection}>
                                    <h2 className={styles.sectionTitle}>Consultas por Dia</h2>
                                    <div className={styles.barChart}>
                                        {estatisticas.consultasPorDia.map((item, index) => (
                                            <div key={index} className={styles.barColumn}>
                                                <div className={styles.barWrapper}>
                                                    <div 
                                                        className={styles.bar}
                                                        style={{ height: `${(item.quantidade / maxConsultasDia) * 100}%` }}
                                                    >
                                                        <span className={styles.barValue}>{item.quantidade}</span>
                                                    </div>
                                                </div>
                                                <span className={styles.barLabel}>{item.dia}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Especialidades */}
                                <div className={styles.chartSection}>
                                    <h2 className={styles.sectionTitle}>Consultas por Especialidade</h2>
                                    <div className={styles.especialidadesList}>
                                        {estatisticas.especialidades.map((esp, index) => (
                                            <div key={index} className={styles.especialidadeItem}>
                                                <div className={styles.especialidadeInfo}>
                                                    <div 
                                                        className={styles.especialidadeColor}
                                                        style={{ backgroundColor: esp.cor }}
                                                    ></div>
                                                    <span className={styles.especialidadeNome}>{esp.nome}</span>
                                                </div>
                                                <div className={styles.especialidadeBar}>
                                                    <div 
                                                        className={styles.especialidadeProgress}
                                                        style={{ 
                                                            width: `${(esp.quantidade / estatisticas.resumo.totalConsultas) * 100}%`,
                                                            backgroundColor: esp.cor
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className={styles.especialidadeQuantidade}>{esp.quantidade}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Horários de Pico */}
                            <div className={styles.chartSection}>
                                <h2 className={styles.sectionTitle}>Horários de Pico</h2>
                                <div className={styles.barChart}>
                                    {estatisticas.horariosPico.map((item, index) => (
                                        <div key={index} className={styles.barColumn}>
                                            <div className={styles.barWrapper}>
                                                <div 
                                                    className={styles.bar}
                                                    style={{ height: `${(item.quantidade / maxConsultasHora) * 100}%` }}
                                                >
                                                    <span className={styles.barValue}>{item.quantidade}</span>
                                                </div>
                                            </div>
                                            <span className={styles.barLabel}>{item.horario}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
