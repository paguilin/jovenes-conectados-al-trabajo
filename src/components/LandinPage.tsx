import styles from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>Jóvenes Conectados al Trabajo</h1>
        <p>Impulsando talento joven hacia nuevas oportunidades laborales.</p>
        <div className={styles.buttons}>
          <a href="/login" className={styles.btn}>Iniciar sesión</a>
          <a href="#" className={`${styles.btn} ${styles.ghost}`}>Conócenos</a>
        </div>
      </section>
    </main>
  )
}