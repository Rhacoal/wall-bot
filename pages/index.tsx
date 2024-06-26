import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
    return <div className={styles.container}>
        <Head>
            <title>Wall-Bot</title>
            <meta name="description" content="Send yourself messages!"/>
        </Head>
        <main className={styles.main}>
            <h1 className={styles.title}>
                Wall-Bot
            </h1>

            <p className={styles.description}>
                Send yourself messages with a simple API
            </p>
        </main>
        <footer className={styles.footer}>
            <a
                href="https://github.com/Rhacoal/wall-bot"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <span className={styles.logo}><Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/></span>
            </a>
        </footer>
    </div>
}
