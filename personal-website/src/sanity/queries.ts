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
