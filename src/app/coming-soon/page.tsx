"use client";

import { useEffect, useState } from "react";

export default function ComingSoon() {
  const launchDate = new Date("2025-06-01T00:00:00+03:00").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const diff = launchDate - now;

    return diff > 0
      ? {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        }
      : null;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "none", // removed background
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
        🚀 Launching Soon 🚀
      </h1>

      {timeLeft ? (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            fontSize: "clamp(1.2rem, 5vw, 2rem)",
            fontWeight: "700",
            textShadow: "0 0 5px #00f0ff",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          aria-label="Countdown timer"
        >
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              style={{
                minWidth: "60px",
                padding: "0.5rem 1rem",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "8px",
                userSelect: "none",
              }}
            >
              <div>{(timeLeft as any)[unit]}</div>
              <small
                style={{
                  fontSize: "0.8rem",
                  textTransform: "capitalize",
                  color: "#a0e7ff",
                }}
              >
                {unit}
              </small>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>We are live! 🎉</p>
      )}

      <p
        style={{
          marginTop: "2rem",
          fontSize: "clamp(1rem, 4vw, 1.25rem)",
          maxWidth: "320px",
        }}
      >
        Stay tuned for something awesome.
        <br />
        — ManoMed AI Launch
      </p>
    </main>
  );
}
