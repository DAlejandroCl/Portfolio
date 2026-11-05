import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { checkEvidenceReferences, projectBaseSchema, publicationSchema } from './content/schemas';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    projectBaseSchema.extend({ screenshot: image() }).superRefine(checkEvidenceReferences),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: publicationSchema,
});

export const collections = { projects, publications };
