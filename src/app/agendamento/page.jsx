import Link from "next/link";
import styles from "./Agendamento.module.css"
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "@/components/Footer";

export default function Agendamento() {
    const days = [
        { day: 'Seg', date: '27/10/25', slots: [
            { time: '08:00', status: 'unavailable' },
            { time: '09:00', status: 'available' },
            { time: '10:00', status: 'unavailable' },
            { time: '11:00', status: 'available' },
        ]},
        { day: 'Ter', date: '28/10/25', slots: [
            { time: '08:00', status: 'available' },
            { time: '09:00', status: 'unavailable' },
            { time: '10:00', status: 'unavailable' },
            { time: '11:00', status: 'available' },
        ]},
        { day: 'Qua', date: '29/10/25', slots: [
            { time: '08:00', status: 'available' },
            { time: '09:00', status: 'available' },
            { time: '10:00', status: 'available' }, // Highlighted in image
            { time: '11:00', status: 'unavailable' },
        ]},
        { day: 'Qui', date: '30/10/25', slots: [
            { time: '08:00', status: 'available' },
            { time: '09:00', status: 'available' },
            { time: '10:00', status: 'unavailable' },
            { time: '11:00', status: 'available' },
        ]},
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <Image 
                        src="/image/image.png"
                        alt="Logo ClinicFlow"
                        width={70}
                        height={70}
                    />
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.leftColumn}>
                    <div className={styles.profileContainer}>
                        <div className={styles.content}>
                        </div>
                        <div className={styles.textContainer}>
                            <h1 className={styles.titleDr}>
                                Dr. Cadu
                            </h1>

                            <h6 className={styles.subtitleDr}>
                                Médico Cardiologista CRM 123456
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
                    
                    <div className={styles.calendarWrapper}>
                        <button className={styles.navButton}><FaChevronLeft /></button>
                        
                        <div className={styles.daysContainer}>
                            {days.map((dayInfo, index) => (
                                <div key={index} className={styles.dayColumn}>
                                    <div className={styles.dayHeader}>
                                        <span className={styles.dayName}>{dayInfo.day}</span>
                                        <span className={styles.dayDate}>{dayInfo.date}</span>
                                    </div>
                                    <div className={styles.slots}>
                                        {dayInfo.slots.map((slot, idx) => (
                                            <button 
                                                key={idx} 
                                                className={`${styles.timeSlot} ${styles[slot.status]}`}
                                            >
                                                {slot.time}
                                            </button>
                                        ))}
                                        <button className={`${styles.timeSlot} ${styles.more}`}>Mais ...</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className={styles.navButton}><FaChevronRight /></button>
                    </div>

                    <button className={styles.confirmButton}>Agendar</button>
                </div>

            </main>
            <Footer />
        </div>
    );  
}