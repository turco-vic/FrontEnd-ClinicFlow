"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./Agendamento.module.css"
import Image from "next/image";
import Footer from "@/components/Footer";
import { Calendar, TimePicker } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";

export default function Agendamento() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get("doctorId");

    const [doctor, setDoctor] = useState(null);
    const [specialty, setSpecialty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const onSelectDate = (date) => {
        setSelectedDate(date);
        console.log("Data selecionada:", date.format("YYYY-MM-DD"));
    };

    const onSelectTime = (time) => {
        setSelectedTime(time);
        console.log("Hora selecionada:", time?.format("HH:mm"));
    };

    const handleAgendar = async () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Por favor, selecione data e horário!", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        if (!doctor) {
            toast.error("Dados do médico não carregados.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        const patientId = 1;

        const payload = {
            patient_id: patientId,                            
            doctor_id: doctor.id,                              
            consult_date: selectedDate.format("YYYY-MM-DD"),  
            consult_hour: selectedTime.format("HH:mm"),        
        };

        try {
            const apiBase = process.env.NEXT_PUBLIC_API_URL;

            const response = await fetch(`${apiBase}/api/agendamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => "");
                throw new Error(
                    `Erro ao salvar agendamento (${response.status}) ${text && "- " + text}`
                );
            }

            const created = await response.json().catch(() => null);
            console.log("Agendamento criado:", created);

            toast.success(
                <div>
                    <strong>Agendamento concluído</strong>
                    <div style={{ marginTop: 6, fontSize: 13 }}>
                        Seu agendamento foi realizado com sucesso. Caso queira, você pode ver sua consulta em <a href="/meus-agendamentos" style={{ color: '#2CA5A6', textDecoration: 'none' }}>Minhas Consultas</a>.
                    </div>
                </div>,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );

            setSelectedDate(null);
            setSelectedTime(null);

        } catch (err) {
            console.error("Erro ao criar agendamento:", err);
            toast.error(err.message || "Erro ao realizar agendamento.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    useEffect(() => {
        
        if (!doctorId) {
            setError("Nenhum médico selecionado. Por favor, escolha um médico.");
            setLoading(false);
            return;
        }

        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        console.log("API URL:", apiBase);
        console.log("Doctor ID da URL:", doctorId);
        
        fetch(`${apiBase}/api/medicos/${doctorId}`)
            .then((res) => {
                console.log("Response status:", res.status);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((doctorData) => {
                console.log("Doctor data recebido:", doctorData);
                if (doctorData) {
                
                    const doctorWithPhoto = {
                        ...doctorData,
                        doctor_photo: doctorData.doctor_photo 
                            ? `${apiBase}${doctorData.doctor_photo.startsWith('/') ? '' : '/'}${doctorData.doctor_photo}`
                            : null
                    };
                    
                    setDoctor(doctorWithPhoto);
                    
                    const especialtyId = doctorData.especialty_id;
                    console.log("Specialty ID:", especialtyId);
                    
                    if (especialtyId) {
                        return fetch(`${apiBase}/api/especialidades/${especialtyId}`);
                    } else {
                        throw new Error('Specialty ID não encontrado');
                    }
                } else {
                    throw new Error('Dados do médico não encontrados');
                }
            })
            .then((res) => {
                console.log("Specialty response status:", res?.status);
                if (res && !res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res?.json();
            })
            .then((specialtyData) => {
                console.log("Specialty data recebido:", specialtyData);
                setSpecialty(specialtyData);
            })
            .catch((err) => {
                console.error("Erro detalhado:", err);
                console.error("Erro message:", err.message);
                setError(`Erro ao carregar dados: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [doctorId]); 

    if (loading) {
        return <div className={styles.container}>Carregando...</div>;
    }

    if (error) {
        return (
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <p style={{ color: "red" }}>{error}</p>
                    <button onClick={() => window.history.back()}>Voltar</button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.leftColumn}>
                    <div className={styles.profileContainer}>
                        <div className={styles.content}>
                            {doctor?.doctor_photo && (
                                <img 
                                    src={doctor.doctor_photo}
                                    alt={`Foto de ${doctor.name}`}
                                    width={150}
                                    height={150}
                                    className={styles.doctorPhoto}
                                    onError={(e) => {
                                        console.error("Erro ao carregar imagem:", doctor.doctor_photo);
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}
                        </div>
                        <div className={styles.textContainer}>
                            <h1 className={styles.titleDr}>
                                {doctor?.name || "Médico"}
                            </h1>

                            <h6 className={styles.subtitleDr}>
                                {specialty?.especialty || "Especialidade"}
                            </h6>
                        </div>
                    </div>

                    <div className={styles.description}>
                        <h4 className={styles.titleDescription}>
                            Descrição:
                        </h4>
                        <p className={styles.descriptionText}>
                            Médico(a) especializado(a) com ampla experiência no atendimento clínico e diagnóstico. 
                            Formação acadêmica sólida e constante atualização em práticas médicas modernas. 
                            Comprometido(a) com o cuidado humanizado e a excelência no tratamento dos pacientes, 
                            sempre buscando oferecer soluções personalizadas e eficazes para cada caso. 
                            Atende com foco em prevenção, diagnóstico preciso e acompanhamento contínuo da saúde.
                        </p>
                    </div>
                </div>

                <div className={styles.scheduleCard}>
                    <h2 className={styles.cardTitle}>Agendar Consulta</h2>
                    <Calendar 
                        fullscreen={false} 
                        onSelect={onSelectDate}
                        value={selectedDate}
                    />
                    
                    <div style={{ marginTop: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                            Selecione o horário:
                        </label>
                        <TimePicker 
                            format="HH:mm"
                            minuteStep={30}
                            placeholder="Horário"
                            onChange={onSelectTime}
                            value={selectedTime}
                            style={{ width: '100%' }}
                        />
                    </div>

                    {(selectedDate || selectedTime) && (
                        <p style={{ marginTop: '15px' }}>
                            {selectedDate && `Data: ${selectedDate.format("DD/MM/YYYY")}`}
                            {selectedDate && selectedTime && " - "}
                            {selectedTime && `Hora: ${selectedTime.format("HH:mm")}`}
                        </p>
                    )}
                    <button className={styles.confirmButton} onClick={handleAgendar}>Agendar</button>
                </div>

            </main>
            
            <ToastContainer />
            <Footer />
        </div>
    );  
}