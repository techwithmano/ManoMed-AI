'use client';

import Link from 'next/link';
import { FaHeartbeat } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const steps = [
  { icon: '🔍', title: 'Analyze Symptoms', desc: 'Enter symptoms and medical history to begin the analysis.' },
  { icon: '⚡', title: 'Get Insights', desc: 'Receive AI-driven, actionable recommendations quickly.' },
  { icon: '❤️', title: 'Track Wellness', desc: 'Monitor health trends over time with personalized dashboards.' },
];

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground flex flex-col">
      {/* Hero */}
      <section className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <FaHeartbeat className="text-blue-600 text-5xl mb-4" aria-hidden="true" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Unlock AI-Powered Healthcare Insights
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8">
          ManoMed AI analyzes your symptoms and history with advanced models to deliver expert-level guidance—anytime, anywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/ManoMedai')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-medium shadow hover:opacity-90 transition"
          >
            Start Analysis
          </button>
          <Link
            href="/about"
            className="px-6 py-3 border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 rounded-full text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card dark:bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="
                  p-6
                  bg-card dark:bg-card
                  rounded-xl
                  shadow-md
                  transform transition
                  hover:shadow-xl
                  hover:-translate-y-1
                  duration-300
                "
              >
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center text-gray-800 dark:text-gray-200">
          <blockquote className="italic mb-4">
            "ManoMed AI streamlined our patient assessment process, delivering timely insights that improved care delivery."
          </blockquote>
          <p className="font-medium">— Eng. Abdulrahman Haramain, CS </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-8">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/ManoMedai"
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;