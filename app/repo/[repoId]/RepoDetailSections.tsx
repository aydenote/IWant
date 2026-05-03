'use client';

import { useState } from 'react';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getTranslate, TranslateTarget } from '../../api/client/translate';
import BasicButton from '../../_components/buttons/BasicButton';

type TranslateMode = 'original' | TranslateTarget;

interface DetailSection {
  title: string;
  content: string;
  fallbackContent?: Partial<Record<TranslateMode, string>>;
  sourcePath?: string | null;
}

interface RepoDetailSectionsProps {
  defaultBranch: string;
  repoFullName: string;
  sections: DetailSection[];
}

const isAbsoluteUrl = (src: string) =>
  /^https?:\/\//i.test(src) || src.startsWith('//') || src.startsWith('data:');

const getDirectoryPath = (path?: string | null) => {
  if (!path || !path.includes('/')) return '';
  return path.split('/').slice(0, -1).join('/');
};

const normalizeRelativePath = (path: string) => {
  const parts: string[] = [];

  path.split('/').forEach((part) => {
    if (!part || part === '.') return;
    if (part === '..') {
      parts.pop();
      return;
    }
    parts.push(part);
  });

  return parts.join('/');
};

const resolveMarkdownImageSrc = ({
  src,
  sourcePath,
  repoFullName,
  defaultBranch,
}: {
  src?: string;
  sourcePath?: string | null;
  repoFullName: string;
  defaultBranch: string;
}) => {
  if (!src || isAbsoluteUrl(src)) return src;

  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  const basePath = src.startsWith('/') ? '' : getDirectoryPath(sourcePath);
  const imagePath = normalizeRelativePath(
    [basePath, normalizedSrc].filter(Boolean).join('/')
  );

  return `https://raw.githubusercontent.com/${repoFullName}/${defaultBranch}/${imagePath}`;
};

const resolveMarkdownSrcSet = ({
  srcSet,
  sourcePath,
  repoFullName,
  defaultBranch,
}: {
  srcSet?: string;
  sourcePath?: string | null;
  repoFullName: string;
  defaultBranch: string;
}) => {
  if (!srcSet) return srcSet;

  return srcSet
    .split(',')
    .map((candidate) => {
      const trimmedCandidate = candidate.trim();
      const [, src = '', descriptor = ''] =
        trimmedCandidate.match(/^(\S+)(.*)$/) ?? [];
      const resolvedSrc = resolveMarkdownImageSrc({
        src,
        sourcePath,
        repoFullName,
        defaultBranch,
      });

      return [resolvedSrc, descriptor.trim()].filter(Boolean).join(' ');
    })
    .join(', ');
};

