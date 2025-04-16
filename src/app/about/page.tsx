'use client';

import React from "react";
import Image from "next/image";
import profilePic from "./profile.jpg"; // Local import from same folder

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            About <span className="text-primary">Abdulrahman</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Junior Developer • ICT Tutor • Tech with Mano Founder
          </p>
        </header>

        {/* 👤 Profile Picture */}
        <div className="flex justify-center mb-12">
          <Image 
            src={profilePic}
            alt="Abdulrahman Haramain"
            width={200}
            height={200}
            className="rounded-full border-4 border-primary"
          />
        </div>

        {/* 🧠 Story Section */}
        <section className="mb-16 bg-card rounded-2xl p-8 border">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <span className="mr-3">👋</span> My Story
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm <strong>Abdulrahman Haramain</strong>, a 16-year-old junior developer and founder of <strong>Tech with Mano</strong> and <strong>ManoMed AI</strong>. I started coding when I was 10 and have since built platforms that bring education and innovation together.
            </p>
            <p>
              I’ve taught over 50 IGCSE ICT students since 2023 and have helped many of them reach top grades. My work blends teaching, development, and creativity with a deep focus on impact.
            </p>
            <p>
              Right now, I’m working on multiple projects that merge technology, education, and healthcare — all with the goal of making real change and creating opportunities for others.
            </p>
          </div>
        </section>

        {/* 🛠 Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🛠 Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <SkillCard
              title="ICT Education"
              description="Specialized in IGCSE ICT curriculum with proven student success"
              icon="🎓"
            />
            <SkillCard
              title="Software Development"
              description="Full-stack developer with a focus on education and healthcare"
              icon="💻"
            />
            <SkillCard
              title="AI Integration"
              description="Created hybrid AI expert systems for diagnosis and learning"
              icon="🤖"
            />
            <SkillCard
              title="Content Creation"
              description="Published YouTube & social content for tech and ICT learners"
              icon="📹"
            />
          </div>
        </section>

        {/* 🎓 Teaching Philosophy */}
        <section className="mb-16 bg-card rounded-2xl p-8 border">
          <h2 className="text-3xl font-bold mb-6">🧠 My Teaching Approach</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <p>✅ Focused on fundamentals</p>
            <p>✅ Real-world applications</p>
            <p>✅ Simplified revision strategies</p>
            <p>✅ Peer-driven learning environments</p>
          </div>
        </section>

        {/* 🏆 Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🏆 Notable Achievements
          </h2>
          <div className="space-y-6">
            <Achievement
              title="50+ Students Taught"
              description="Guided IGCSE students toward top performance and confidence"
              year="2023–Present"
            />
            <Achievement
              title="ManoMed AI"
              description="Launched a hybrid AI medical expert system under Creative Commons"
              year="2025"
            />
            <Achievement
              title="Tech with Mano LMS"
              description="Currently building a full learning platform for ICT and coding"
              year="2025"
            />
            <Achievement
              title="Third Project – Coming Soon"
              description="Stay tuned for something unique and inspiring"
              year="2025"
            />
          </div>
        </section>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-6">
            “<span className="italic">Byte by Byte, Build your Might</span>”
          </h3>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-lg font-medium"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

interface SkillCardProps {
  title: string;
  description: string;
  icon: string;
}

const SkillCard = ({ title, description, icon }: SkillCardProps) => (
  <div className="bg-card p-6 rounded-xl border hover:bg-accent transition-colors">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface AchievementProps {
  title: string;
  description: string;
  year: string;
}

const Achievement = ({ title, description, year }: AchievementProps) => (
  <div className="bg-card p-4 rounded-xl border hover:bg-accent transition-colors">
    <h4 className="font-semibold">{title}</h4>
    <p className="text-muted-foreground text-sm">{description}</p>
    <p className="text-xs text-muted-foreground mt-1">{year}</p>
  </div>
);

export default AboutPage;
