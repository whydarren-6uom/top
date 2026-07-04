import job from "./job";
import profile from "./profile";
import project from "./project";
import education from "./education";
import { youtube } from "./youtube";
import { table } from "./table";
import blockContent from "./blockContent";
import quiz from "./quiz";
import paymentOptimizer from "./paymentOptimizer";

export const schemaTypes = [
  profile,
  job,
  education,
  project,
  paymentOptimizer,

  // Reference types
  blockContent,
  youtube,
  table,
  quiz,
];
