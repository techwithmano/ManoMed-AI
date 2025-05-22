"use client";

import { useEffect, useState } from "react";

export default function ComingSoon() {
  // Set launch date: June 1, 2025 00:00:00
  const launchDate = new Date("2025-06-01T00:00:00Z").getTime();

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
        background:
          "radial-gradient(circle at center, #1e3c72, #2a5298, #1e3c72)",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
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
            gap: "1.5rem",
            fontSize: "2rem",
            fontWeight: "700",
            textShadow: "0 0 5px #00f0ff",
          }}
          aria-label="Countdown timer"
        >
          <div>
            <div>{timeLeft.days}</div>
            <small>Days</small>
          </div>
          <div>
            <div>{timeLeft.hours}</div>
            <small>Hours</small>
          </div>
          <div>
            <div>{timeLeft.minutes}</div>
            <small>Minutes</small>
          </div>
          <div>
            <div>{timeLeft.seconds}</div>
            <small>Seconds</small>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
          We are live! 🎉
        </p>
      )}

      <p style={{ marginTop: "2rem", fontSize: "1.25rem" }}>
        Stay tuned for something awesome.  
        <br />
        — ManoMed AI Launch
      </p>
    </main>
  );
}
