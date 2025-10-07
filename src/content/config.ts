import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		tags: z.array(z.string()).default([]),
		status: z.enum(['active', 'in-dev', 'archived']),
		repo: z.string().url().optional(),
		demo: z.string().url().optional(),
		date_started: z.string().optional(),
		date_updated: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { projects };
