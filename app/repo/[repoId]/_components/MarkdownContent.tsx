import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { resolveMarkdownSrcSet } from '../_utils/markdownImage';
import { markdownSanitizeSchema } from '../_utils/markdownSanitizeSchema';
import MarkdownImage from './MarkdownImage';

interface MarkdownContentProps {
  children: string;
  defaultBranch: string;
  repoFullName: string;
  sourcePath?: string | null;
}

const MarkdownContent = ({
  children,
  defaultBranch,
  repoFullName,
  sourcePath,
}: MarkdownContentProps) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw, [rehypeSanitize, markdownSanitizeSchema]]}
    components={{
      a: ({ children: linkChildren, ...props }) => (
        <a
          {...props}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-2"
        >
          {linkChildren}
        </a>
      ),
      code: ({ children: codeChildren, className, ...props }) => (
        <code
          {...props}
          className={`${className ?? ''} rounded bg-muted px-1 py-0.5 text-sm`}
        >
          {codeChildren}
        </code>
      ),
      pre: ({ children: preChildren }) => (
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm leading-6">
          {preChildren}
        </pre>
      ),
      h1: ({ children: headingChildren }) => (
        <h1 className="mt-6 text-2xl font-bold first:mt-0">
          {headingChildren}
        </h1>
      ),
      h2: ({ children: headingChildren }) => (
        <h2 className="mt-5 text-xl font-semibold first:mt-0">
          {headingChildren}
        </h2>
      ),
      h3: ({ children: headingChildren }) => (
        <h3 className="mt-4 text-lg font-semibold first:mt-0">
          {headingChildren}
        </h3>
      ),
      p: ({ children: paragraphChildren }) => (
        <p className="my-3 leading-7 text-foreground/90">
          {paragraphChildren}
        </p>
      ),
      ul: ({ children: listChildren }) => (
        <ul className="my-3 list-disc space-y-1 pl-6">{listChildren}</ul>
      ),
      ol: ({ children: listChildren }) => (
        <ol className="my-3 list-decimal space-y-1 pl-6">{listChildren}</ol>
      ),
      blockquote: ({ children: quoteChildren }) => (
        <blockquote className="my-4 border-l-4 border-border pl-4 text-muted-foreground">
          {quoteChildren}
        </blockquote>
      ),
      table: ({ children: tableChildren }) => (
        <div className="my-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            {tableChildren}
          </table>
        </div>
      ),
      th: ({ children: cellChildren }) => (
        <th className="border border-border bg-muted px-3 py-2 text-left font-semibold">
          {cellChildren}
        </th>
      ),
      td: ({ children: cellChildren }) => (
        <td className="border border-border px-3 py-2">{cellChildren}</td>
      ),
      picture: ({ children: pictureChildren }) => <picture>{pictureChildren}</picture>,
      source: ({ srcSet, ...props }) => {
        const resolvedSrcSet = resolveMarkdownSrcSet({
          srcSet: typeof srcSet === 'string' ? srcSet : undefined,
          sourcePath,
          repoFullName,
          defaultBranch,
        });

        return <source {...props} srcSet={resolvedSrcSet} />;
      },
      img: ({ src, alt, title, width, height }) => (
        <MarkdownImage
          alt={alt ?? undefined}
          defaultBranch={defaultBranch}
          height={height}
          repoFullName={repoFullName}
          sourcePath={sourcePath}
          src={typeof src === 'string' ? src : undefined}
          title={title}
          width={width}
        />
      ),
    }}
  >
    {children}
  </ReactMarkdown>
);

export default MarkdownContent;
