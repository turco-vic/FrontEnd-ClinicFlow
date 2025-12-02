"use client";

import { useEffect, useState } from "react";
import styles from "./MeusAgendamentos.module.css";
import Header from "@/components/Header";
import { Input } from "antd";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

export default function MeusAgendamentos() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        console.log("Carregando agendamentos de:", `${apiBase}/api/agendamentos`);

        const loggedPatientId = 1;

        fetch(`${apiBase}/api/agendamentos`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erro ao buscar agendamentos: ${res.status}`);
                }
                return res.json();
            })
            .then(async (data) => {
                console.log("Agendamentos recebidos:", data);
                
                if (!Array.isArray(data)) {
                    setSchedules([]);
                    return;
                }

                const mySchedules = data.filter(
                    (schedule) => schedule.patient_id === loggedPatientId
                );

                console.log("Meus agendamentos:", mySchedules);

                const schedulesWithDetails = await Promise.all(
                    mySchedules.map(async (schedule) => {
                        try {
                            const doctorRes = await fetch(
                                `${apiBase}/api/medicos/${schedule.doctor_id}`
                            );
                            const doctorData = doctorRes.ok 
                                ? await doctorRes.json() 
                                : null;

                            let specialtyData = null;
                            if (doctorData?.especialty_id) {
                                const specialtyRes = await fetch(
                                    `${apiBase}/api/especialidades/${doctorData.especialty_id}`
                                );
                                specialtyData = specialtyRes.ok 
                                    ? await specialtyRes.json() 
                                    : null;
                            }

                            return {
                                ...schedule,
                                doctor_name: doctorData?.name || `Dr. #${schedule.doctor_id}`,
                                doctor_crm: doctorData?.crm || "CRM 123456",
                                specialty_name: specialtyData?.especialty || "Especialidade",
                            };
                        } catch (err) {
                            console.error(`Erro ao buscar detalhes do agendamento ${schedule.id}:`, err);
                            return {
                                ...schedule,
                                doctor_name: `Dr. #${schedule.doctor_id}`,
                                doctor_crm: "CRM 123456",
                                specialty_name: "Especialidade",
                            };
                        }
                    })
                );

                console.log("Agendamentos com detalhes:", schedulesWithDetails);
                setSchedules(schedulesWithDetails);
            })
            .catch((err) => {
                console.error("Erro ao carregar agendamentos:", err);
                setError(err.message || "Erro ao carregar agendamentos.");
            })
            .finally(() => setLoading(false));
    }, []);

    // Função de filtro melhorada
    const filteredSchedules = schedules.filter((schedule) => {
        if (!search.trim()) return true;

        const searchTerm = search.toLowerCase().trim();
        
        // Buscar em múltiplos campos
        const doctorName = (schedule.doctor_name || "").toLowerCase();
        const specialtyName = (schedule.specialty_name || "").toLowerCase();
        const crm = (schedule.doctor_crm || "").toLowerCase();
        const date = schedule.consult_date 
            ? new Date(schedule.consult_date).toLocaleDateString("pt-BR")
            : "";

        return (
            doctorName.includes(searchTerm) ||
            specialtyName.includes(searchTerm) ||
            crm.includes(searchTerm) ||
            date.includes(searchTerm)
        );
    });

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
                        {["", "", "", ""].map((_, index) => (
                            <div key={index} className={styles.filterTagPlaceholder} />
                        ))}
                    </div>
                    
                    <Input 
                        size="large" 
                        placeholder="Buscar por médico, especialidade, CRM ou data..." 
                        prefix={
                            <FaSearch
                                size={18}
                                color="#666"
                                style={{ marginRight: 8 }}
                            />
                        }
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        allowClear
                    />
                </div>

                <div className={styles.card}>
                    {loading && <p>Carregando agendamentos...</p>}

                    {error && !loading && (
                        <p style={{ color: "red" }}>{error}</p>
                    )}

                    {!loading && !error && filteredSchedules.length === 0 && search.trim() && (
                        <p>Nenhum agendamento encontrado para "{search}".</p>
                    )}

                    {!loading && !error && filteredSchedules.length === 0 && !search.trim() && (
                        <p>Você ainda não possui agendamentos.</p>
                    )}

                    {!loading && !error && filteredSchedules.length > 0 && (
                        <>
                            {search.trim() && (
                                <p style={{ marginBottom: '1rem', color: '#666' }}>
                                    {filteredSchedules.length} agendamento(s) encontrado(s)
                                </p>
                            )}
                            <div className={styles.list}>
                                {filteredSchedules.map((schedule) => {
                                    const dateBR = schedule.consult_date
                                        ? new Date(schedule.consult_date).toLocaleDateString("pt-BR")
                                        : "--/--/----";
                                    const hour = schedule.consult_hour
                                        ? schedule.consult_hour.slice(0, 5) + "h"
                                        : "--:--h";

                                    return (
                                        <div
                                            key={schedule.id}
                                            className={styles.scheduleItem}
                                        >
                                           
                                            <div className={styles.scheduleHeader}>
                                                <span className={styles.tagEspecialidade}>
                                                    ❤️ {schedule.specialty_name}
                                                </span>

                                                <span className={styles.tagStatus}>
                                                    Agendada
                                                </span>
                                            </div>

                                          
                                            <div className={styles.scheduleDoctor}>
                                                <h3 className={styles.doctorName}>{schedule.doctor_name}</h3>
                                                <p className={styles.doctorCrm}>{schedule.doctor_crm}</p>
                                            </div>

                                            
                                            <div className={styles.scheduleDetails}>
                                                <div className={styles.detailBlock}>
                                                    <div className={styles.detailIcon}>
                                                        📅
                                                    </div>
                                                    <span className={styles.detailLabel}>Data</span>
                                                    <span className={styles.detailValue}>{dateBR}</span>
                                                </div>

                                                <div className={styles.detailBlock}>
                                                    <div className={styles.detailIcon}>
                                                        🕐
                                                    </div>
                                                    <span className={styles.detailLabel}>Horário</span>
                                                    <span className={styles.detailValue}>{hour}</span>
                                                </div>

                                                <div className={styles.detailBlock}>
                                                    <div className={styles.detailIcon}>
                                                        📍
                                                    </div>
                                                    <span className={styles.detailLabel}>Local</span>
                                                    <span className={styles.detailValue}>ClinicFlow</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}