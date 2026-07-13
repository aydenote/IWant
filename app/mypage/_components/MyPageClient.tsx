'use client';

import Text from '../../_components/commons/Text';
import Profile from './Profile';
import { ProfileResponse } from '../../_types/profile';

interface MyPageClientProps {
  profile: ProfileResponse | null;
}

const MyPageClient = ({ profile }: MyPageClientProps) => {
  return (
    <div className="container mx-auto px-4 pt-12">
      <div className="max-w-4xl mx-auto">
        <Text
          as="h1"
          textSize="3xl"
          textBold="xl"
          textColor="black"
          className="mb-8"
        >
          마이페이지
        </Text>

        <section className="mt-2 outline-none space-y-6">
          <Profile profile={profile} />
        </section>
      </div>
    </div>
  );
};

export default MyPageClient;
