"use client";

export default function UnderMaintenance() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "none",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          marginBottom: "0.5rem",
          textShadow: "0 0 10px #00f0ff",
        }}
      >
        🛠️ Under Maintenance 🛠️
      </h1>

      <p
        style={{
          fontSize: "clamp(1.2rem, 5vw, 1.8rem)",
          marginTop: "1rem",
          maxWidth: "400px",
          color: "#a0e7ff",
        }}
      >
        We’re currently performing some upgrades.
        <br />
        Please check back soon.
      </p>

      <p
        style={{
          marginTop: "2rem",
          fontSize: "clamp(1rem, 4vw, 1.25rem)",
          maxWidth: "320px",
        }}
      >
        — ManoMed AI
      </p>
    </main>
  );
}
