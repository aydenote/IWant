import Header from '../(components)/header/Header';
import HomeClient from './HomeClient';
import type { JobListResponse } from '../types/apis';

const Page = () => {
  const jobList: JobListResponse[] = [
    {
      id: 334664,
      company: {
        id: 2541,
        name: '휴먼컨설팅그룹',
      },
      address: {
        location: '서울',
        district: '서초구',
      },
      position: 'Product Engineer (신입 가능)',

      annual_from: 0,
      annual_to: 35,
      skill_tags: [],
      employment_type: 'regular',
      title_img: {
        origin:
          'https://static.wanted.co.kr/images/company/2541/pcfxsoyjb69jhbdz__1080_790.jpg',
        thumb:
          'https://static.wanted.co.kr/images/company/2541/pcfxsoyjb69jhbdz__400_400.jpg',
      },
    },
  ];

  return (
    <main>
      <Header />
      <HomeClient initialJobList={jobList} />
    </main>
  );
};

export default Page;
