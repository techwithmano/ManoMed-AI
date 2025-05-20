'use client';

import Link from 'next/link';
import Image from 'next/image';
import profilePic from './profile.jpg';
import { FaHeartbeat } from 'react-icons/fa';

const skills = [
  { icon: '🎓', title: 'IGCSE ICT Education', desc: 'Helping students achieve top grades with structured, engaging lessons.' },
  { icon: '💻', title: 'Full-Stack Dev', desc: 'Building robust web apps with a focus on user experience and performance.' },
  { icon: '🤖', title: 'AI Integration', desc: 'Designing intelligent systems for healthcare and education.' },
  { icon: '📹', title: 'Content Creation', desc: 'Producing clear, impactful tech tutorials and IGCSE ICT guides.' },
];

const achievements = [
  { title: '50+ Students Taught', desc: 'Guided ICT learners to excellence since 2023.', year: '2023–Present' },
  { title: 'ManoMed AI Launch', desc: 'Published AI medical expert system on Creative Commons.', year: '2025' },
  { title: 'Tech with Mano LMS', desc: 'Developing a full-featured learning platform.', year: 'Coming Soon' },
];

const AboutPage = () => (
  <div className="min-h-screen flex flex-col items-center px-6 py-12">
    {/* Header */}
    <header className="text-center mb-12">
      <FaHeartbeat className="text-blue-600 text-5xl mx-auto mb-4" aria-hidden="true" />
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">About Abdulrahman</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">Junior Developer • ICT Tutor • Tech with Mano Founder</p>
    </header>

    {/* Profile */}
    <div className="mb-12">
      <Image
        src={profilePic}
        alt="Abdulrahman Haramain"
        width={180}
        height={180}
        className="rounded-full border-4 border-blue-600"
      />
    </div>

    {/* Story */}
    <section className="max-w-3xl mb-12 bg-card dark:bg-card rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">My Story</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        I’m <strong>Abdulrahman Haramain</strong>, a passionate junior developer and founder of <strong>Tech with Mano</strong> and <strong>ManoMed AI</strong>. I began coding at age 10 and have dedicated myself to merging technology with education and healthcare.
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
        Over the past two years, I’ve taught 50+ IGCSE ICT students, helping them secure top grades. Currently, I’m working on innovative platforms that empower learners and improve patient care.
      </p>
    </section>

    {/* Skills */}
    <section className="w-full max-w-5xl mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Skills & Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="
              flex items-start p-6
              bg-card dark:bg-card
              rounded-xl
              shadow-md
              transform transition
              hover:shadow-xl
              hover:-translate-y-1
              hover:scale-105
              duration-300
            "
          >
            <div className="text-3xl mr-4">{skill.icon}</div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{skill.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{skill.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Achievements */}
    <section className="w-full max-w-4xl mb-12 bg-card dark:bg-card rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Achievements</h2>
      <ul className="space-y-4">
        {achievements.map((ach, idx) => (
          <li
            key={idx}
            className="
              flex justify-between items-center
              bg-card dark:bg-card
              rounded-xl
              p-4
              shadow-md
              transform transition
              hover:shadow-xl
              hover:-translate-y-0.5
              duration-300
            "
          >
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{ach.title}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{ach.desc}</p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{ach.year}</span>
          </li>
        ))}
      </ul>
    </section>

    {/* Footer CTA */}
    <section className="py-8">
      <Link
        href="/contact"
        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow hover:opacity-90 transition"
      >
        Get In Touch
      </Link>
    </section>
  </div>
);

export default AboutPage;
