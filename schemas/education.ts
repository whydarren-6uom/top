import { BiBook } from "react-icons/bi";

const education = {
  name: "education",
  title: "Education",
  type: "document",
  icon: BiBook,
  fields: [
    {
      name: "school",
      title: "School Name",
      type: "string",
      description: "What is the name of the institution?",
    },
    {
      name: "degree",
      title: "Degree",
      type: "string",
      description: "E.g: Bachelor of Arts, Master of Science",
    },
    {
      name: "field",
      title: "Field of Study",
      type: "string",
      description: "E.g: Computer Science, Business Administration",
    },
    { name: "logo", title: "School Logo", type: "image" },
    { name: "url", title: "School Website", type: "url" },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief description about your studies, achievements, etc.",
    },
    { name: "startDate", title: "Start Date", type: "date" },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave empty if currently enrolled",
    },
  ],
};

export default education;
