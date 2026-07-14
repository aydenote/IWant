import Link from 'next/link';

interface RepoCardFooterProps {
  detailLabel: string;
  detailText: string;
  language: string;
  repoHref: string;
  repoName: string;
}

const RepoCardFooter = ({
  detailLabel,
  detailText,
  language,
  repoHref,
  repoName,
}: RepoCardFooterProps) => (
  <div className="flex items-center justify-between pt-2">
    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-accent text-accent">
      {language}
    </div>
    <Link
      aria-label={detailLabel}
      className="inline-flex h-9 cursor-pointer items-center justify-center rounded-md bg-gradient-hero px-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      href={repoHref}
      title={detailLabel}
    >
      <span className="sr-only">{repoName} </span>
      {detailText}
    </Link>
  </div>
);

export default RepoCardFooter;
