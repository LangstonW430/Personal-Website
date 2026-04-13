import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const projects = [
  {
    num: "01",
    title: "Exbo",
    subtitle: "Community Forum Website",
    description:
      "A full-stack web application built with Next.js and TypeScript, featuring user authentication, real-time discussion threads, and community engagement tools. Includes account creation, posting capabilities, and a responsive design for seamless user experience. Backend powered by PostgreSQL for data persistence.",
    tags: ["TypeScript", "React", "Next.js", "PostgreSQL", "CSS"],
    github: "https://github.com/LangstonW430/Forum",
    live: "https://exbo.site",
    date: "2026",
  },
  {
    num: "02",
    title: "Music Tracker",
    subtitle: "Personal Music Dashboard",
    description:
      "A full-stack web app for tracking and discovering music, built with React and TypeScript on the frontend and Supabase for authentication and database persistence. Features a personal dashboard for logging listening history and managing your music library.",
    tags: ["TypeScript", "React", "Supabase", "Vite", "CSS"],
    github: "https://github.com/LangstonW430/music-tracker",
    live: "https://music-tracker.langstonwoods.com/dashboard",
    date: "Ongoing",
  },
  {
    num: "03",
    title: "Mock Bakery",
    subtitle: "Headless CMS Demo Site",
    description:
      "A demo bakery website powered by a headless CMS. Products, testimonials, and all page content are managed through Sanity v3 with real-time updates — no redeploy needed to change content. Built with React 19 and TypeScript.",
    tags: ["TypeScript", "React", "Sanity CMS", "Vite", "CSS"],
    github: "https://github.com/LangstonW430/Mock-Bakery",
    live: "https://mock-bakery.langstonwoods.com",
    date: "Ongoing",
  },
  {
    num: "04",
    title: "Personal Website",
    subtitle: "This Site",
    description:
      "My personal portfolio site built with React and TypeScript. Features smooth scroll animations, an intersection-observer-driven reveal system, and a cohesive editorial design system built entirely in vanilla CSS.",
    tags: ["TypeScript", "React", "Vite", "CSS"],
    github: "https://github.com/LangstonW430/Personal-Website",
    live: "https://langstonwoods.com",
    date: "2026",
  },
  {
    num: "05",
    title: "Sentence Tone Classifier",
    subtitle: "ML Emotion Classifier",
    description:
      "ML model classifying text into 9 emotion categories with 85% accuracy on test data. Built a full preprocessing pipeline (lowercasing, punctuation removal, n-gram tokenization) extracting 1,000+ features, boosting performance by 20%. Ships with an interactive CLI and real-time confidence scores.",
    tags: ["Python", "scikit-learn", "TF-IDF", "Logistic Regression"],
    github: "https://github.com/LangstonW430/Sentence-Tone-Classifier",
    live: null,
    date: "2025",
  },
];

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav>
        <Link to="/" className="nav-logo">
          L<span>.</span>Woods
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/#about">About</Link>
          </li>
          <li>
            <Link to="/#projects">Projects</Link>
          </li>
          <li>
            <Link to="/#contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="all-projects-page">
        <div className="all-projects-header reveal">
          <p className="hero-eyebrow">All Projects</p>
          <h1 className="all-projects-title">
            Things I've
            <br />
            <em>built</em>
          </h1>
          <p className="all-projects-sub">A full archive of my work.</p>
        </div>

        <div className="all-projects-list">
          {projects.map((p) => (
            <div key={p.num} className="ap-card reveal">
              <div className="ap-num">{p.num}</div>
              <div className="ap-body">
                <div className="ap-top">
                  <div>
                    <h2 className="ap-title">{p.title}</h2>
                    <p className="ap-subtitle">{p.subtitle}</p>
                  </div>
                  <div className="ap-links">
                    <a
                      href={p.github}
                      className="btn"
                      target="_blank"
                      rel="noopener"
                    >
                      <span>GitHub</span>
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        className="btn btn-filled"
                        target="_blank"
                        rel="noopener"
                      >
                        <span>Live Site</span>
                      </a>
                    )}
                  </div>
                </div>
                <p className="ap-desc">{p.description}</p>
                <div className="ap-footer">
                  <div className="ap-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag-light">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="ap-date">{p.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <p>© 2026 Langston Woods</p>
        <p>CS @ University of Rochester · Class of 2029</p>
      </footer>

      <Analytics />
    </>
  );
}
