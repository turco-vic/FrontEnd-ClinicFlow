"use client";

import styles from './MeusAgendamentos.module.css'
import Header from '@/components/Header'
import { Input } from 'antd'
import { FaSearch, FaPlusCircle } from 'react-icons/fa'
import Link from 'next/link';       

export default function MeusAgendamentos() {
    return (
        <div className={styles.container}>
            <Header />
            
            <main className={styles.mainContent}>

                <div className={styles.agendamentoContainer}>
                    <h1 className={styles.pageTitle}>Meus Agendamentos</h1>

                    <Link href="/agendamento" className={styles.buttonConsulta}>
                        <FaPlusCircle size={23} color="#666" style={{ marginRight: 15 }} />
                        <h1 className={styles.buttonText}>Nova Consulta</h1>
                    </Link>
                </div>
    
                <div className={styles.filterContainer}>
                    <div className={styles.filterTags}>
                        {['', '', '', ''].map((_, index) => (
                            <div key={index} className={styles.filterTagPlaceholder} />
                        ))}
                    </div>
                    
                    <Input 
                        size="large" 
                        placeholder="Buscar por médico ou especialidade..." 
                        prefix={<FaSearch size={18} color="#666" style={{ marginRight: 8 }} />} 
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.card}>
                    
                </div>
            </main>
        </div>
    )
}