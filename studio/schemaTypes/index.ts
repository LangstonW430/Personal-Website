import { project } from "./project";
import { experience } from "./experience";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { projectsPage } from "./projectsPage";
import { objectTypes } from "./objects";

/** Document types that must only ever have one instance. */
export const singletonTypes = ["siteSettings", "homePage", "projectsPage"];

export const schemaTypes = [
  siteSettings,
  homePage,
  projectsPage,
  project,
  experience,
  ...objectTypes,
];
