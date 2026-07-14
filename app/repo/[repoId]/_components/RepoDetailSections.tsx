'use client';

import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { getMessages } from '../../../_i18n/messages';
import { useLocale } from '../../../_hooks/useLocale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BasicButton from '../../../_components/buttons/BasicButton';
import { useRepoDetailSections } from '../_hooks/useRepoDetailSections';
import type { DetailSection } from '../_types/repoDetailSection';
import { resolveMarkdownSrcSet } from '../_utils/markdownImage';
import { markdownSanitizeSchema } from '../_utils/markdownSanitizeSchema';
import MarkdownImage from './MarkdownImage';

interface RepoDetailSectionsProps {
  defaultBranch: string;
  repoFullName: string;
  sections: DetailSection[];
}

const RepoDetailSections = ({
  defaultBranch,
  repoFullName,
  sections,
}: RepoDetailSectionsProps) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const { getSectionState, selectOriginal, translateSection } =
    useRepoDetailSections({
      translationFailedMessage: messages.repoDetail.translationFailed,
    });

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const { displayContent, errorMessage, isLoading, mode, title } =
          getSectionState(section);

        return (
          <div className="space-y-3" key={section.title}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{title}</h2>
              <div className="flex flex-wrap gap-2">
                <BasicButton
                  type="button"
                  size="sm"
                  variant={mode === 'original' ? 'secondary' : 'outline'}
                  onClick={() => selectOriginal(section.title)}
                >
                  {messages.repoDetail.original}
                </BasicButton>
                <BasicButton
                  type="button"
                  size="sm"
                  variant={mode === 'ko' ? 'secondary' : 'outline'}
                  disabled={Boolean(isLoading)}
                  onClick={() => translateSection(section, 'ko')}
                >
                  {messages.repoDetail.korean}
                </BasicButton>
                <BasicButton
                  type="button"
                  size="sm"
                  variant={mode === 'en' ? 'secondary' : 'outline'}
                  disabled={Boolean(isLoading)}
                  onClick={() => translateSection(section, 'en')}
                >
                  {messages.repoDetail.english}
                </BasicButton>
              </div>
            </div>

            {isLoading && (
              <p className="text-sm text-muted-foreground">
                {messages.repoDetail.translating}
              </p>
            )}
            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeRaw,
                [rehypeSanitize, markdownSanitizeSchema],
              ]}
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
                img: ({ src, alt, title: imageTitle, width, height }) => (
                  <MarkdownImage
                    alt={alt ?? undefined}
                    defaultBranch={defaultBranch}
                    height={height}
                    repoFullName={repoFullName}
                    sourcePath={section.sourcePath}
                    src={typeof src === 'string' ? src : undefined}
                    title={imageTitle}
                    width={width}
                  />
                ),
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
