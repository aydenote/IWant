import Image from 'next/image';
import BuildingIcon from '../icons/BuildingIcon';

interface RepoCardImageProps {
  alt: string;
  priorityImage?: boolean;
  src: string | null;
}

const RepoCardImage = ({
  alt,
  priorityImage = false,
  src,
}: RepoCardImageProps) => (
  <div className="relative h-40 bg-muted">
    {src ? (
      <Image
        src={src}
        width={400}
        height={400}
        alt={alt}
        className="w-full h-full object-cover"
        loading={priorityImage ? 'eager' : 'lazy'}
        priority={priorityImage}
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <BuildingIcon className="h-12 w-12 text-muted-foreground" />
      </div>
    )}
  </div>
);

export default RepoCardImage;
