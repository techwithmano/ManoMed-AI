import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Contact Abdulrahman</h1>
        <p className="text-xl">“Abdulrahman: Tech enthusiast and passionate ICT tutor.” 💻🤍</p>
      </header>

      <section className="contact-info mb-6">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <p><strong>Email:</strong> abdulrahman@example.com</p>
        <p><strong>Phone:</strong> +123456789</p>
        <p><strong>IGCSE ICT:</strong> 0417/0983 2025</p>
        <p><strong>Notes:</strong> TWM ICT 0417 LAST MIN REV NOTES MJ 25</p>
      </section>

      <section className="social-links mb-6">
        <h2 className="text-2xl font-semibold">Connect with me:</h2>
        <ul className="list-disc pl-6">
          <li><a href="https://instagram.com/Techwithmano" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://tiktok.com/@Techwithmano" target="_blank" rel="noopener noreferrer">TikTok</a></li>
          <li><a href="https://facebook.com/Techwithmano" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://youtube.com/Techwithmano" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          <li><a href="https://linkedin.com/in/Techwithmano" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </section>

      <section className="projects-education mb-6">
        <h2 className="text-2xl font-semibold">Projects & Education</h2>
        <p><strong>ManoMed AI:</strong> A medical expert system built with AI. Check out the project.</p>
        <p><a href="https://link-to-your-cv.com" target="_blank" rel="noopener noreferrer">View my CV</a></p>
      </section>

      <section className="cta mb-6 text-center">
        <h2 className="text-2xl font-semibold">Join Techwithmano</h2>
        <p>Stay updated by joining the Techwithmano community.</p>
        <a href="https://linktree.com/Techwithmano" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Join Now</a>
      </section>

      <footer className="text-center">
        <p>Cookie Preferences</p>
      </footer>
    </div>
  );
};

export default ContactPage;
