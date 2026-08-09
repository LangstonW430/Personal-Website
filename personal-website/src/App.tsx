import { useEffect, useState } from "react";
import { Reveal } from "./components/Reveal";
import { RichText } from "./components/RichText";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { client } from "./sanity/client";
import {
  experienceQuery,
  featuredProjectsQuery,
  homePageQuery,
  siteSettingsQuery,
  workingOnQuery,
} from "./sanity/queries";
import type {
  Experience,
  HomePage,
  Project,
  SiteSettings,
} from "./sanity/types";
import {
  defaultExperience,
  defaultHome,
  defaultSettings,
} from "./content/defaults";
import { mergeHome, mergeSettings } from "./content/merge";

function App() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [workingOnProjects, setWorkingOnProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>(defaultExperience);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [home, setHome] = useState<HomePage>(defaultHome);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      client.fetch<Project[]>(featuredProjectsQuery),
      client.fetch<Project[]>(workingOnQuery),
      client.fetch<Experience[]>(experienceQuery),
      client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery),
      client.fetch<Partial<HomePage> | null>(homePageQuery),
    ])
      .then(([featured, working, exp, siteData, homeData]) => {
        setFeaturedProjects(featured);
        setWorkingOnProjects(working);
        if (exp.length > 0) setExperience(exp);
        setSettings(mergeSettings(defaultSettings, siteData));
        setHome(mergeHome(defaultHome, homeData));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const { hero, about, skills, education, hire, contact } = home;

  return (
    <>
      {/* NAV */}
      <nav className={menuOpen ? "nav-open" : ""}>
        <a href="#" className="nav-logo">
          {settings.logoLead}
          <span>.</span>
          {settings.logoTail}
        </a>
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <ul className="nav-links" onClick={() => setMenuOpen(false)}>
          {settings.homeNav.map((link) => (
            <li key={link.href + link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <header>
        <div className="hero-left">
          <p className="hero-eyebrow">{hero.eyebrow}</p>
          <h1 className="hero-name">
            {hero.firstName}
            <br />
            <em>{hero.lastName}</em>
          </h1>
          <p className="hero-desc">{hero.description}</p>
          <div className="hero-links">
            <a href={hero.primaryCtaHref} className="btn btn-filled">
              <span>{hero.primaryCtaLabel}</span>
            </a>
            <a href={hero.secondaryCtaHref} className="btn">
              <span>{hero.secondaryCtaLabel}</span>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-photo-wrap">
            {hero.headshotUrl && (
              <img src={hero.headshotUrl} alt={hero.headshotAlt} />
            )}
          </div>
          <div className="deco-letter">{hero.decoLetter}</div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about">
        <Reveal className="about-text">
          <div className="section-label">{about.label}</div>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>
              <RichText text={paragraph} />
            </p>
          ))}
        </Reveal>

        <Reveal className="stat-grid">
          {about.stats.map((s) => (
            <div className="stat-box" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label">{home.experienceLabel}</div>

        <div className="exp-list">
          {experience.map((item) => (
            <Reveal className="exp-item" key={item._id}>
              <div className="exp-meta">
                <span className="exp-date">{item.dateRange}</span>
                <span className="exp-org">{item.org}</span>
              </div>
              <div className="exp-content">
                <h3>{item.role}</h3>
                <ul>
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-label">{home.projects.label}</div>

        <div className="projects-grid">
          {loading && <p className="fetch-status">Loading projects…</p>}
          {error && <p className="fetch-status fetch-error">Could not load projects. Please try again later.</p>}
          {featuredProjects.map((p, i) => {
            const codeHref = p.featuredGithub || p.github;
            const displayNum = (i + 1).toString().padStart(2, "0");
            return (
              <Reveal key={p._id} className="project-card" delay={i * 80}>
                <div className="project-num">{displayNum}</div>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <h3>
                  <a
                    href={p.live || codeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.title} — {p.subtitle}
                  </a>
                </h3>
                <p>{p.description}</p>
                <div className="project-links">
                  {codeHref && (
                    <a
                      href={codeHref}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Code</span>
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Live Site</span>
                    </a>
                  )}
                </div>
                <div className="project-date">{p.date}</div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="projects-cta">
          <Link to="/projects" className="btn btn-outline-cream">
            <span>{home.projects.ctaLabel}</span>
          </Link>
        </Reveal>
      </section>

      {/* WHAT I'M WORKING ON */}
      <section id="working-on">
        <div className="section-label">{home.workingOnLabel}</div>

        <Reveal className="projects-grid">
          {loading && <p className="fetch-status">Loading projects…</p>}
          {error && <p className="fetch-status fetch-error">Could not load projects. Please try again later.</p>}
          {workingOnProjects.map((p, i) => {
            const displayNum = (i + 1).toString().padStart(2, "0");
            return (
              <div key={p._id} className="project-card">
                <div className="project-num">{displayNum}</div>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-links">
                  {p.github && (
                    <a
                      href={p.github}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Code</span>
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Live Site</span>
                    </a>
                  )}
                </div>
                <div className="project-date">{p.date}</div>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-label">{skills.label}</div>

        <div className="skills-layout">
          <Reveal className="skills-intro">
            <h2>{skills.heading}</h2>
            <p>{skills.intro}</p>
          </Reveal>

          <Reveal className="skills-grid">
            {skills.categories.map((category) => (
              <div className="skill-category" key={category.title}>
                <h4>{category.title}</h4>
                <div className="skill-pills">
                  {category.skills.map((s) => (
                    <span key={s} className="pill">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-label">{education.label}</div>

        <Reveal className="edu-card">
          <div>
            <div className="edu-degree">{education.degree}</div>
            <div className="edu-school">{education.school}</div>
            <div className="edu-details">
              <div className="edu-detail-item">
                <span className="label">Graduation</span>
                <span className="value">{education.graduation}</span>
              </div>
              <div className="edu-detail-item">
                <span className="label">Coursework</span>
                <span className="value">{education.coursework}</span>
              </div>
              <div className="edu-detail-item">
                <span className="label">Clusters</span>
                <span className="value">{education.clusters}</span>
              </div>
            </div>
          </div>
          <div className="edu-gpa-block">
            <span className="gpa-num">{education.gpa}</span>
            <span className="gpa-label">GPA</span>
          </div>
        </Reveal>
      </section>

      {/* HIRE ME */}
      <section id="hire">
        <div className="section-label">{hire.label}</div>
        <div className="hire-layout">
          <Reveal className="hire-intro">
            <h2>
              {hire.headingLead}
              <br />
              <em>{hire.headingEm}</em>
            </h2>
            <p>{hire.intro}</p>
            <div className="hire-cta-row">
              <a href={`mailto:${settings.email}`} className="btn btn-filled">
                <span>{hire.quoteCtaLabel}</span>
              </a>
              <a
                href={hire.servicesUrl}
                className="btn btn-outline-cream"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{hire.servicesCtaLabel}</span>
              </a>
            </div>
          </Reveal>

          <Reveal className="hire-services">
            {hire.services.map((s, i) => (
              <div className="service-item" key={s.title}>
                <div className="service-icon">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div className="service-body">
                  <h4>{s.title}</h4>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-label">{contact.label}</div>
        <h2 className="contact-heading">
          {contact.headingLead}
          <br />
          <em>{contact.headingEm}</em>
        </h2>
        <p className="contact-sub">{contact.intro}</p>
        <div className="contact-links">
          {settings.socials.map((social) => (
            <a
              key={social.url}
              href={social.url}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{social.label}</span>
            </a>
          ))}
          {settings.resumeUrl && (
            <a
              href={settings.resumeUrl}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{settings.resumeLabel}</span>
            </a>
          )}
        </div>
        <a href={`mailto:${settings.email}`} className="contact-email">
          {[settings.email, settings.phone].filter(Boolean).join(" · ")}
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        {settings.footerLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </footer>

      <Analytics />
    </>
  );
}

export default App;
