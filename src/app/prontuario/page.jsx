'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Prontuario.module.css';

export default function Prontuario() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('atendimento');
    const [agendaAtiva, setAgendaAtiva] = useState(true);
    
    const [segundos, setSegundos] = useState(0);
    const [ativo, setAtivo] = useState(true);
    
    const [queixaPrincipal, setQueixaPrincipal] = useState('');
    const [exameMedico, setExameMedico] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prescricao, setPrescricao] = useState('');
    const [conduta, setConduta] = useState('');
    
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [freqRespiratoria, setFreqRespiratoria] = useState('');
    const [freqCardiaca, setFreqCardiaca] = useState('');
    
    const [exameData, setExameData] = useState('');
    const [exameMes, setExameMes] = useState('');
    const [exameTipo, setExameTipo] = useState('');

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [primeiraConsulta, setPrimeiraConsulta] = useState('');
    const [observacao, setObservacao] = useState('');
    const [faltas, setFaltas] = useState('');
    const [apontamentos, setApontamentos] = useState('');
    const [atendimentos, setAtendimentos] = useState('');

    const medidas = [
        { label: "Peso", valor: peso, setValue: setPeso, unidade: "KG" },
        { label: "Altura", valor: altura, setValue: setAltura, unidade: "CM" },
        { label: "Freq. Respiratória", valor: freqRespiratoria, setValue: setFreqRespiratoria, unidade: "RPM" },
        { label: "Freq. Cardíaca", valor: freqCardiaca, setValue: setFreqCardiaca, unidade: "BPM" }
    ];

    useEffect(() => {
        try {
            const userStorage = sessionStorage.getItem('user');
            
            if (!userStorage) {
               
                router.push('/login');
                return;
            }

            const userData = JSON.parse(userStorage);
            
            
            if (!userData || !userData.user || !userData.user.role) {
                router.push('/login');
                return;
            }
          
            if (userData.user.role !== 'MEDICO') {
               
                router.push('/sobre');
                return;
            }
        } catch (error) {
            console.error('Erro ao verificar acesso ao prontuário:', error);
            router.push('/login');
        }
    }, [router]);

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.layout}>
                
                    <aside className={styles.sidebar}>
                        <div className={styles.logo}>
                            <div className={styles.logoIcon}>
                                <Image 
                                    src="/images/logo.png" 
                                    alt="ClinicFlow Logo" 
                                    width={140} 
                                    height={140}
                                    priority
                                />
                            </div>
                        </div>

                        <nav className={styles.nav}>
                            <button 
                                className={styles.navItem}
                                onClick={() => window.location.href = '/agendamento'}
                            >
                                <span>Agenda</span>
                            </button>
                            <button 
                                className={styles.navItem}
                                onClick={() => window.location.href = '/pacientes'}
                            >
                                <span>Pacientes</span>
                            </button>
                            <button className={styles.navItem}
                            onClick={() => window.location.href = '/estatisticas'}
                            >
                                <span>Estatísticas</span>
                            </button>
                            <button className={styles.navItem}
                            onClick={() => window.location.href = '/relatorios'}
                            >
                                <span>Relatórios</span>
                            </button>
                            <button className={styles.navItem}>
                                <span>Configurações</span>
                            </button>
                        </nav>
                    </aside>

                 
                    <div className={styles.content}>
                      
                        <div className={styles.pacienteCard}>
                            <input 
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className={styles.pacienteNomeInput}
                                placeholder="Nome do Paciente"
                            />
                            
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Idade:</span>
                                    <input 
                                        type="text"
                                        value={idade}
                                        onChange={(e) => setIdade(e.target.value)}
                                        className={styles.infoInput}
                                        placeholder="00"
                                    />
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Faltas:</span>
                                    <input 
                                        type="text"
                                        value={faltas}
                                        onChange={(e) => setFaltas(e.target.value)}
                                        className={styles.infoInput}
                                        placeholder="0"
                                    />
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Telefone:</span>
                                    <input 
                                        type="text"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                        className={styles.infoInput}
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Apontamentos:</span>
                                    <input 
                                        type="text"
                                        value={apontamentos}
                                        onChange={(e) => setApontamentos(e.target.value)}
                                        className={styles.infoInput}
                                        placeholder="0"
                                    />
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Primeira Consulta:</span>
                                    <input 
                                        type="text"
                                        value={primeiraConsulta}
                                        onChange={(e) => setPrimeiraConsulta(e.target.value)}
                                        className={styles.infoInput}
                                        placeholder="00/00/0000"
                                    />
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Atendimentos:</span>
                                    <input 
                                        type="text"
                                        value={atendimentos}
                                        onChange={(e) => setAtendimentos(e.target.value)}
                                        className={styles.infoInput}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className={styles.observacao}>
                                <span className={styles.infoLabel}>Observação:</span>
                                <input 
                                    type="text"
                                    value={observacao}
                                    onChange={(e) => setObservacao(e.target.value)}
                                    className={styles.observacaoInput}
                                    placeholder="Digite as observações"
                                />
                            </div>
                        </div>

                       
                        <div className={styles.tabMenu}>
                            <button 
                                className={activeTab === 'atendimento' ? styles.tabActive : styles.tab}
                                onClick={() => setActiveTab('atendimento')}
                            >
                                Atendimento
                            </button>
                            <button 
                                className={activeTab === 'editar' ? styles.tabActive : styles.tab}
                                onClick={() => setActiveTab('editar')}
                            >
                                Editar
                            </button>
                            <button 
                                className={activeTab === 'anexos' ? styles.tabActive : styles.tab}
                                onClick={() => setActiveTab('anexos')}
                            >
                                Anexos
                            </button>
                            <button 
                                className={activeTab === 'historico' ? styles.tabActive : styles.tab}
                                onClick={() => setActiveTab('historico')}
                            >
                                Histórico
                            </button>
                            <button 
                                className={activeTab === 'anotacoes' ? styles.tabActive : styles.tab}
                                onClick={() => setActiveTab('anotacoes')}
                            >
                                Anotações
                            </button>
                            <button 
                                className={activeTab === 'imprimir' ? styles.tabActive : styles.tab}
                                onClick={() => setActiveTab('imprimir')}
                            >
                                Imprimir
                            </button>
                        </div>

                      
                        {activeTab === 'atendimento' && (
                            <>
                                <div className={styles.resumoSection}>
                                    <h3 className={styles.sectionTitle}>Atendimento</h3>
                                    
                                    <div className={styles.resumoItem}>
                                        <h4 className={styles.resumoLabel}>Queixa principal</h4>
                                        <textarea 
                                            className={styles.resumoTextarea}
                                            value={queixaPrincipal}
                                            onChange={(e) => setQueixaPrincipal(e.target.value)}
                                            placeholder="Ex: Dor abdominal há 2 dias"
                                            rows={3}
                                        />
                                    </div>

                                    <div className={styles.resumoItem}>
                                        <h4 className={styles.resumoLabel}>Exame físico</h4>
                                        <textarea 
                                            className={styles.resumoTextarea}
                                            value={exameMedico}
                                            onChange={(e) => setExameMedico(e.target.value)}
                                            placeholder="Observações do exame"
                                            rows={3}
                                        />
                                    </div>

                                    <div className={styles.resumoItem}>
                                        <h4 className={styles.resumoLabel}>Diagnóstico</h4>
                                        <textarea 
                                            className={styles.resumoTextarea}
                                            value={diagnostico}
                                            onChange={(e) => setDiagnostico(e.target.value)}
                                            placeholder="Diagnóstico do paciente"
                                            rows={3}
                                        />
                                    </div>

                                    <div className={styles.resumoItem}>
                                        <h4 className={styles.resumoLabel}>Prescrição</h4>
                                        <textarea 
                                            className={styles.resumoTextarea}
                                            value={prescricao}
                                            onChange={(e) => setPrescricao(e.target.value)}
                                            placeholder="Medicamentos e posologia"
                                            rows={4}
                                        />
                                    </div>

                                    <div className={styles.resumoItem}>
                                        <h4 className={styles.resumoLabel}>Conduta</h4>
                                        <textarea 
                                            className={styles.resumoTextarea}
                                            value={conduta}
                                            onChange={(e) => setConduta(e.target.value)}
                                            placeholder="Orientações ao paciente"
                                            rows={3}
                                        />
                                    </div>
                                </div>

                               
                                <div className={styles.bottomSection}>
                                    <div className={styles.examesCard}>
                                        <h4 className={styles.cardTitle}>Exames</h4>
                                        <div className={styles.exameItem}>
                                            <div className={styles.exameDate}>
                                                <input 
                                                    type="text" 
                                                    value={exameData}
                                                    onChange={(e) => setExameData(e.target.value)}
                                                    className={styles.exameDay}
                                                    placeholder="00"
                                                    maxLength="2"
                                                />
                                                <input 
                                                    type="text" 
                                                    value={exameMes}
                                                    onChange={(e) => setExameMes(e.target.value)}
                                                    className={styles.exameMonth}
                                                    placeholder="Mês"
                                                />
                                            </div>
                                            <div className={styles.exameTipo}>
                                                <span>Exame</span>
                                                <input 
                                                    type="text" 
                                                    value={exameTipo}
                                                    onChange={(e) => setExameTipo(e.target.value)}
                                                    className={styles.exameTipoInput}
                                                    placeholder="Tipo"
                                                    style={{ width: '95px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.medidasCard}>
                                        <h4 className={styles.cardTitle}>Medidas</h4>
                                        {medidas.map((medida, index) => (
                                            <div key={index} className={styles.medidaItem}>
                                                <span className={styles.medidaLabel}>{medida.label}</span>
                                                <div className={styles.medidaValor}>
                                                    <input 
                                                        type="text" 
                                                        value={medida.valor} 
                                                        onChange={(e) => medida.setValue(e.target.value)}
                                                        className={styles.medidaInput}
                                                        placeholder="0"
                                                    />
                                                    <span className={styles.medidaUnidade}>{medida.unidade}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                       
                        {activeTab === 'editar' && (
                            <div className={styles.tabContent}>
                                <p>Conteúdo da aba Editar</p>
                            </div>
                        )}

                        {activeTab === 'anexos' && (
                            <div className={styles.tabContent}>
                                <p>Conteúdo da aba Anexos</p>
                            </div>
                        )}

                        {activeTab === 'historico' && (
                            <div className={styles.tabContent}>
                                <p>Conteúdo da aba Histórico</p>
                            </div>
                        )}

                        {activeTab === 'anotacoes' && (
                            <div className={styles.tabContent}>
                                <p>Conteúdo da aba Anotações</p>
                            </div>
                        )}

                        {activeTab === 'imprimir' && (
                            <div className={styles.tabContent}>
                                <p>Conteúdo da aba Imprimir</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}