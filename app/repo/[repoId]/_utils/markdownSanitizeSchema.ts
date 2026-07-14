import { defaultSchema } from 'rehype-sanitize';

export const markdownSanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'picture', 'source'],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'align'],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      'src',
      'alt',
      'title',
      'width',
      'height',
      'loading',
    ],
    source: ['srcSet', 'srcset', 'media', 'type', 'sizes'],
  },
};
