import { useEffect } from "react";
import headshotImg from "./assets/Enhanced Headshot.jpg";
import resumePDF from "./assets/CS_Resume.pdf";
import "./App.css";

function App() {
  useEffect(() => {
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
        <div className="about-text reveal">
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
        </div>

        <div className="stat-grid reveal">
          <div className="stat-box">
            <div className="stat-num">3.5</div>
            <div className="stat-label">Current GPA</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">2029</div>
            <div className="stat-label">Graduating Class</div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label">Experience</div>

        <div className="exp-list">
          <div className="exp-item reveal">
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
          </div>

          <div className="exp-item reveal">
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
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-label">Projects</div>

        <div className="projects-grid">
          <div className="project-card reveal">
            <div className="project-num">01</div>
            <div className="project-tags">
              <span className="tag">Python</span>
              <span className="tag">Tkinter</span>
              <span className="tag">JSON</span>
            </div>
            <h3>
              <a
                href="https://github.com/LangstonW430/todo-list-app"
                target="_blank"
                rel="noopener"
              >
                To-Do List Desktop Application
              </a>
            </h3>
            <p>
              A GUI productivity app with persistent JSON-backed storage,
              modular three-class architecture, and features including editing,
              completion tracking, and optional due dates.
            </p>
            <div className="project-date">Nov – Dec 2025</div>
          </div>

          <div className="project-card reveal">
            <div className="project-num">02</div>
            <div className="project-tags">
              <span className="tag">Python</span>
              <span className="tag">scikit-learn</span>
              <span className="tag">TF-IDF</span>
              <span className="tag">Logistic Regression</span>
            </div>
            <h3>
              <a
                href="https://github.com/LangstonW430/Sentence-Tone-Classifier"
                target="_blank"
                rel="noopener"
              >
                Sentence Tone / Emotion Classifier
              </a>
            </h3>
            <p>
              ML model classifying text into 9 emotion categories with 85%
              accuracy on test data. Built a full preprocessing pipeline
              (lowercasing, punctuation removal, n-gram tokenization) extracting
              1,000+ features, boosting performance by 20%. Ships with an
              interactive CLI and real-time confidence scores.
            </p>
            <div className="project-date">Dec 2025</div>
          </div>
        </div>
      </section>

      {/* WHAT I'M WORKING ON */}
      <section id="working-on">
        <div className="section-label">What I'm Working On</div>

        <div className="projects-grid">
          <div className="project-card reveal">
            <div className="project-num">03</div>
            <div className="project-tags">
              <span className="tag">TypeScript</span>
              <span className="tag">React</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">Next.js</span>
              <span className="tag">CSS</span>
            </div>
            <h3>Exbo - Community Forum Website</h3>
            <p>
              A full-stack web application built with Next.js and TypeScript,
              featuring user authentication, real-time discussion threads, and
              community engagement tools. Includes account creation, posting
              capabilities, and a responsive design for seamless user
              experience. Backend powered by PostgreSQL for data persistence and
              React Router for navigation. Currently deployed on Vercel.
            </p>
            <div className="project-links">
              <a
                href="https://github.com/LangstonW430/Forum/tree/main/forum"
                className="btn"
                target="_blank"
                rel="noopener"
              >
                <span>View Code</span>
              </a>
              <a
                href="https://exbo.site"
                className="btn"
                target="_blank"
                rel="noopener"
              >
                <span>View Live Site</span>
              </a>
            </div>
            <div className="project-date">Ongoing</div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-label">Technical Skills</div>

        <div className="skills-layout">
          <div className="skills-intro reveal">
            <h2>Tools &amp; Technologies</h2>
            <p>
              A growing stack built through coursework and independent projects.
              Always learning something new.
            </p>
          </div>

          <div className="skills-grid reveal">
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
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-label">Education</div>

        <div className="edu-card reveal">
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
            rel="noopener"
          >
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/LangstonW430"
            className="btn"
            target="_blank"
            rel="noopener"
          >
            <span>GitHub</span>
          </a>
          <a href={resumePDF} className="btn" target="_blank" rel="noopener">
            <span>Resume</span>
          </a>
        </div>
        <a href="mailto:langstonw430@gmail.com" className="contact-email">
          langstonw430@gmail.com · 585-626-8038
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Langston Woods</p>
        <p>CS @ University of Rochester · Class of 2029</p>
      </footer>
    </>
  );
}

export default App;
