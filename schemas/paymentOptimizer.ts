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
      name: "dataJson",
      title: "Data JSON",
      type: "text",
      rows: 30,
      description:
        "Paste the full payment optimizer JSON object. Keep the same shape as src/data/paymentOptimizer.json.",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) {
            return true;
          }

          try {
            JSON.parse(value);
            return true;
          } catch (error) {
            return "Must be valid JSON.";
          }
        }),
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
