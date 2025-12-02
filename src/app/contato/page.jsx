"use client";

import React from "react";
import { Button, Input } from "antd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./contato.module.css";

export default function ContatoPage() {
    return (
        <main className={styles.page}>
            <Header />

            <div className={styles.main}>
                <div className={styles.container}>

                    <h1 className={styles.title}>Contato</h1>

                    <div className={styles.espaçamento}>
                        <label>Nome completo</label>
                        <div>
                            <Input placeholder="Digite seu nome completo" />
                        </div>
                    </div>

                    <div className={styles.espaçamento}>
                        <label>Email</label>
                        <div>
                            <Input placeholder="Digite seu email" />
                        </div>
                    </div>

                    <div className={styles.espaçamento}>
                        <label>Mensagem</label>
                        <div>
                            <Input.TextArea rows={6} placeholder="Escreva sua mensagem..." />
                        </div>
                    </div>

                    <div>
                        <Button type="primary">Enviar</Button>
                        <Button>Limpar</Button>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}