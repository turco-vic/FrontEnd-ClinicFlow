import styles from '../styles/EspecialidadesCard.module.css'

export default function EspecialidadesCard({ especialty }) {
    return (
        <div className={styles.container}>
            {especialty}
        </div>
    )
}