import { defineField, defineType } from "sanity";

export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  description: "The header copy on /projects. The list itself comes from Projects.",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: 'Small label above the title, e.g. "All Projects"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titleLead",
      title: "Title — First Line",
      type: "string",
      description: 'Plain text, e.g. "Things I\'ve"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titleEm",
      title: "Title — Second Line (italic)",
      type: "string",
      description: 'Rendered italic on its own line, e.g. "built"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Projects Page" }),
  },
});
