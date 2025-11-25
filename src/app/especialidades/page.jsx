"use client"

import { Modal, Spin } from "antd"
import styles from './especialidades.module.css'
import EspecialidadesCard from "@/components/EspecialidadesCard"
import { useState, useEffect } from "react"
import axios from "axios"



export default function Especialidades() {
    const [especialidades, setEspecialidades] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchEspecialidades()
    }, [])

    async function fetchEspecialidades() {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:4000/api/especialidades')
            setEspecialidades(response.data)
        } catch (error) {
            console.error('Error fetching especialidades:', error)
        } finally {
            setLoading(false)
        }
    }
    console.log(especialidades)

    return (
        <div className={styles.home}>
            <div className={styles.grid}>
            {loading ? (
                <Spin />
            ) : (
                especialidades && especialidades.length > 0 ? (
                    especialidades.map((esp) => (
                        <EspecialidadesCard key={esp.id } especialty={esp.especialty} />
                    ))
                ) : (
                    <p>Nenhuma especialidade encontrada</p>
                )
            )}
            </div>
        </div>
    )
}