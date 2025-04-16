"use client";

import React from "react";
import Image from "next/image";
import profilePic from "./profile.jpg"; // Local import from same folder

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Contact</h1>
          <br />
          <br />
          <h2>
            <span className="text-3xl font-bold mb-6">
              Abdulrahman Haramain
            </span>
          </h2>
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

        {/* 🛠 Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🌐 Social Links
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <SkillCard
              title="Instagram"
              description="Follow my visual journey and tech tips"
              icon="📸"
              link="https://instagram.com/tech_with_mano"
            />
            <SkillCard
              title="TikTok"
              description="Watch quick tech tutorials and updates"
              icon="🎵"
              link="https://tiktok.com/@tech_with_mano"
            />
            <SkillCard
              title="Facebook"
              description="Join the Tech with Mano ICT student community"
              icon="📘"
              link="https://www.facebook.com/people/Tech-With-Mano/61574412262214/"
            />
            <SkillCard
              title="YouTube"
              description="Learn ICT and software with visual guides"
              icon="📹"
              link="https://youtube.com/@tech_with_mano"
            />
            <SkillCard
              title="LinkedIn"
              description="Connect with me professionally"
              icon="💼"
              link="https://linkedin.com/in/techwithmano"
            />
            <SkillCard
              title="GitHub"
              description="Explore my open-source projects"
              icon="🐱"
              link="https://github.com/techwithmano"
            />
          </div>
        </section>

        {/* 🔗 Linktree Button */}
        <div className="flex justify-center mt-12">
          <a
            href="https://linktr.ee/techwithmano"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-white"
          >
            🌐 Visit My Linktree
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
  link?: string;
}

const SkillCard = ({ title, description, icon, link }: SkillCardProps) => {
  const cardContent = (
    <div className="bg-card p-6 rounded-xl border hover:bg-accent transition-colors">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      {cardContent}
    </a>
  ) : (
    cardContent
  );
};

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

export default ContactPage;
