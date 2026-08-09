import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description: "Global content shared by every page: logo, nav, contact details, footer.",
  groups: [
    { name: "brand", title: "Brand & Nav", default: true },
    { name: "contact", title: "Contact" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "logoLead",
      title: "Logo — First Part",
      type: "string",
      group: "brand",
      description: 'Text before the accent dot. Currently "L".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logoTail",
      title: "Logo — Second Part",
      type: "string",
      group: "brand",
      description: 'Text after the accent dot. Currently "Woods".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "homeNav",
      title: "Homepage Nav Links",
      type: "array",
      group: "brand",
      of: [{ type: "navLink" }],
      description:
        "Order matters. Hrefs must match the section ids on the homepage (#about, #experience, #projects, #working-on, #skills, #hire, #contact).",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "projectsNav",
      title: "Projects Page Nav Links",
      type: "array",
      group: "brand",
      of: [{ type: "navLink" }],
      description: 'Shorter nav shown on /projects. Use "/#about" style hrefs to jump back to the homepage.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      group: "contact",
      description: "Used by the contact line and the freelance “Get a Quote” button.",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      group: "contact",
      of: [{ type: "socialLink" }],
      description: "Buttons in the Contact section, in order.",
    }),
    defineField({
      name: "resume",
      title: "Resume PDF",
      type: "file",
      group: "contact",
      description:
        "Optional. Upload to override the resume bundled with the site — lets you swap your resume without a redeploy.",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "resumeLabel",
      title: "Resume Button Label",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "footerLines",
      title: "Footer Lines",
      type: "array",
      group: "footer",
      of: [{ type: "string" }],
      description: "One line per entry. Shown on every page.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
