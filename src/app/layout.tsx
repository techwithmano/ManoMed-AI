"use client";

import { useEffect, useRef } from "react";

export default function UnderMaintenance() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simple particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = "rgba(0,255,255,0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }, []);

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg, #02010a, #001f29, #000)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
      }}
    >
      {/* PARTICLES */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* GLASS CARD */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "2.5rem 3rem",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          boxShadow: "0 0 25px rgba(0,255,255,0.3)",
          animation: "fadeIn 1.5s ease",
        }}
      >
        {/* FLOATING WRENCH */}
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            animation: "float 3s ease-in-out infinite",
            textShadow: "0 0 15px #00f0ff",
          }}
        >
          🔧
        </div>

        {/* MAIN TITLE */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            marginBottom: "1rem",
            textShadow: "0 0 20px #00f0ff",
            animation: "pulse 2.2s infinite",
          }}
        >
          Under Maintenance
        </h1>

        {/* LOADER */}
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "5px solid rgba(0,255,255,0.3)",
            borderTop: "5px solid #00f0ff",
            borderRadius: "50%",
            margin: "1rem auto",
            animation: "spin 1s linear infinite",
          }}
        />

        {/* TEXT */}
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.2rem",
            color: "#a0e7ff",
            maxWidth: "300px",
          }}
        >
          We’re performing system upgrades and improvements.
        </p>

        <p
          style={{
            marginTop: "1.5rem",
            opacity: 0.7,
            fontSize: "1rem",
          }}
        >
          — ManoMed AI
        </p>
      </div>

      {/* KEYFRAME ANIMATIONS */}
      <style>{`
        @keyframes pulse {
          0% { text-shadow: 0 0 10px #00f0ff; }
          50% { text-shadow: 0 0 25px #00f0ff; }
          100% { text-shadow: 0 0 10px #00f0ff; }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        @keyframes spin {
          0% { transform: rotate(0); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
