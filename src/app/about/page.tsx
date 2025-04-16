// about/page.tsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            About <span className="text-primary">Abdulrahman</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ICT Tutor • Tech Innovator • Lifelong Learner
          </p>
        </header>

        <section className="mb-16 bg-card rounded-2xl p-8 border">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <span className="mr-3">👋</span> My Story
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              I started coding at the age of 9 and have been passionate about
              teaching and creating tools that simplify tech education ever
              since.
            </p>
            <p>
              Through <strong>Tech with Mano</strong>, I’ve taught IGCSE ICT to
              over a thousand students, helping them achieve top grades, and
              built AI-powered tools like ManoMed AI.
            </p>
            <p>
              My goal is to make learning interactive, fun, and personalized
              using the power of code.
            </p>
          </div>
        </section>

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
              description="Full-stack developer with focus on educational platforms"
              icon="💻"
            />
            <SkillCard
              title="AI Integration"
              description="Built medical and academic expert systems using AI"
              icon="🤖"
            />
            <SkillCard
              title="Content Creation"
              description="Produced YouTube and social content for tech learners"
              icon="📹"
            />
          </div>
        </section>

        <section className="mb-16 bg-card rounded-2xl p-8 border">
          <h2 className="text-3xl font-bold mb-6">🧠 My Teaching Approach</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <p>✅ Focused on fundamentals</p>
            <p>✅ Real-world applications</p>
            <p>✅ Simplified revision strategies</p>
            <p>✅ Peer-driven learning environments</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🏆 Notable Achievements
          </h2>
          <div className="space-y-6">
            <Achievement
              title="1000+ Students Taught"
              description="Helped students achieve top grades in IGCSE ICT"
              year="2021-Present"
            />
            <Achievement
              title="ManoMed AI Launch"
              description="Created an AI medical expert system under Creative Commons"
              year="2025"
            />
          </div>
        </section>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">
            Ready to connect or learn together?
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
