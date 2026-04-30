import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RepoDetailSectionsProps {
  sections: {
    title: string;
    content: string;
  }[];
}

const RepoDetailSections = ({ sections }: RepoDetailSectionsProps) => (
  <div className="space-y-6">
    {sections.map((section) => (
      <div className="space-y-2" key={section.title}>
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            div: ({ children, className, ...props }) => (
              <div {...props} className={className}>
                {children}
              </div>
            ),
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
              <h1 className="mt-6 text-2xl font-bold first:mt-0">{children}</h1>
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
              <p className="my-3 leading-7 text-foreground/90">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="my-3 list-disc space-y-1 pl-6">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-3 list-decimal space-y-1 pl-6">{children}</ol>
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
            image: ({ ...props }) => {
              // const resolvedSrc = props.src?.startsWith('http')
              //   ? src
              //   : `${baseUrl}${src}`;

              // https://github.com/user-attachments/assets/

              https: return (
                <Image
                  src={
                    'https://github.com/user-attachments/assets/' +
                    'bfb35bf5-e7cb-49ef-8c78-1d8cb55cd762'
                  }
                  alt={''}
                  style={{ maxWidth: '100%' }}
                />
              );
            },
          }}
        >
          {section.content}
        </ReactMarkdown>
      </div>
    ))}
  </div>
);

export default RepoDetailSections;
