import styles from "./Sobre.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Sobre() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                <div className={styles.contentWrapper}>
                    <div className={styles.textSection}>
                        <h1 className={styles.title}>
                            Clinic<br />Flow
                        </h1>
                        <p className={styles.description}>
                            O ClinicFlow é uma plataforma inovadora desenvolvida para revolucionar a gestão de consultas médicas e prontuários eletrônicos. 
                            Nosso sistema conecta pacientes e profissionais de saúde de maneira eficiente, oferecendo uma experiência digital completa 
                            e intuitiva. Com o ClinicFlow, você pode agendar consultas em poucos cliques, receber lembretes automáticos, acessar seu 
                            histórico médico de qualquer lugar e manter todos os seus dados de saúde organizados e seguros. Para os profissionais, 
                            oferecemos um painel completo de gestão, controle de agenda, prontuários digitais e ferramentas que otimizam o tempo e 
                            melhoram o atendimento. Nossa missão é tornar o cuidado com a saúde mais acessível, prático e humanizado através da tecnologia.
                        </p>
                    </div>
                    <div className={styles.logoSection}>
                        <div className={styles.logoContainer}>
                            <Image 
                                src="/images/logo.png" 
                                alt="ClinicFlow Logo" 
                                width={400} 
                                height={400}
                                className={styles.logoImage}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
