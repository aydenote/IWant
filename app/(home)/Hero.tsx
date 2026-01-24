'use client';

import { FormEvent } from 'react';
import { SearchIcon } from '../(components)/icons/SearchIcon';
import Text from '../(components)/Text';
import BasicButton from '../(components)/buttons/BasicButton';

interface heroProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  onReset: () => void;
}

const Hero = ({ value, onChange, onSubmit, onReset }: heroProps) => {
  const isSearch = value.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <section className="bg-gradient-hero py-20 px-4">
      <div className="container mx-auto text-center space-y-6">
        <Text textSize="4xl" textBold="xl" textColor="white">
          당신의 커리어를 위한 최고의 기회
        </Text>
        <Text textSize="lg" textColor="white">
          JD와 개인화된 추천으로 완벽한 포지션을 찾아보세요
        </Text>

        <div className="pt-4">
          <form className="w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                className="flex w-full rounded-md border bg-background px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm pl-12 pr-40 h-14 text-base shadow-md border-border focus:border-primary"
                placeholder="회사명을 검색하세요..."
              />

              {isSearch && (
                <BasicButton
                  type="button"
                  onClick={onReset}
                  variant="outline"
                  size="sm"
                  className="absolute cursor-pointer right-2.5 top-1/2 -translate-y-1/2 bg-background/80"
                >
                  초기화
                </BasicButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
