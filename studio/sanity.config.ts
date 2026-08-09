import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, singletonTypes } from "./schemaTypes";

const singletons = new Set(singletonTypes);

/** Singletons are edited in place, so these actions never apply to them. */
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "personal-website",
  title: "Personal Website",

  projectId: "8nxoag3r",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings"),
              ),
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .title("Home Page"),
              ),
            S.listItem()
              .title("Projects Page")
              .id("projectsPage")
              .child(
                S.document()
                  .schemaType("projectsPage")
                  .documentId("projectsPage")
                  .title("Projects Page"),
              ),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("experience").title("Experience"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Keep singletons out of the global "create new document" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },

  document: {
    // Singletons can be edited and published, but never duplicated or deleted.
    actions: (input, { schemaType }) =>
      singletons.has(schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
