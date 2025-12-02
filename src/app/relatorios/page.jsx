"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './relatorio.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Relatorios() {
    const [medico, setMedico] = useState(null);
    const [tipoRelatorio, setTipoRelatorio] = useState('geral');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [relatorioGerado, setRelatorioGerado] = useState(null);
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
    }, []);

    const gerarRelatorio = () => {
        setCarregando(true);
        
        // Simulação de geração de relatório
        setTimeout(() => {
            const dadosSimulados = {
                tipo: tipoRelatorio,
                periodo: {
                    inicio: dataInicio,
                    fim: dataFim
                },
                estatisticas: {
                    totalConsultas: 145,
                    consultasRealizadas: 132,
                    consultasCanceladas: 13,
                    novosPacientes: 28,
                    pacientesAtivos: 87
                },
                topDiagnosticos: [
                    { nome: 'Hipertensão', quantidade: 23 },
                    { nome: 'Diabetes', quantidade: 18 },
                    { nome: 'Gripe', quantidade: 15 },
                    { nome: 'Dor de cabeça', quantidade: 12 },
                    { nome: 'Ansiedade', quantidade: 10 }
                ]
            };
            
            setRelatorioGerado(dadosSimulados);
            setCarregando(false);
        }, 2000);
    };

    const exportarPDF = () => {
        alert('Funcionalidade de exportação PDF em desenvolvimento');
    };

    const exportarExcel = () => {
        alert('Funcionalidade de exportação Excel em desenvolvimento');
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Relatórios</h1>
                            <p className={styles.subtitle}>
                                Gere e visualize relatórios detalhados sobre suas consultas
                            </p>
                        </div>
                        {medico && (
                            <div className={styles.medicoInfo}>
                                <p className={styles.medicoNome}>{medico.nome}</p>
                                <p className={styles.medicoRole}>Médico(a)</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.filterSection}>
                        <h2 className={styles.sectionTitle}>Configurar Relatório</h2>
                        
                        <div className={styles.filterGrid}>
                            <div className={styles.filterItem}>
                                <label className={styles.label}>Tipo de Relatório</label>
                                <select 
                                    className={styles.select}
                                    value={tipoRelatorio}
                                    onChange={(e) => setTipoRelatorio(e.target.value)}
                                >
                                    <option value="geral">Relatório Geral</option>
                                    <option value="consultas">Consultas Realizadas</option>
                                    <option value="pacientes">Novos Pacientes</option>
                                    <option value="diagnosticos">Diagnósticos Frequentes</option>
                                    <option value="financeiro">Relatório Financeiro</option>
                                </select>
                            </div>

                            <div className={styles.filterItem}>
                                <label className={styles.label}>Data Início</label>
                                <input 
                                    type="date"
                                    className={styles.dateInput}
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                />
                            </div>

                            <div className={styles.filterItem}>
                                <label className={styles.label}>Data Fim</label>
                                <input 
                                    type="date"
                                    className={styles.dateInput}
                                    value={dataFim}
                                    onChange={(e) => setDataFim(e.target.value)}
                                />
                            </div>
                        </div>

                        <button 
                            className={styles.generateButton}
                            onClick={gerarRelatorio}
                            disabled={carregando || !dataInicio || !dataFim}
                        >
                            {carregando ? 'Gerando...' : 'Gerar Relatório'}
                        </button>
                    </div>

                    {carregando && (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Gerando relatório...</p>
                        </div>
                    )}

                    {relatorioGerado && !carregando && (
                        <div className={styles.reportSection}>
                            <div className={styles.reportHeader}>
                                <h2 className={styles.sectionTitle}>Resultado do Relatório</h2>
                                <div className={styles.exportButtons}>
                                    <button className={styles.exportButton} onClick={exportarPDF}>
                                        📄 Exportar PDF
                                    </button>
                                    <button className={styles.exportButton} onClick={exportarExcel}>
                                        📊 Exportar Excel
                                    </button>
                                </div>
                            </div>

                            <div className={styles.reportInfo}>
                                <p><strong>Tipo:</strong> {tipoRelatorio.charAt(0).toUpperCase() + tipoRelatorio.slice(1)}</p>
                                <p><strong>Período:</strong> {dataInicio} até {dataFim}</p>
                            </div>

                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{relatorioGerado.estatisticas.totalConsultas}</div>
                                    <div className={styles.statLabel}>Total de Consultas</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{relatorioGerado.estatisticas.consultasRealizadas}</div>
                                    <div className={styles.statLabel}>Consultas Realizadas</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{relatorioGerado.estatisticas.consultasCanceladas}</div>
                                    <div className={styles.statLabel}>Consultas Canceladas</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{relatorioGerado.estatisticas.novosPacientes}</div>
                                    <div className={styles.statLabel}>Novos Pacientes</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statNumber}>{relatorioGerado.estatisticas.pacientesAtivos}</div>
                                    <div className={styles.statLabel}>Pacientes Ativos</div>
                                </div>
                            </div>

                            <div className={styles.diagnosticSection}>
                                <h3 className={styles.subsectionTitle}>Top 5 Diagnósticos</h3>
                                <div className={styles.diagnosticList}>
                                    {relatorioGerado.topDiagnosticos.map((diag, index) => (
                                        <div key={index} className={styles.diagnosticItem}>
                                            <span className={styles.diagnosticRank}>{index + 1}º</span>
                                            <span className={styles.diagnosticName}>{diag.nome}</span>
                                            <span className={styles.diagnosticCount}>{diag.quantidade} casos</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
