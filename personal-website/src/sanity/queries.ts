const projectFields = `
  _id, num, title, subtitle, description, tags,
  github, live, date, featured, featuredGithub,
  workingOn, sortOrder
`;

export const allProjectsQuery = `
  *[_type == "project"] | order(sortOrder asc) { ${projectFields} }
`;

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(sortOrder asc) { ${projectFields} }
`;

export const workingOnQuery = `
  *[_type == "project" && workingOn == true] | order(sortOrder asc) { ${projectFields} }
`;

export const experienceQuery = `
  *[_type == "experience"] | order(sortOrder asc) {
    _id, role, org, dateRange, bullets, sortOrder
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    logoLead, logoTail, email, phone, resumeLabel, footerLines,
    homeNav[]{ label, href },
    projectsNav[]{ label, href },
    socials[]{ label, url },
    "resumeUrl": resume.asset->url
  }
`;

export const homePageQuery = `
  *[_type == "homePage"][0] {
    experienceLabel,
    workingOnLabel,
    hero {
      eyebrow, firstName, lastName, description,
      primaryCtaLabel, primaryCtaHref,
      secondaryCtaLabel, secondaryCtaHref,
      headshotAlt, decoLetter,
      "headshotUrl": headshot.asset->url
    },
    about { label, heading, paragraphs, stats[]{ num, label } },
    projects { label, ctaLabel },
    skills { label, heading, intro, categories[]{ title, skills } },
    education { label, degree, school, graduation, coursework, clusters, gpa },
    hire {
      label, headingLead, headingEm, intro,
      quoteCtaLabel, servicesCtaLabel, servicesUrl,
      services[]{ title, description }
    },
    contact { label, headingLead, headingEm, intro }
  }
`;

export const projectsPageQuery = `
  *[_type == "projectsPage"][0] { eyebrow, titleLead, titleEm, subtitle }
`;
