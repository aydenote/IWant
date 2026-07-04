import { permanentRedirect } from 'next/navigation';

interface SearchPageProps {
  params: Promise<{ skill: string }>;
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { skill: skillSlug } = await params;
  permanentRedirect(`/ko/search/${skillSlug}`);
}
