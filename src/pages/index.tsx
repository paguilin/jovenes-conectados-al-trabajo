import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🏠 Inicio</h1>
      <p>
        Ir a <Link href="/login">Login</Link>
      </p>
    </div>
  );
}