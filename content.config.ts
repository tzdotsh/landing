import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: {
        include: "blog/**",
        exclude: ["blog/_template.md"],
      },
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        datePublished: z.coerce.date(),
        dateUpdated: z.coerce.date().optional(),
        author: z.string().default("Maxco"),
        authorBio: z.string().optional(),
        tags: z.array(z.string()).default([]),
        category: z.string().optional(),
        image: z.string().optional(),
        locale: z.enum(["en-en", "es-es"]).default("en-en"),
        draft: z.boolean().default(false),
        faq: z.array(faqItemSchema).optional(),
      }),
    }),
  },
});
