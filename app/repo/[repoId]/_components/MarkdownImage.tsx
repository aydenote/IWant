import type { CSSProperties } from 'react';
import {
  isBadgeLikeMarkdownImage,
  type MarkdownImageResolverParams,
  resolveMarkdownImageSrc,
  toPositiveNumber,
} from '../_utils/markdownImage';

interface MarkdownImageProps extends MarkdownImageResolverParams {
  alt?: string;
  height?: unknown;
  src?: string;
  title?: unknown;
  width?: unknown;
}

const MarkdownImage = ({
  alt,
  defaultBranch,
  height,
  repoFullName,
  sourcePath,
  src,
  title,
  width,
}: MarkdownImageProps) => {
  const resolvedSrc = resolveMarkdownImageSrc({
    src,
    sourcePath,
    repoFullName,
    defaultBranch,
  });

  if (!resolvedSrc) return null;

  const imageWidth = toPositiveNumber(width);
  const imageHeight = toPositiveNumber(height);
  const imageStyle: CSSProperties | undefined =
    imageWidth && imageHeight
      ? { aspectRatio: `${imageWidth} / ${imageHeight}` }
      : undefined;
  const commonImageProps = {
    src: resolvedSrc,
    alt: alt ?? '',
    title: typeof title === 'string' ? title : undefined,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    width: imageWidth ?? undefined,
    height: imageHeight ?? undefined,
  };

  if (
    isBadgeLikeMarkdownImage({
      src: resolvedSrc,
      alt,
    })
  ) {
    return (
      <img
        {...commonImageProps}
        className="my-1 inline-block h-5 max-w-full align-middle"
        style={imageStyle}
      />
    );
  }

  if (imageWidth && imageHeight) {
    return (
      <img
        {...commonImageProps}
        className="my-4 h-auto max-h-[520px] max-w-full rounded-md border border-border object-contain"
        style={imageStyle}
      />
    );
  }

  return (
    <span className="my-4 flex aspect-video w-full max-h-[520px] items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
      <img {...commonImageProps} className="h-full w-full object-contain" />
    </span>
  );
};

export default MarkdownImage;
