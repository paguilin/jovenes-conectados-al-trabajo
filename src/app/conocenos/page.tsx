import Image from 'next/image';
import styles from './conocenos.module.css';

export default function Conocenos() {
  return (
    <main className={styles.container}>
      <section className={styles.introSection}>
        <h1>Conócenos</h1>
        <p>
          Somos un equipo comprometido con la creación de experiencias digitales conscientes, funcionales y humanas.
        </p>
      </section>

      <section className={styles.visionSection}>
        <h2>🌟 Nuestra Misión</h2>
        <p>
          Construir experiencias digitales limpias, útiles y humanas que respeten el entorno y eleven a quienes las usan.
        </p>

        <h2>🚀 Nuestra Visión</h2>
        <p>
          Ser una comunidad de creadores que fusionan tecnología responsable con propósito social, transformando el mundo proyecto a proyecto.
        </p>

        <h2>💫 Nuestros Valores</h2>
        <ul>
          <li>🌱 Sustentabilidad</li>
          <li>🧠 Aprendizaje continuo</li>
          <li>🤝 Colaboración</li>
          <li>🧘‍♀️ Consciencia digital</li>
        </ul>
      </section>

      <footer className={styles.credits}>
        <p>
          Creada por <strong>Jesus Bladimir Ortiz Reyes</strong> con la ayuda de Gerardo Rodriguez, Javier Baxin, Yesenia Guadalupe, Alejandro Rueda.
        </p>
        <p className={styles.signature}>
          Hecho con tecnologías limpias, pensadas para no dañar tanto al mundo 🌎
        </p>
      </footer>

      <div className={styles.techStack}>
        <p>Tecnologías utilizadas:</p>
        <div className={styles.logoRow}>
          <Image src="/logos/nextjs.svg" alt="Next.js" width={50} height={50} />
          <Image src="/logos/firebase.svg" alt="Firebase" width={50} height={50} />
          <Image src="/logos/firestore.svg" alt="Firestore" width={50} height={50} />
          <Image src="/logos/storage.svg" alt="Firebase Storage" width={50} height={50} />
          {/* Puedes agregar más logos si usaste otras herramientas */}
        </div>
      </div>
    </main>
  );
}