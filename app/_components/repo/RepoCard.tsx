'use client';

import { RepoType } from '../../_types/repo';
import BookmarkButton from '../buttons/BookmarkButton';
import MapPinIcon from '../icons/MapPinIcon';
import UsersIcon from '../icons/UsersIcon';
import { useRepoCard } from '../../_hooks/useRepoCard';
import Surface from '../commons/Surface';
import RepoCardFooter from './RepoCardFooter';
import RepoCardHeader from './RepoCardHeader';
import RepoCardImage from './RepoCardImage';
import RepoStat from './RepoStat';

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
  const {
    detailLinkLabel,
    isAuthed,
    messages,
    repoHref,
    safeImageSrc,
  } = useRepoCard({ repoId, repoName, imageSrc });

  return (
    <Surface
      className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30"
      padding="none"
      shadow="sm"
    >
      <RepoCardImage
        alt={messages.repoCard.ownerImageAlt}
        priorityImage={priorityImage}
        src={safeImageSrc}
      />
      <div className="p-6 space-y-4">
        <RepoCardHeader
          bookmarkSlot={
            isAuthed ? (
              <BookmarkButton
                repo={{
                  repoId,
                  repoName,
                  ownerName,
                  imageSrc: safeImageSrc,
                  stars,
                  language,
                  openIssues,
                }}
                bookmarkList={bookmarkList}
                setBookmarkList={setBookmarkList}
              />
            ) : null
          }
          ownerName={ownerName}
          repoHref={repoHref}
          repoName={repoName}
        />
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <RepoStat icon={<MapPinIcon className="h-4 w-4" />}>{stars}</RepoStat>
          <RepoStat icon={<UsersIcon className="h-4 w-4" />}>
            {openIssues}
          </RepoStat>
        </div>
        <div className="pt-2 border-t border-border" />
        <RepoCardFooter
          detailLabel={detailLinkLabel}
          detailText={messages.repoCard.details}
          language={language}
          repoHref={repoHref}
          repoName={repoName}
        />
      </div>
    </Surface>
  );
};

export default RepoCard;
