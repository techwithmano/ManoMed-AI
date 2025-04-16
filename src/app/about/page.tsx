// pages/about.tsx

import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Abdulrahman Haramain</title>
      </Head>
      <div className="px-6 py-12 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6">About Abdulrahman Haramain</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Who Am I?</h2>
          <p className="text-lg leading-relaxed">
            I'm <strong>Abdulrahman Haramain</strong>, a 16-year-old junior developer and founder of
            <strong> Tech with Mano</strong> and <strong>ManoMed AI</strong>. I began coding at the age of 10, and since then, I’ve built tools that bring tech, education, and impact together.
            I’ve taught over <strong>50 IGCSE ICT students</strong> since 2023, many of whom have gone on to achieve top grades. My focus lies in teaching, building, and creating meaningful platforms for everyone.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Projects & Vision</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold">1. ManoMed AI</h3>
            <p className="text-lg leading-relaxed">
              <strong>Launched:</strong> 2025 — <em>Under Development</em><br />
              ManoMed AI is a simple yet powerful hybrid expert system that provides diagnostic support for both physical and mental health. With a 95% accuracy rate, it’s accessible to all users — from children to doctors.
              It aims to serve underdeveloped communities, patients without access to doctors, and even healthcare professionals.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Dual-domain (physical & mental)</li>
              <li>User-friendly for all ages</li>
              <li>Supports doctors, caregivers, and individuals</li>
            </ul>
            <p className="mt-2"><strong>Tech Stack:</strong> Next.js, React, TypeScript, Tailwind CSS, Google GenAI, Redux, Vercel & Netlify</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold">2. Tech with Mano LMS</h3>
            <p className="text-lg leading-relaxed">
              A tailored learning platform under development for teaching IGCSE ICT, RCTD, and other technical subjects. It includes quizzes, student reports, and support for future course expansion.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold">3. Surprise Project – Coming Soon</h3>
            <p className="text-lg leading-relaxed italic">
              Expect something creative, extraordinary, and uniquely built to inspire.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Skills & Expertise</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Software Development</li>
            <li>AI Integration</li>
            <li>Web Design & UI/UX</li>
            <li>Teaching IGCSE ICT</li>
            <li>Entrepreneurship & Project Management</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Where I See the Future</h2>
          <p className="text-lg leading-relaxed">
            <strong>In 1 year:</strong> ManoMed AI fully launched with x-ray scanning and advanced AI features.<br />
            <strong>In 5 years:</strong> I hope to achieve global reach, partner with hospitals, universities, and NGOs, and create meaningful social impact.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p className="text-lg leading-relaxed">
            Want to collaborate or reach out? Visit the <a href="/contact" className="text-blue-600 underline">Contact</a> page.
          </p>
        </section>

        <footer className="text-center mt-12 text-gray-600 text-lg">
          <p>“<strong>Byte by Byte, Build your Might.</strong>” – Abdulrahman Haramain</p>
        </footer>
      </div>
    </>
  );
}