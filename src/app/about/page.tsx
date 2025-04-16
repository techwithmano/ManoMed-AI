import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ===== HERO SECTION ===== */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Abdulrahman
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Educator • Tech Innovator • Lifelong Learner
          </p>
        </header>

        {/* ===== BIO SECTION ===== */}
        <section className="mb-16 bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <span className="mr-3">👋</span> My Story
          </h2>
          {/* Replace with your actual bio */}
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Hello! I'm Abdulrahman, a passionate ICT tutor and technology
              enthusiast with over 5 years of experience in education and
              software development.
            </p>
            <p>
              My journey began when I first discovered my love for computers at
              age 12, and since then I've dedicated myself to both mastering
              technology and teaching others.
            </p>
            <p>
              When I'm not teaching or coding, you'll find me exploring new
              edtech tools, contributing to open-source projects, or creating
              educational content.
            </p>
          </div>
        </section>

        {/* ===== SKILLS & EXPERTISE ===== */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🛠 Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Update with your actual skills */}
            <SkillCard
              title="ICT Education"
              description="Specialized in IGCSE ICT curriculum with proven student success"
              icon="🎓"
            />
            <SkillCard
              title="Web Development"
              description="Full-stack development with React, Node.js, and modern frameworks"
              icon="💻"
            />
            <SkillCard
              title="AI Systems"
              description="Building practical AI solutions like ManoMed AI"
              icon="🧠"
            />
            <SkillCard
              title="EdTech Innovation"
              description="Creating engaging digital learning experiences"
              icon="🚀"
            />
          </div>
        </section>

        {/* ===== TEACHING PHILOSOPHY ===== */}
        <section className="mb-16 bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6">🧠 My Teaching Approach</h2>
          {/* Update with your philosophy */}
          <div className="grid md:grid-cols-2 gap-8">
            <PhilosophyPoint
              title="Practical First"
              description="I believe in hands-on learning where students build real projects from day one"
            />
            <PhilosophyPoint
              title="Growth Mindset"
              description="Every challenge is an opportunity to learn and improve"
            />
            <PhilosophyPoint
              title="Accessible Tech"
              description="Making complex concepts simple and approachable"
            />
            <PhilosophyPoint
              title="Future-Ready"
              description="Focusing on skills that will matter in tomorrow's digital world"
            />
          </div>
        </section>

        {/* ===== ACHIEVEMENTS ===== */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🏆 Notable Achievements
          </h2>
          {/* Update with your achievements */}
          <div className="space-y-6">
            <Achievement
              title="1000+ Students Taught"
              description="Helped students achieve top grades in IGCSE ICT"
              year="2018-Present"
            />
            <Achievement
              title="ManoMed AI Development"
              description="Created an AI medical assistant used by healthcare professionals"
              year="2022"
            />
            <Achievement
              title="TechWithMano Community"
              description="Built an online learning platform with 10k+ followers"
              year="2020-Present"
            />
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">
            Ready to connect or learn together?
          </h3>
          <a
            href="/contact" // Link to your contact page
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-colors text-lg font-medium"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

// ===== REUSABLE COMPONENTS =====

interface SkillCardProps {
  title: string;
  description: string;
  icon: string;
}

const SkillCard = ({ title, description, icon }: SkillCardProps) => (
  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-white/80">{description}</p>
  </div>
);

interface PhilosophyPointProps {
  title: string;
  description: string;
}

const PhilosophyPoint = ({ title, description }: PhilosophyPointProps) => (
  <div className="flex items-start">
    <div className="bg-cyan-500/20 p-2 rounded-lg mr-4 mt-1">
      <svg
        className="w-5 h-5 text-cyan-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <div>
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <p className="text-white/80">{description}</p>
    </div>
  </div>
);

interface AchievementProps {
  title: string;
  description: string;
  year: string;
}

const Achievement = ({ title, description, year }: AchievementProps) => (
  <div className="border-l-4 border-cyan-500 pl-6 py-2">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-xl">{title}</h3>
      <span className="bg-white/10 px-3 py-1 rounded-full text-sm">{year}</span>
    </div>
    <p className="text-white/80 mt-2">{description}</p>
  </div>
);

export default AboutPage;
