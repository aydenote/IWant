'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '../(components)/header/Header';
import Text from '../(components)/Text';
import TabButton from '../(components)/buttons/TabButton';
import Profile from './(profile)/Profile';
import Resume from './(resume)/Resume';

const MyPageClient = () => {
  const { status, update } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
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

          <section className="space-y-6">
            <div className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2">
              <TabButton
                isActive={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              >
                프로필
              </TabButton>
              <TabButton
                isActive={activeTab === 'resume'}
                onClick={() => setActiveTab('resume')}
              >
                이력서
              </TabButton>
            </div>

            <div className="mt-2 outline-none space-y-6">
              {activeTab === 'profile' ? <Profile /> : <Resume />}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyPageClient;
