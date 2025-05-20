'use client';

import Link from 'next/link';
import Image from 'next/image';
import profilePic from './profile.jpg';
import { FaHeartbeat } from 'react-icons/fa';

const contacts = [
  { icon: '📸', title: 'Instagram', desc: 'Follow my visual journey & tech tips', url: 'https://instagram.com/tech_with_mano' },
  { icon: '🎵', title: 'TikTok', desc: 'Quick tech tutorials & updates', url: 'https://tiktok.com/@tech_with_mano' },
  { icon: '📘', title: 'Facebook', desc: 'Join our ICT student community', url: 'https://www.facebook.com/people/Tech-With-Mano/61574412262214/' },
  { icon: '📹', title: 'YouTube', desc: 'Visual guides for ICT & coding', url: 'https://youtube.com/@tech_with_mano' },
  { icon: '💼', title: 'LinkedIn', desc: 'Connect professionally', url: 'https://linkedin.com/in/techwithmano' },
  { icon: '🐱', title: 'GitHub', desc: 'Explore open-source projects', url: 'https://github.com/techwithmano' },
];

const ContactPage = () => (
  <div className="bg-background text-foreground flex flex-col items-center px-4 py-12">
    {/* Header */}
    <header className="text-center mb-12">
      <FaHeartbeat className="text-blue-600 text-5xl mx-auto mb-4" aria-hidden="true" />
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">Get in Touch</h1>
      <p className="text-lg text-muted-foreground">Abdulrahman Haramain • Junior Developer • ICT Tutor</p>
    </header>

    {/* Profile */}
    <div className="mb-10">
      <Image
        src={profilePic}
        alt="Abdulrahman Haramain"
        width={180}
        height={180}
        className="rounded-full border-4 border-blue-600"
      />
    </div>

    {/* Social Links */}
    <section className="w-full max-w-5xl mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Social &amp; Professional</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((c, idx) => (
          <a
            key={idx}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start p-6 bg-card dark:bg-card rounded-xl shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <div className="text-3xl mr-4 mt-1">{c.icon}</div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>

    {/* Linktree CTA */}
    <section className="py-8 text-center">
      <a
        href="https://linktr.ee/techwithmano"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow hover:opacity-90 transition"
      >
        🌐 Visit My Linktree
      </a>
    </section>
  </div>
);

export default ContactPage;
