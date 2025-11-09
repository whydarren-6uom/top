import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { projectId, dataset } from "./lib/env.api";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "darrenwang",
  title: "darrenwang.com",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool(), codeInput(), table()],
  schema: { types: schemaTypes },
});
