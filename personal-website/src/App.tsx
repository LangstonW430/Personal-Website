import { useEffect, useState } from "react";
import { Reveal } from "./components/Reveal";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import headshotImg from "./assets/Enhanced Headshot.jpg";
import resumePDF from "./assets/CS_Resume.pdf";
import "./App.css";
import { client } from "./sanity/client";
import { featuredProjectsQuery, workingOnQuery } from "./sanity/queries";
import type { Project } from "./sanity/types";

function App() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [workingOnProjects, setWorkingOnProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      client.fetch<Project[]>(featuredProjectsQuery),
      client.fetch<Project[]>(workingOnQuery),
    ])
      .then(([featured, working]) => {
        setFeaturedProjects(featured);
        setWorkingOnProjects(working);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">
          L<span>.</span>Woods
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#working-on">What I'm Working On</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#hire">Hire Me</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <header>
        <div className="hero-left">
          <p className="hero-eyebrow">Computer Science · Class of 2029</p>
          <h1 className="hero-name">
            Langston
            <br />
            <em>Woods</em>
          </h1>
          <p className="hero-desc">
            CS student at the University of Rochester building elegant software
            solutions, from desktop productivity apps to machine learning
            classifiers.
          </p>
          <div className="hero-links">
            <a href="#projects" className="btn btn-filled">
              <span>View Projects</span>
            </a>
            <a href="#contact" className="btn">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-photo-wrap">
            <img src={headshotImg} alt="Langston Woods" />
          </div>
          <div className="deco-letter">L</div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about">
        <Reveal className="about-text">
          <div className="section-label">About Me</div>
          <h2>Turning ideas into working software</h2>
          <p>
            I'm a first-year Computer Science student at the University of
            Rochester with a 3.5 GPA, passionate about building tools that are
            both functional and thoughtfully designed.
          </p>
          <p>
            Beyond coding, I care about education — I've spent years helping
            high school students close learning gaps in math and science, and
            that same drive for clear thinking informs how I approach
            engineering problems.
          </p>
          <p>
            Currently exploring <strong>social psychology</strong> and{" "}
            <strong>ethics of technology</strong> as planned clusters, because I
            believe great engineers understand the human context of what they
            build.
          </p>
        </Reveal>

        <Reveal className="stat-grid">
          <div className="stat-box">
            <div className="stat-num">3.5</div>
            <div className="stat-label">Current GPA</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">2029</div>
            <div className="stat-label">Graduating Class</div>
          </div>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label">Experience</div>

        <div className="exp-list">
          <Reveal className="exp-item">
            <div className="exp-meta">
              <span className="exp-date">Jun 2024 – Aug 2024</span>
              <span className="exp-org">Workers United</span>
            </div>
            <div className="exp-content">
              <h3>IT Intern</h3>
              <ul>
                <li>
                  Collaborated directly with the Lead IT Specialist to support
                  day-to-day operations across the organization.
                </li>
                <li>
                  Maintained and troubleshot office hardware: desktops, laptops,
                  printers, and networking equipment.
                </li>
                <li>
                  Provided software support for staff, including installation,
                  configuration, and issue resolution.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="exp-item">
            <div className="exp-meta">
              <span className="exp-date">Jun 2022 – Present</span>
              <span className="exp-org">Vertus High School</span>
            </div>
            <div className="exp-content">
              <h3>Academic Intervention Specialist</h3>
              <ul>
                <li>
                  Delivered one-on-one and small-group math and science support
                  to 25+ students per session, achieving an average grade
                  improvement of 15%.
                </li>
                <li>
                  Collaborated with 10+ teachers to develop individualized
                  learning strategies, improving student engagement by 40%.
                </li>
                <li>
                  Monitored progress through weekly assessments with 80% of
                  students achieving grade-level proficiency.
                </li>
                <li>
                  87% of surveyed educators reported significant academic
                  improvement in supported students.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-label">Projects</div>

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
            <span>View All Projects</span>
          </Link>
        </Reveal>
      </section>

      {/* WHAT I'M WORKING ON */}
      <section id="working-on">
        <div className="section-label">What I'm Working On</div>

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
        <div className="section-label">Technical Skills</div>

        <div className="skills-layout">
          <Reveal className="skills-intro">
            <h2>Tools &amp; Technologies</h2>
            <p>
              A growing stack built through coursework and independent projects.
              Always learning something new.
            </p>
          </Reveal>

          <Reveal className="skills-grid">
            <div className="skill-category">
              <h4>Languages</h4>
              <div className="skill-pills">
                {["Python", "Java", "HTML", "CSS", "JavaScript"].map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h4>Frameworks &amp; Libraries</h4>
              <div className="skill-pills">
                {["React", "Tkinter", "scikit-learn"].map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h4>Developer Tools</h4>
              <div className="skill-pills">
                {["Git", "GitHub", "VS Code"].map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h4>Concepts</h4>
              <div className="skill-pills">
                {[
                  "Data Structures & Algorithms",
                  "Machine Learning",
                  "TF-IDF",
                  "OOP",
                  "Discrete Mathematics",
                ].map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-label">Education</div>

        <Reveal className="edu-card">
          <div>
            <div className="edu-degree">
              B.S. Computer Science | Artificial Intelligence Concentration
            </div>
            <div className="edu-school">
              University of Rochester · Rochester, NY
            </div>
            <div className="edu-details">
              <div className="edu-detail-item">
                <span className="label">Graduation</span>
                <span className="value">May 2029</span>
              </div>
              <div className="edu-detail-item">
                <span className="label">Coursework</span>
                <span className="value">
                  Data Structures &amp; Algorithms, Discrete Mathematics, Linear
                  Algebra &amp; Differential Equations
                </span>
              </div>
              <div className="edu-detail-item">
                <span className="label">Clusters</span>
                <span className="value">
                  Social Psychology · Ethics of Technology
                </span>
              </div>
            </div>
          </div>
          <div className="edu-gpa-block">
            <span className="gpa-num">3.5</span>
            <span className="gpa-label">GPA</span>
          </div>
        </Reveal>
      </section>

      {/* HIRE ME */}
      <section id="hire">
        <div className="section-label">Freelance Work</div>
        <div className="hire-layout">
          <Reveal className="hire-intro">
            <h2>
              Let's build
              <br />
              <em>something great</em>
            </h2>
            <p>
              Available for freelance projects. Whether you need a polished web
              app, a custom desktop tool, or general software development, I
              deliver clean, reliable solutions tailored to your needs.
            </p>
            <div className="hire-cta-row">
              <a href="mailto:langstonw430@gmail.com" className="btn btn-filled">
                <span>Get a Quote</span>
              </a>
              <a
                href="https://services.langstonwoods.com"
                className="btn btn-outline-cream"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Services</span>
              </a>
            </div>
          </Reveal>

          <Reveal className="hire-services">
            <div className="service-item">
              <div className="service-icon">01</div>
              <div className="service-body">
                <h4>Full-Stack Web Development</h4>
                <p>
                  End-to-end web applications built with modern stacks — React,
                  Next.js, TypeScript, Node.js, and PostgreSQL/Supabase. From
                  landing pages to full-featured platforms with auth, databases,
                  and API integrations.
                </p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon">02</div>
              <div className="service-body">
                <h4>Desktop Applications</h4>
                <p>
                  Custom desktop software for Windows and cross-platform
                  environments. GUI productivity tools, automation utilities,
                  and data management apps built with Python and other native
                  toolkits.
                </p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon">03</div>
              <div className="service-body">
                <h4>General Software Development</h4>
                <p>
                  Scripts, automation, data processing pipelines, CLI tools, and
                  anything in between. If you have a software problem, I can
                  build a solution — reliable, maintainable, and
                  well-documented.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-label">Contact</div>
        <h2 className="contact-heading">
          Let's
          <br />
          <em>connect</em>
        </h2>
        <p className="contact-sub">
          Open to internships, collaborations, and interesting conversations
          about technology.
        </p>
        <div className="contact-links">
          <a
            href="https://www.linkedin.com/in/langston-woods-16b7682b4/"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/LangstonW430"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
          </a>
          <a href={resumePDF} className="btn" target="_blank" rel="noopener noreferrer">
            <span>Resume</span>
          </a>
        </div>
        <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="contact-email">
          {import.meta.env.VITE_CONTACT_EMAIL} · {import.meta.env.VITE_CONTACT_PHONE}
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Langston Woods</p>
        <p>CS @ University of Rochester · Class of 2029</p>
      </footer>

      <Analytics />
    </>
  );
}

export default App;