const markdownSanitizeSchema = {
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

const getTranslationKey = (sectionTitle: string, target: TranslateTarget) =>
  `${sectionTitle}:${target}`;

const hasContent = (section: DetailSection) => section.content.trim().length > 0;

const getSectionTitle = (title: string, mode: TranslateMode) => {
  if (mode !== 'en') return title;

  const titleMap: Record<string, string> = {
    README: 'README',
    '기여 이슈': 'Contribution Issues',
    '기여 방법': 'Contribution Guide',
  };

  return titleMap[title] ?? title;
};

const RepoDetailSections = ({
  defaultBranch,
  repoFullName,
  sections,
}: RepoDetailSectionsProps) => {
  const [modes, setModes] = useState<Record<string, TranslateMode>>({});
  const [translatedSections, setTranslatedSections] = useState<
    Record<string, string>
  >({});
  const [loadingKeys, setLoadingKeys] = useState<Record<string, boolean>>({});
  const [errorKeys, setErrorKeys] = useState<Record<string, string>>({});

  const handleTranslate = async (
    section: DetailSection,
    target: TranslateTarget
  ) => {
    const key = getTranslationKey(section.title, target);

    setModes((prev) => ({ ...prev, [section.title]: target }));
    if (!hasContent(section) && section.fallbackContent?.[target]) return;
    if (translatedSections[key]) return;

    setLoadingKeys((prev) => ({ ...prev, [key]: true }));
    setErrorKeys((prev) => ({ ...prev, [key]: '' }));

    try {
      const translated = await getTranslate(section.content, target);
      setTranslatedSections((prev) => ({ ...prev, [key]: translated }));
    } catch (err) {
      console.error(err);
      setErrorKeys((prev) => ({
        ...prev,
        [key]: '번역에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      }));
      setModes((prev) => ({ ...prev, [section.title]: 'original' }));
    } finally {
      setLoadingKeys((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const mode = modes[section.title] ?? 'original';
        const translationKey =
          mode === 'original' ? null : getTranslationKey(section.title, mode);
        const displayContent =
          !hasContent(section)
            ? section.fallbackContent?.[mode] ??
              section.fallbackContent?.original ??
              ''
            : translationKey && translatedSections[translationKey]
            ? translatedSections[translationKey]
            : section.content;
        const isLoading = translationKey ? loadingKeys[translationKey] : false;
        const errorMessage = translationKey ? errorKeys[translationKey] : '';

        return (
          <div className="space-y-3" key={section.title}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">
                {getSectionTitle(section.title, mode)}
              </h2>
              <div className="flex flex-wrap gap-2">
                <BasicButton
                  type="button"
                  size="sm"
                  variant={mode === 'original' ? 'secondary' : 'outline'}
                  onClick={() =>
                    setModes((prev) => ({
                      ...prev,
                      [section.title]: 'original',
                    }))
                  }
                >
                  원문
                </BasicButton>
                <BasicButton
                  type="button"
                  size="sm"
                  variant={mode === 'ko' ? 'secondary' : 'outline'}
                  disabled={Boolean(isLoading)}
                  onClick={() => handleTranslate(section, 'ko')}
                >
                  한국어
                </BasicButton>
                <BasicButton
                  type="button"
                  size="sm"
                  variant={mode === 'en' ? 'secondary' : 'outline'}
                  disabled={Boolean(isLoading)}
                  onClick={() => handleTranslate(section, 'en')}
                >
                  English
                </BasicButton>
              </div>
            </div>

            {isLoading && (
              <p className="text-sm text-muted-foreground">번역 중...</p>
            )}
            {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, [rehypeSanitize, markdownSanitizeSchema]]}
              components={{
                a: ({ children, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    {children}
                  </a>
                ),
                code: ({ children, className, ...props }) => (
                  <code
                    {...props}
                    className={`${className ?? ''} rounded bg-muted px-1 py-0.5 text-sm`}
                  >
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm leading-6">
                    {children}
                  </pre>
                ),
                h1: ({ children }) => (
                  <h1 className="mt-6 text-2xl font-bold first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-5 text-xl font-semibold first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-4 text-lg font-semibold first:mt-0">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="my-3 leading-7 text-foreground/90">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="my-3 list-disc space-y-1 pl-6">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-3 list-decimal space-y-1 pl-6">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-4 border-l-4 border-border pl-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="my-4 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-border bg-muted px-3 py-2 text-left font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-border px-3 py-2">{children}</td>
                ),
                picture: ({ children }) => <picture>{children}</picture>,
                source: ({ srcSet, ...props }) => {
                  const resolvedSrcSet = resolveMarkdownSrcSet({
                    srcSet: typeof srcSet === 'string' ? srcSet : undefined,
                    sourcePath: section.sourcePath,
                    repoFullName,
                    defaultBranch,
                  });

                  return <source {...props} srcSet={resolvedSrcSet} />;
                },
                img: ({ src, alt }) => {
                  const resolvedSrc = resolveMarkdownImageSrc({
                    src: typeof src === 'string' ? src : undefined,
                    sourcePath: section.sourcePath,
                    repoFullName,
                    defaultBranch,
                  });

                  if (!resolvedSrc) return null;

                  return (
                    <img
                      src={resolvedSrc}
                      alt={alt ?? ''}
                      loading="lazy"
                      className="my-4 max-h-[520px] max-w-full rounded-md border border-border object-contain"
                    />
                  );
                },
              }}
            >
              {displayContent}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
};

export default RepoDetailSections;
