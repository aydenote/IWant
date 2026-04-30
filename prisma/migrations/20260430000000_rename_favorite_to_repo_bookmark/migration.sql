ALTER TABLE "Favorite" RENAME TO "RepoBookmark";

ALTER TABLE "RepoBookmark" RENAME COLUMN "jobId" TO "repoId";
ALTER TABLE "RepoBookmark" RENAME COLUMN "jobName" TO "repoName";
ALTER TABLE "RepoBookmark" RENAME COLUMN "companyName" TO "ownerName";
ALTER TABLE "RepoBookmark" RENAME COLUMN "place" TO "stars";
ALTER TABLE "RepoBookmark" RENAME COLUMN "career" TO "language";
ALTER TABLE "RepoBookmark" RENAME COLUMN "employmentType" TO "openIssues";

ALTER TABLE "RepoBookmark" RENAME CONSTRAINT "Favorite_pkey" TO "RepoBookmark_pkey";
ALTER TABLE "RepoBookmark" RENAME CONSTRAINT "Favorite_userId_fkey" TO "RepoBookmark_userId_fkey";
ALTER INDEX "Favorite_userId_idx" RENAME TO "RepoBookmark_userId_idx";
ALTER INDEX "Favorite_userId_jobId_key" RENAME TO "RepoBookmark_userId_repoId_key";
