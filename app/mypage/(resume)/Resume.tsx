'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Text from '../../(components)/Text';
import BasicButton from '../../(components)/buttons/BasicButton';
import Input from '../../(components)/forms/Input';
import UploadIcon from '../../(components)/icons/UploadIcon';
import { UploadedFileType } from '../../(types)/common';
import { INIT_EMPTY_FILE } from '../../(constants)/resume';
import { formatDate } from '../../(utils)/common';
import { getResume, saveResume } from '../../api/client/mypage/resume';

const Resume = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { status } = useSession();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [uploadFile, setUploadFile] =
    useState<UploadedFileType>(INIT_EMPTY_FILE);

  useEffect(() => {
    if (status !== 'authenticated') return;
    const loadProfile = async () => {
      const { resumeUrl, resumeName } = await getResume();
      setResumeUrl(resumeUrl ?? null);
      setResumeName(resumeName ?? null);

      if (resumeUrl || resumeName) {
        setUploadFile({
          name: resumeName ?? '업로드된 이력서.pdf',
          lastModified: Date.now(),
        });
      } else {
        setUploadFile(INIT_EMPTY_FILE);
      }
    };
    loadProfile();
  }, [status]);

  const deleteResume = async () => {
    const hasUploaded =
      !!resumeUrl ||
      uploadFile.name !== INIT_EMPTY_FILE.name ||
      uploadFile.lastModified !== INIT_EMPTY_FILE.lastModified;
    if (!hasUploaded) return;
    setFromProfile(null, null);
  };
  const selectResume = () => {
    fileInputRef.current?.click();
  };

  const uploadResume = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    const { resumeUrl, resumeName } = await saveResume(formData);

    setResumeUrl(resumeUrl);
    setResumeName(resumeName ?? file.name);

    setUploadFile({
      name: resumeName ?? file.name,
      lastModified: file.lastModified,
    });
  };

  const setFromProfile = useCallback(
    (url: string | null, name: string | null) => {
      setResumeUrl(url);
      setResumeName(name);
      if (url || name) {
        setUploadFile({
          name: name ?? '업로드된 이력서.pdf',
          lastModified: Date.now(),
        });
      } else {
        setUploadFile(INIT_EMPTY_FILE);
      }
    },
    []
  );

  return (
    <section className="p-8 space-y-6 bg-gradient-card shadow-lg">
      <div className="space-y-4">
        <Text as="h2" textSize="2xl" textBold="lg" textColor="black">
          이력서 관리
        </Text>

        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4 hover:border-primary transition-colors">
          <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground" />
          <div className="space-y-2">
            <Text textSize="sm" textColor="bluegray500">
              이력서 파일을 클릭하여 업로드하세요
            </Text>
            <Text textSize="xs" textColor="bluegray500">
              PDF 파일 (최대 10MB)
            </Text>
          </div>
          <BasicButton
            variant="outline"
            className="mt-4 cursor-pointer"
            onClick={selectResume}
          >
            파일 선택
          </BasicButton>
          <Input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={uploadResume}
          />
        </div>

        <div className="pt-4">
          <Text
            as="h3"
            textSize="sm"
            textBold="lg"
            textColor="black"
            className="mb-3"
          >
            업로드된 이력서
          </Text>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                  <UploadIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Text textSize="sm" textBold="lg" textColor="black">
                    {uploadFile.name}
                  </Text>
                  <Text textSize="xs" textColor="bluegray500">
                    {typeof uploadFile.lastModified === 'string'
                      ? '알 수 없음'
                      : formatDate(uploadFile.lastModified)}
                  </Text>
                </div>
              </div>
              <div className="flex gap-2">
                {resumeUrl ? (
                  <a
                    href={resumeUrl}
                    download={resumeName ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 gap-2"
                  >
                    다운로드
                  </a>
                ) : null}
                <BasicButton
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer text-destructive"
                  onClick={deleteResume}
                >
                  삭제
                </BasicButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
