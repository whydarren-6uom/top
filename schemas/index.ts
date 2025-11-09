import job from "./job";
import profile from "./profile";
import project from "./project";
import education from "./education";
import { youtube } from "./youtube";
import { table } from "./table";
import blockContent from "./blockContent";
import quiz from "./quiz";

export const schemaTypes = [
  profile,
  job,
  education,
  project,

  // Reference types
  blockContent,
  youtube,
  table,
  quiz,
];
