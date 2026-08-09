import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'e.g. "IT Intern"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "org",
      title: "Organization",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dateRange",
      title: "Dates",
      type: "string",
      description: 'Free text, e.g. "Jun 2024 – Aug 2024" or "Jun 2022 – Present"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bullets",
      title: "Bullet Points",
      type: "array",
      of: [{ type: "text" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "role", org: "org", dateRange: "dateRange" },
    prepare: ({ title, org, dateRange }) => ({
      title,
      subtitle: [org, dateRange].filter(Boolean).join(" · "),
    }),
  },
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});
