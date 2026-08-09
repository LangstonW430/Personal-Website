import { useEffect, useState } from "react";
import { Reveal } from "./components/Reveal";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { client } from "./sanity/client";
import {
  allProjectsQuery,
  projectsPageQuery,
  siteSettingsQuery,
} from "./sanity/queries";
import type {
  Project,
  ProjectsPageContent,
  SiteSettings,
} from "./sanity/types";
import { defaultProjectsPage, defaultSettings } from "./content/defaults";
import { merge, mergeSettings } from "./content/merge";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [page, setPage] = useState<ProjectsPageContent>(defaultProjectsPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Promise.all([
      client.fetch<Project[]>(allProjectsQuery),
      client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery),
      client.fetch<Partial<ProjectsPageContent> | null>(projectsPageQuery),
    ])
      .then(([allProjects, siteData, pageData]) => {
        setProjects(allProjects);
        setSettings(mergeSettings(defaultSettings, siteData));
        setPage(merge(defaultProjectsPage, pageData));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <nav className={menuOpen ? "nav-open" : ""}>
        <Link to="/" className="nav-logo">
          {settings.logoLead}
          <span>.</span>
          {settings.logoTail}
        </Link>
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <ul className="nav-links" onClick={() => setMenuOpen(false)}>
          {settings.projectsNav.map((link) => (
            <li key={link.href + link.label}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="all-projects-page">
        <Reveal className="all-projects-header">
          <p className="hero-eyebrow">{page.eyebrow}</p>
          <h1 className="all-projects-title">
            {page.titleLead}
            <br />
            <em>{page.titleEm}</em>
          </h1>
          <p className="all-projects-sub">{page.subtitle}</p>
        </Reveal>

        <div className="all-projects-list">
          {loading && <p className="fetch-status">Loading projects…</p>}
          {error && <p className="fetch-status fetch-error">Could not load projects. Please try again later.</p>}
          {projects.map((p) => (
            <Reveal key={p._id} className="ap-card">
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
                      rel="noopener noreferrer"
                    >
                      <span>GitHub</span>
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        className="btn btn-filled"
                        target="_blank"
                        rel="noopener noreferrer"
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
            </Reveal>
          ))}
        </div>
      </div>

      <footer>
        {settings.footerLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </footer>

      <Analytics />
    </>
  );
}
