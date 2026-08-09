import { defineField, defineType } from "sanity";

const boldHint =
  "Wrap words in **double asterisks** to bold them.";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  description: "Every section of the homepage except the project cards themselves.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "projects", title: "Projects" },
    { name: "skills", title: "Skills" },
    { name: "education", title: "Education" },
    { name: "hire", title: "Freelance" },
    { name: "contact", title: "Contact" },
  ],

  fields: [
    /* ---------------------------------------------------------------- HERO */
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: 'Small line above the name, e.g. "Computer Science · Class of 2029"',
        }),
        defineField({
          name: "firstName",
          title: "Name — First Line",
          type: "string",
        }),
        defineField({
          name: "lastName",
          title: "Name — Second Line (italic)",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Intro Paragraph",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "primaryCtaLabel",
          title: "Primary Button — Label",
          type: "string",
        }),
        defineField({
          name: "primaryCtaHref",
          title: "Primary Button — Href",
          type: "string",
          description: 'e.g. "#projects"',
        }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary Button — Label",
          type: "string",
        }),
        defineField({
          name: "secondaryCtaHref",
          title: "Secondary Button — Href",
          type: "string",
          description: 'e.g. "#contact"',
        }),
        defineField({
          name: "headshot",
          title: "Headshot",
          type: "image",
          options: { hotspot: true },
          description:
            "Optional. Leave empty to keep the photo bundled with the site.",
        }),
        defineField({
          name: "headshotAlt",
          title: "Headshot Alt Text",
          type: "string",
        }),
        defineField({
          name: "decoLetter",
          title: "Decorative Letter",
          type: "string",
          description: "The oversized letter behind the photo.",
        }),
      ],
    }),

    /* --------------------------------------------------------------- ABOUT */
    defineField({
      name: "about",
      title: "About",
      type: "object",
      group: "about",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text" }],
          description: boldHint,
        }),
        defineField({
          name: "stats",
          title: "Stat Boxes",
          type: "array",
          of: [{ type: "stat" }],
        }),
      ],
    }),

    /* ---------------------------------------------------------- EXPERIENCE */
    defineField({
      name: "experienceLabel",
      title: "Experience — Section Label",
      type: "string",
      group: "about",
      description: "The entries themselves live under Experience in the sidebar.",
    }),

    /* ------------------------------------------------------------ PROJECTS */
    defineField({
      name: "projects",
      title: "Projects Section",
      type: "object",
      group: "projects",
      options: { collapsible: true, collapsed: false },
      description:
        'Cards come from Projects with "Featured on Homepage" enabled.',
      fields: [
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({
          name: "ctaLabel",
          title: "“View All Projects” Button Label",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "workingOnLabel",
      title: "“What I'm Working On” — Section Label",
      type: "string",
      group: "projects",
      description:
        'Cards come from Projects with "Currently Working On" enabled.',
    }),

    /* -------------------------------------------------------------- SKILLS */
    defineField({
      name: "skills",
      title: "Skills",
      type: "object",
      group: "skills",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "intro", title: "Intro Paragraph", type: "text", rows: 3 }),
        defineField({
          name: "categories",
          title: "Categories",
          type: "array",
          of: [{ type: "skillCategory" }],
        }),
      ],
    }),

    /* ----------------------------------------------------------- EDUCATION */
    defineField({
      name: "education",
      title: "Education",
      type: "object",
      group: "education",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({ name: "degree", title: "Degree", type: "string" }),
        defineField({ name: "school", title: "School & Location", type: "string" }),
        defineField({ name: "graduation", title: "Graduation", type: "string" }),
        defineField({ name: "coursework", title: "Coursework", type: "text", rows: 3 }),
        defineField({ name: "clusters", title: "Clusters", type: "string" }),
        defineField({ name: "gpa", title: "GPA", type: "string" }),
      ],
    }),

    /* ------------------------------------------------------------ FREELANCE */
    defineField({
      name: "hire",
      title: "Freelance",
      type: "object",
      group: "hire",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({ name: "headingLead", title: "Heading — First Line", type: "string" }),
        defineField({
          name: "headingEm",
          title: "Heading — Second Line (italic)",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro Paragraph", type: "text", rows: 4 }),
        defineField({
          name: "quoteCtaLabel",
          title: "Email Button Label",
          type: "string",
          description: "Links to the contact email in Site Settings.",
        }),
        defineField({
          name: "servicesCtaLabel",
          title: "Services Button Label",
          type: "string",
        }),
        defineField({ name: "servicesUrl", title: "Services URL", type: "url" }),
        defineField({
          name: "services",
          title: "Services",
          type: "array",
          of: [{ type: "service" }],
          description: "Numbered automatically in the order listed.",
        }),
      ],
    }),

    /* ------------------------------------------------------------- CONTACT */
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      group: "contact",
      options: { collapsible: true, collapsed: false },
      description: "Email, phone and social links live in Site Settings.",
      fields: [
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({ name: "headingLead", title: "Heading — First Line", type: "string" }),
        defineField({
          name: "headingEm",
          title: "Heading — Second Line (italic)",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro Paragraph", type: "text", rows: 3 }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
