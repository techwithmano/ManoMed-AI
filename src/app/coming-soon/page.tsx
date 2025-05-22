import { useEffect, useState } from 'react';

export default function ComingSoon() {
  // Set a future launch date (e.g., June 1, 2025)
  const launchDate = new Date('2025-06-01T00:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div style={styles.container}>
      <div style={styles.glitchContainer}>
        <h1 style={styles.glitchText} data-text="🚧 COMING SOON 🚧">
          🚧 COMING SOON 🚧
        </h1>
      </div>
      <p style={styles.subtext}>Something awesome is cooking... 🔥</p>

      <div style={styles.countdown}>
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, idx) => {
          const key = label.toLowerCase();
          return (
            <div key={label} style={styles.countdownItem}>
              <span style={styles.timeValue}>{(timeLeft as any)[key]}</span>
              <span style={styles.timeLabel}>{label}</span>
            </div>
          );
        })}
      </div>

      <p style={styles.footerText}>Stay tuned and get ready for 01/06/2025! 🚀</p>

      {/* Subtle background animation */}
      <style>{`
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 22%, 24%, 55% {
            opacity: 0.4;
          }
        }

        .glitch-text {
          position: relative;
          color: #00fff7;
          font-weight: 900;
          font-size: 4rem;
          animation: flicker 3s infinite;
          user-select: none;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          right: 0;
        }
        .glitch-text::before {
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
          clip: rect(44px, 450px, 56px, 0);
          color: #ff00c8;
          z-index: -1;
        }
        .glitch-text::after {
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
          clip: rect(85px, 450px, 140px, 0);
          color: #00ffea;
          z-index: -1;
        }

        @keyframes glitch-anim-1 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-5px, 5px);
          }
          40% {
            transform: translate(-5px, -5px);
          }
          60% {
            transform: translate(5px, 5px);
          }
          80% {
            transform: translate(5px, -5px);
          }
          100% {
            transform: translate(0);
          }
        }
        @keyframes glitch-anim-2 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(5px, -5px);
          }
          40% {
            transform: translate(5px, 5px);
          }
          60% {
            transform: translate(-5px, -5px);
          }
          80% {
            transform: translate(-5px, 5px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    background:
      'radial-gradient(circle at center, #0f2027, #203a43, #2c5364)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#00fff7',
    textAlign: 'center',
    padding: '2rem',
  },
  glitchContainer: {
    marginBottom: '1rem',
  },
  glitchText: {
    position: 'relative',
    fontSize: '4rem',
    fontWeight: '900',
    color: '#00fff7',
    userSelect: 'none',
  },
  subtext: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#89cff0',
  },
  countdown: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2rem',
  },
  countdownItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    minWidth: '70px',
    userSelect: 'none',
  },
  timeValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    display: 'block',
    lineHeight: 1,
    color: '#00ffd5',
  },
  timeLabel: {
    fontSize: '0.85rem',
    color: '#a0e7ff',
  },
  footerText: {
    fontSize: '1.1rem',
    color: '#66fcf1',
  },
};
