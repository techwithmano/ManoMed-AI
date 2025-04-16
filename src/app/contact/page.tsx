import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* ===== PROFILE HEADER SECTION ===== */}
        <header className="text-center mb-12">
          <div className="mb-6">
            {/* Replace with your name */}
            <h1 className="text-4xl font-bold mb-2">Abdulrahman.H</h1>
            {/* Replace with your tagline */}
            <p className="text-lg text-white">💻 Tech enthusiast & ICT tutor</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            {/* Replace with your personal quote */}
            <p className="italic text-white">
              "Passionate about empowering students through technology"
            </p>
          </div>
        </header>

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* ESSENTIALS CARD - Update all contact info here */}
            <SectionCard title="📬 Essentials">
              {/* Replace with your actual email */}
              <InfoItem label="Email" value="abdulrahman@example.com" />
              {/* Replace with your phone number */}
              <InfoItem label="Phone" value="+123 456 789" />
              {/* Update IGCSE info if needed */}
              <InfoItem label="IGCSE ICT" value="0417/0983 2025" />
              {/* Update revision notes info */}
              <InfoItem
                label="Revision Notes"
                value="TWM ICT 0417 LAST MIN REV NOTES MJ 25"
              />
            </SectionCard>

            {/* PERSONAL SOCIAL CARD - Add your personal social links */}
            <SectionCard title="📱 Personal">
              {/* Replace # with your personal Instagram */}
              <SocialLink
                platform="Instagram"
                handle="@personal_handle"
                url="#"
              />
              {/* Replace # with your Snapchat */}
              <SocialLink platform="Snapchat" handle="@snap_handle" url="#" />
            </SectionCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* TECHWITHMANO SOCIAL CARD - Update all professional links */}
            <SectionCard title="🌐 Techwithmano">
              {/* Replace # with WhatsApp channel link */}
              <SocialLink platform="WhatsApp Channel" url="#" />
              {/* Update with correct Techwithmano links */}
              <SocialLink
                platform="Instagram"
                url="https://instagram.com/Techwithmano"
              />
              <SocialLink
                platform="TikTok"
                url="https://tiktok.com/@Techwithmano"
              />
              <SocialLink
                platform="Facebook"
                url="https://facebook.com/Techwithmano"
              />
              <SocialLink
                platform="YouTube"
                url="https://youtube.com/Techwithmano"
              />
              <SocialLink
                platform="LinkedIn"
                url="https://linkedin.com/in/Techwithmano"
              />
            </SectionCard>

            {/* PROJECTS CARD - Add your projects and CV */}
            <SectionCard title="🚀 Projects">
              {/* Replace # with ManoMed AI project link */}
              <ProjectCard
                title="ManoMed AI"
                description="Medical expert system powered by AI"
                url="#"
              />
              {/* Replace with your actual CV link */}
              <a
                href="https://link-to-your-cv.com"
                className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <span className="mr-3">📄</span>
                <div>
                  <p className="font-medium">View Full CV</p>
                  <p className="text-sm text-white/80">
                    Qualifications & Experience
                  </p>
                </div>
              </a>
            </SectionCard>
          </div>
        </div>

        {/* ===== FOOTER CTA ===== */}
        <div className="text-center border-t border-white/10 pt-12">
          <h3 className="text-xl font-bold mb-4">Join the Community</h3>
          {/* Replace with your Linktree or preferred link */}
          <a
            href="https://linktr.ee/techwithmano"
            className="inline-block px-8 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors"
          >
            Explore All Links →
          </a>
          {/* Update cookie preferences link if needed */}
          <p className="mt-6 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors">
              Cookie Preferences
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// ===== REUSABLE COMPONENTS =====
// (No need to modify these unless you want style changes)

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard = ({ title, children }: SectionCardProps) => (
  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="flex justify-between items-center p-3 hover:bg-white/10 rounded-lg transition-colors">
    <span className="text-white/90">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

interface SocialLinkProps {
  platform: string;
  url: string;
  handle?: string;
}

const SocialLink = ({ platform, url, handle }: SocialLinkProps) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-3 hover:bg-white/10 rounded-lg transition-colors"
  >
    <span className="mr-3">
      {platform === "Instagram" && "📸"}
      {platform === "TikTok" && "🎵"}
      {platform === "Facebook" && "📘"}
      {platform === "YouTube" && "▶️"}
      {platform === "LinkedIn" && "💼"}
      {platform === "WhatsApp Channel" && "📢"}
    </span>
    <div>
      <p className="font-medium">{platform}</p>
      {handle && <p className="text-sm text-white/80">{handle}</p>}
    </div>
  </a>
);

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
}

const ProjectCard = ({ title, description, url }: ProjectCardProps) => (
  <a
    href={url}
    className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors mb-3"
  >
    <h3 className="font-medium mb-1">⚕️ {title}</h3>
    <p className="text-sm text-white/80">{description}</p>
  </a>
);

export default ContactPage;
