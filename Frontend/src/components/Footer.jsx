import { portfolioData } from "../data/portfolioData";

export default function Footer({ data }) {
  const personalInfo = data || portfolioData.personalInfo;
  const { name } = personalInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-brand-bg border-t border-brand-card/50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-brand-secondary">
        {/* Left text */}
        <p className="font-medium">
          &copy; {currentYear} {name}. All rights reserved.
        </p>

        {/* Right text */}
        <p className="font-mono text-xs">
          Designed & Built with <span className="text-red-500">❤️</span> using React, Vite & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
