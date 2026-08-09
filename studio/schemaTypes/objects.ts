import { defineField, defineType } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Nav Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      description:
        'Anchor on the homepage, e.g. "#about", or a path like "/projects"',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "LinkedIn", "GitHub"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "url" } },
});

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({
      name: "num",
      title: "Value",
      type: "string",
      description: 'The big number, e.g. "3.6"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Current GPA"',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "num", subtitle: "label" } },
});

export const skillCategory = defineType({
  name: "skillCategory",
  title: "Skill Category",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Category",
      type: "string",
      description: 'e.g. "Languages", "Developer Tools"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", skills: "skills" },
    prepare: ({ title, skills }) => ({
      title,
      subtitle: (skills || []).join(" · "),
    }),
  },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const objectTypes = [
  navLink,
  socialLink,
  stat,
  skillCategory,
  service,
];
