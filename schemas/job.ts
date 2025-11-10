import { BiBriefcase } from "react-icons/bi";

const job = {
  name: "job",
  title: "Job",
  type: "document",
  icon: BiBriefcase,
  fields: [
    {
      name: "name",
      title: "Company Name",
      type: "string",
    },
    {
      name: "jobTitle",
      title: "Job Title",
      type: "string",
    },
    {
      name: "logo",
      title: "Company Logo",
      type: "image",
    },
    {
      name: "url",
      title: "Company Website",
      type: "url",
    },
    {
      name: "description",
      title: "Job Description",
      type: "text",
      rows: 3,
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
    },
  ],
};

export default job;
