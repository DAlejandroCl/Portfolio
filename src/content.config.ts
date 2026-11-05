import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { checkEvidenceReferences, projectBaseSchema } from './content/schemas';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    projectBaseSchema.extend({ screenshot: image() }).superRefine(checkEvidenceReferences),
});

export const collections = { projects };
