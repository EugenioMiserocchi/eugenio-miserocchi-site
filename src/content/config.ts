import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    readTime: z.string(),
    category: z.string(),
    categorySlug: z.string(),
  }),
});

export const collections = { insights };
