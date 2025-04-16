// contact/page.tsx
import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">Abdulrahman.H</h1>
            <p className="text-lg text-muted-foreground">
              💻 Tech enthusiast & IGCSE ICT tutor
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border">
            <p className="italic text-muted-foreground">
              "Passionate about empowering students through technology"
            </p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-6">
            <SectionCard title="📬 Essentials">
              <InfoItem label="Email" value="abdulrahman@example.com" />
              <InfoItem label="Phone" value="+123 456 789" />
              <InfoItem label="IGCSE ICT" value="0417/0983 2025" />
              <InfoItem
                label="Revision Notes"
                value="TWM ICT 0417 LAST MIN REV NOTES MJ 25"
              />
            </SectionCard>

            <SectionCard title="📱 Personal">
              <SocialLink
                platform="Instagram"
                handle="@personal_handle"
                url="#"
              />
              <SocialLink platform="Snapchat" handle="@snap_handle" url="#" />
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard title="🌐 Techwithmano">
              <SocialLink platform="WhatsApp Channel" url="#" />
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

            <SectionCard title="🚀 Projects">
              <ProjectCard
                title="ManoMed AI"
                description="Medical expert system powered by AI"
                url="#"
              />
              <a
                href="https://link-to-your-cv.com"
                className="flex items-center p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
              >
                <span className="mr-3">📄</span>
                <div>
                  <p className="font-medium">View Full CV</p>
                  <p className="text-sm text-muted-foreground">
                    Qualifications & Experience
                  </p>
                </div>
              </a>
            </SectionCard>
          </div>
        </div>

        <div className="text-center border-t border-border pt-12">
          <h3 className="text-xl font-bold mb-4">Join the Community</h3>
          <a
            href="https://linktr.ee/techwithmano"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            Explore All Links →
          </a>
          <p className="mt-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Preferences
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard = ({ title, children }: SectionCardProps) => (
  <div className="bg-card rounded-xl p-6 border">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="flex justify-between items-center p-3 hover:bg-accent rounded-lg transition-colors">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

// Dummy placeholders for external components
const SocialLink = ({
  platform,
  handle,
  url,
}: {
  platform: string;
  handle?: string;
  url: string;
}) => (
  <a href={url} className="block hover:text-primary transition-colors">
    {platform} {handle && `(${handle})`}
  </a>
);

const ProjectCard = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => (
  <a
    href={url}
    className="block p-4 bg-card rounded-lg border hover:bg-accent transition-colors"
  >
    <h4 className="font-bold">{title}</h4>
    <p className="text-sm text-muted-foreground">{description}</p>
  </a>
);

export default ContactPage;
