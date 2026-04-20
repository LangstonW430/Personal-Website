import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "num",
      title: "Number",
      type: "string",
      description: 'Display number, e.g. "01", "02"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
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
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "live",
      title: "Live Site URL",
      type: "url",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: 'e.g. "2026", "Ongoing", "Dec 2025"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      description: "Show in the homepage Projects section",
      initialValue: false,
    }),
    defineField({
      name: "featuredGithub",
      title: "Homepage GitHub URL (optional override)",
      type: "url",
      description:
        "Only needed if the homepage should link to a different GitHub URL than the main one",
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: "workingOn",
      title: "Currently Working On",
      type: "boolean",
      description: 'Show in the homepage "What I\'m Working On" section',
      initialValue: false,
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
    select: { title: "title", subtitle: "subtitle" },
  },
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});
