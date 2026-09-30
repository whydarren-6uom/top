import { defineField, defineType } from "sanity";
import { BiCreditCard } from "react-icons/bi";

export default defineType({
  name: "paymentOptimizer",
  title: "Payment Optimizer JSON",
  type: "document",
  icon: BiCreditCard,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Payment Optimizer Rules",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      initialValue: "default",
      description: "Use default for the hidden /payments page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dataFile",
      title: "Data JSON File",
      type: "file",
      description:
        "Optional validated v13 override for /payments. Older, malformed, or unavailable files fall back to the checked-in v13 catalog.",
      options: {
        accept: "application/json,.json",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      lastUpdated: "lastUpdated",
    },
    prepare({ title, lastUpdated }) {
      return {
        title: title ?? "Payment Optimizer Rules",
        subtitle: lastUpdated ? `Last updated: ${lastUpdated}` : "No date",
      };
    },
  },
});
