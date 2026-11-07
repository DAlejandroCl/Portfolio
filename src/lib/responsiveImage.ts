import { getImage } from 'astro:assets';

export interface ResponsiveImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

/**
 * Optimized copies of a local image at several widths, as plain data, so a
 * React component can render the `<img>` without importing from Astro.
 */
export async function responsiveImage(
  source: ImageMetadata,
  widths: readonly number[],
): Promise<ResponsiveImage> {
  const usable = widths.filter((width) => width <= source.width);
  const sizes = usable.length > 0 ? usable : [source.width];
  const copies = await Promise.all(
    sizes.map((width) => getImage({ src: source, width, format: 'webp' })),
  );
  const first = copies[0];
  if (!first) {
    throw new Error('No image copies were generated.');
  }
  return {
    src: first.src,
    srcSet: copies.map((copy, index) => `${copy.src} ${sizes[index] ?? source.width}w`).join(', '),
    width: source.width,
    height: source.height,
  };
}
