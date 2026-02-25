'use client';

import { createPortal } from 'react-dom';
import { ChangeEvent, useRef, useState } from 'react';
import Text from '../../(components)/commons/Text';
import BasicButton from '../../(components)/buttons/BasicButton';
import Input from '../../(components)/forms/Input';
import UploadIcon from '../../(components)/icons/UploadIcon';
import { formatDate } from '../../(utils)/common';
import { useToast } from '../../(components)/toast/Toast';
import { ResumeResponse } from '../../(types)/apis';
import {
  deleteResumeClient,
  updateResumeClient,
} from '../../api/client/resume';
import Spinner from '../../(components)/commons/Spinner';

interface ResumeProps {
  resume: ResumeResponse;
  setResume: React.Dispatch<React.SetStateAction<ResumeResponse>>;
}

const Resume = ({ resume, setResume }: ResumeProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [statusText, setStatusText] = useState('');

  const handleRemoveResume = async () => {
    setIsLoading(true);
    setStatusText('삭제 중입니다...');
    try {
      const { ok: success, ...updatedResume } = await deleteResumeClient();
      if (success) {
        showToast('이력서가 성공적으로 삭제되었습니다!', 'success');
        setResume({ ok: success, ...updatedResume });
      }
    } catch (err) {
      showToast('이력서 삭제에 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
      setStatusText('');
    }
  };

  const handleSelectResume = () => {
    fileInputRef.current?.click();
  };

  const handleAddResume = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setStatusText('업로드 중입니다...');

    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('resume', file);

      const { ok: success, ...updatedResume } =
        await updateResumeClient(formData);
      setResume({ ok: success, ...updatedResume });
    } catch (err) {
      showToast('이력서 업로드에 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
      setStatusText('');
    }
  };

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
            onClick={handleSelectResume}
          >
            파일 선택
          </BasicButton>
          <Input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleAddResume}
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
                    {resume.resumeName ?? '빈 파일.pdf'}
                  </Text>
                  <Text textSize="xs" textColor="bluegray500">
                    {resume.modifiedDate
                      ? formatDate(resume.modifiedDate)
                      : '알 수 없음'}
                  </Text>
                </div>
              </div>
              <div className="flex gap-2">
                {resume?.resumeUrl && (
                  <>
                    <a
                      href={resume.resumeUrl}
                      download={resume.resumeName ?? undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 gap-2"
                    >
                      다운로드
                    </a>
                    <BasicButton
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer text-destructive"
                      onClick={handleRemoveResume}
                    >
                      삭제
                    </BasicButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-black/60 px-6 py-5 shadow-2xl">
              <Spinner
                className="border-t-transparent border-white/80"
                size="lg"
              />
              <p className="text-base font-semibold text-white/90">
                {statusText}
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Resume;
