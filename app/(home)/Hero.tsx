'use client';

import { SearchIcon } from '../(components)/icons/SearchIcon';
import Text from '../(components)/Text';

const Hero = () => {
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
          <form className="w-full max-w-3xl mx-auto">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
