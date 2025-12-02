"use client"

import { Spin } from "antd"
import Link from "next/link"
import { useParams } from "next/navigation"
import styles from './especialidadesm.module.css'
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios"
import React from "react"
import { useRouter } from "next/navigation"

// ...existing code...
export default function EspecialidadePage() {
    const params = useParams()
    const id = params?.id
    const router = useRouter()

    const [medicos, setMedicos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function fetchDoctorsByEspecialty(especialtyId) {
        if (!especialtyId) {
            console.log('fetch aborted: missing specialtyId')
            return
        }

        const url = `http://localhost:4000/api/medicos/especialty/${encodeURIComponent(especialtyId)}`
        console.log('Fetching doctors from:', url)

        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(url)
            console.log('API response status:', response.status)
            setMedicos(response.data || [])
        } catch (err) {
            if (err.response) {
                console.error('API error status:', err.response.status, err.response.data)
                if (err.response.status === 404) {
                    setError('Recurso não encontrado (404). Verifique se a rota da API e o id estão corretos.')
                } else {
                    setError(`Erro na API: ${err.response.status}`)
                }
            } else {
                console.error('Network or other error:', err)
                setError('Erro de rede ao tentar conectar com a API.')
            }
            setMedicos([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log('route id param:', id)
        fetchDoctorsByEspecialty(id)
    }, [id])

    return (
        <div className={styles.home}>
            <h2>Médicos da especialidade</h2>
            <button onClick={() => router.back()} className={styles.backButton}>
                Voltar
            </button>
            {loading && <Spin />}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className={styles.grid}>
                {!loading && medicos && medicos.length > 0 ? (
                    medicos.map((doc) => {
                        return (
                            <Link key={doc.id} href={`/agendamento?doctorId=${doc.id}`}>
                                <div className={styles.doctorcard} >
                                    <h1 className={styles.titulo}>{doc.name}</h1>                                        
                                    <Image
                                        src={doc.doctor_photo ? `${doc.doctor_photo}` : '/images/image.png'}
                                        alt={doc.name || 'Foto do médico'}
                                        width={100}
                                        height={100}
                                        className={styles.doctorImage}
                                    />
                                </div>
                                
                            </Link>
                        )
                    })
                ) : (
                    !loading && <p>Nenhum médico encontrado para esta especialidade.</p>
                )}
            </div>
        </div>
    )
}