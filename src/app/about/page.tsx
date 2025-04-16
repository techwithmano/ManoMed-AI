import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Profile Header */}
        <header className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">Abdulrahman.H</h1>
            <p className="text-lg text-blue-300">💻 Tech enthusiast & ICT tutor</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow-lg">
            <p className="italic">“Passionate about empowering students through technology”</p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* Left Column - Contact & Essentials */}
          <div className="space-y-8">
            <SectionCard title="📬 Essentials">
              <InfoItem label="Email" value="abdulrahman@example.com" />
              <InfoItem label="Phone" value="+123 456 789" />
              <InfoItem label="IGCSE ICT" value="0417/0983 2025" />
              <InfoItem label="Revision Notes" value="TWM ICT 0417 LAST MIN REV NOTES MJ 25" />
            </SectionCard>

            <SectionCard title="📱 Personal">
              <SocialLink platform="Instagram" handle="@personal_handle" url="#" />
              <SocialLink platform="Snapchat" handle="@snap_handle" url="#" />
            </SectionCard>
          </div>

          {/* Right Column - Social & Projects */}
          <div className="space-y-8">
            <SectionCard title="🌐 Techwithmano">
              <SocialLink platform="WhatsApp Channel" url="#" />
              <SocialLink platform="Instagram" url="https://instagram.com/Techwithmano" />
              <SocialLink platform="TikTok" url="https://tiktok.com/@Techwithmano" />
              <SocialLink platform="Facebook" url="https://facebook.com/Techwithmano" />
              <SocialLink platform="YouTube" url="https://youtube.com/Techwithmano" />
              <SocialLink platform="LinkedIn" url="https://linkedin.com/in/Techwithmano" />
            </SectionCard>

            <SectionCard title="🚀 Projects">
              <ProjectCard
                title="ManoMed AI"
                description="Medical expert system powered by AI"
                url="#"
              />
              <a href="https://link-to-your-cv.com" 
                 className="flex items-center p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-colors">
                <span className="mr-3">📄</span>
                <div>
                  <p className="font-medium">View Full CV</p>
                  <p className="text-sm text-blue-300">Qualifications & Experience</p>
                </div>
              </a>
            </SectionCard>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center border-t border-white/10 pt-12">
          <h3 className="text-xl font-bold mb-4">Join the Community</h3>
          <a href="https://linktr.ee/techwithmano"
             className="inline-block px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
            Explore All Links →
          </a>
          <p className="mt-6 text-sm text-blue-300">
            <a href="#" className="hover:text-white">Cookie Preferences</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg">
    <span className="text-blue-300">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const SocialLink = ({ platform, url, handle }: { platform: string; url: string; handle?: string }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
    <span className="mr-3">
      {platform === 'Instagram' && '📸'}
      {platform === 'TikTok' && '🎵'}
      {platform === 'Facebook' && '📘'}
      {platform === 'YouTube' && '▶️'}
      {platform === 'LinkedIn' && '💼'}
      {platform === 'WhatsApp Channel' && '📢'}
    </span>
    <div>
      <p className="font-medium">{platform}</p>
      {handle && <p className="text-sm text-blue-300">{handle}</p>}
    </div>
  </a>
);

const ProjectCard = ({ title, description, url }: { title: string; description: string; url: string }) => (
  <a href={url} className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors mb-3">
    <h3 className="font-medium mb-1">⚕️ {title}</h3>
    <p className="text-sm text-blue-300">{description}</p>
  </a>
);

export default ContactPage;