import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext'; // Your theme context location

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);

  // Theme configuration
  const themeStyles = {
    light: {
      background: 'bg-white',
      text: 'text-gray-900',
      card: 'bg-gray-50 border-gray-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      accent: 'text-blue-600'
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      card: 'bg-gray-800 border-gray-700',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      accent: 'text-blue-400'
    },
    // Add your custom themes here
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Profile Header */}
        <header className={`text-center mb-12 p-6 rounded-xl ${currentTheme.card} border`}>
          <h1 className={`text-4xl font-bold mb-2 ${currentTheme.accent}`}>Abdulrahman.H</h1>
          <p className="text-lg opacity-90">💻 Tech enthusiast & ICT tutor</p>
          <p className="mt-4 italic opacity-80">“Passionate about empowering students through technology”</p>
        </header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard theme={currentTheme} title="📬 Essentials">
            <InfoItem theme={currentTheme} label="Email" value="abdulrahman@example.com" />
            <InfoItem theme={currentTheme} label="Phone" value="+123 456 789" />
            <InfoItem theme={currentTheme} label="IGCSE ICT" value="0417/0983 2025" />
            <InfoItem theme={currentTheme} label="Revision Notes" value="TWM ICT 0417 LAST MIN REV NOTES MJ 25" />
          </SectionCard>

          <SectionCard theme={currentTheme} title="🌐 Social">
            <SocialLink theme={currentTheme} platform="WhatsApp" url="#" />
            <SocialLink theme={currentTheme} platform="Instagram" url="https://instagram.com/Techwithmano" />
            <SocialLink theme={currentTheme} platform="TikTok" url="https://tiktok.com/@Techwithmano" />
            <SocialLink theme={currentTheme} platform="YouTube" url="https://youtube.com/Techwithmano" />
          </SectionCard>
        </div>

        {/* Theme-aware CTA Button */}
        <div className="mt-12 text-center">
          <a href="https://linktr.ee/techwithmano"
            className={`px-6 py-3 rounded-lg ${currentTheme.button} transition-colors inline-flex items-center`}>
            Explore All Links
            <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 3h2.278l-6.784 6.768L14 16.277V19h-2.946l-4.299-4.3L3 19H.723l7.546-7.529L1 3h2.278l5.728 5.714L14 3zm2.277 0H19v2.277l-9.085 9.101L16.277 21H19v-2.277l-9.085-9.101L16.277 3z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

// Theme-aware components
const SectionCard = ({ theme, title, children }) => (
  <div className={`p-6 rounded-xl border ${theme.card} ${theme.text} transition-colors duration-300`}>
    <h2 className={`text-xl font-semibold mb-4 ${theme.accent}`}>{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoItem = ({ theme, label, value }) => (
  <div className={`flex justify-between items-center p-3 rounded-lg hover:bg-opacity-10 ${theme.accent.replace('text', 'bg')}`}>
    <span className="opacity-80">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const SocialLink = ({ theme, platform, url }) => (
  <a href={url} className={`flex items-center p-3 rounded-lg hover:bg-opacity-10 ${theme.accent.replace('text', 'bg')} transition-colors`}>
    <span className="mr-3 text-xl">{/* Platform icon */}</span>
    <span className="font-medium">{platform}</span>
  </a>
);

export default ContactPage;
