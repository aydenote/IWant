'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RepoType } from '../../_types/repo';
import BuildingIcon from '../icons/BuildingIcon';
import BookmarkButton from '../buttons/BookmarkButton';
import MapPinIcon from '../icons/MapPinIcon';
import UsersIcon from '../icons/UsersIcon';
import BasicButton from '../buttons/BasicButton';
import { useSession } from 'next-auth/react';

interface RepoCardProps extends RepoType {
  bookmarkList: RepoType[];
  setBookmarkList: React.Dispatch<React.SetStateAction<RepoType[]>>;
  priorityImage?: boolean;
}

const RepoCard = ({
  repoId,
  repoName,
  ownerName,
  imageSrc,
  stars,
  language,
  openIssues,
  bookmarkList,
  setBookmarkList,
  priorityImage = false,
}: RepoCardProps) => {
  const safeSrc =
    imageSrc && imageSrc.length > 0
      ? imageSrc
      : 'https://static.wanted.co.kr/images/profile_default.png';

  const { status, data: session } = useSession();
  const isAuthed = status === 'authenticated';

  return (
    <div className="rounded-lg text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 bg-gradient-card">
      <div className="relative h-40 bg-muted">
        <Image
          src={safeSrc}
          width={400}
          height={400}
          alt="레포지토리 소유자 이미지"
          className="w-full h-full object-cover"
          loading={priorityImage ? 'eager' : 'lazy'}
          priority={priorityImage}
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1">
            <Link href={`/repo/${repoId}`}>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                {repoName}
              </h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BuildingIcon className="h-4 w-4" />
              <span className="font-medium">{ownerName}</span>
            </div>
          </div>
          {isAuthed && (
            <BookmarkButton
              repo={{
                repoId,
                repoName,
                ownerName,
                imageSrc: safeSrc,
                stars,
                language,
                openIssues,
              }}
              bookmarkList={bookmarkList}
              setBookmarkList={setBookmarkList}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4" />
            <span>{openIssues}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-border" />
        <div className="flex items-center justify-between pt-2">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-accent text-accent">
            {language}
          </div>
          <Link href={`/repo/${repoId}`}>
            <BasicButton className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 bg-gradient-hero">
              자세히 보기
            </BasicButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
