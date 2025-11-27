"use client";

import { useEffect, useState } from "react";
import styles from "./Agendamento.module.css"
import Image from "next/image";
import Footer from "@/components/Footer";
import axios from "axios";
import { Calendar, TimePicker } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";

const API_BASE_URL = "http://localhost:3000";

export default function Agendamento() {
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

    const handleAgendar = () => {
        toast.success("Agendamento concluído com Sucesso!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const doctorResponse = await axios.get(`${API_BASE_URL}/api/doutores/1`);
                setDoctor(doctorResponse.data);

                const especialtyId = doctorResponse.data.especialty_id;
                const specialtyResponse = await axios.get(`${API_BASE_URL}/api/especialidades/${especialtyId}`);
                setSpecialty(specialtyResponse.data);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError(err.response?.data?.message || "Erro ao carregar dados");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className={styles.container}>Carregando...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.leftColumn}>
                    <div className={styles.profileContainer}>
                        <div className={styles.content}>
                            {doctor?.doctor_photo && (
                                <Image 
                                    src={doctor.doctor_photo}
                                    alt={`Foto de ${doctor.name}`}
                                    width={150}
                                    height={150}
                                    className={styles.doctorPhoto}
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec efficitur velit. Vivamus quis sem in leo molestie lacinia quis ac quam. Morbi in erat sagittis, fringilla enim a, pharetra metus. Praesent et urna maximus, blandit enim at, varius tellus. Fusce nec lectus eget neque laoreet elementum congue eu arcu. Aliquam ornare cursus tellus. Sed bibendum dignissim lacus eget hendrerit. Nullam at lacinia augue. Morbi et eleifend ligula.
                        </p>
                    </div>
                </div>

                <div className={styles.scheduleCard}>
                    <h2 className={styles.cardTitle}>Agendar Consulta</h2>
                    <Calendar 
                        fullscreen={false} 
                        onSelect={onSelectDate}
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
            <Footer />
            <ToastContainer />
        </div>
    );  
}