'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import UsersIcon from '../icons/UsersIcon';
import Link from 'next/link';
import BasicButton from './BasicButton';

const AuthToggleButton = () => {
  const { status, data: session } = useSession();
  const [open, setOpen] = useState(false);

  const isAuthed = status === 'authenticated';
  const menuList = [
    { label: '채용공고', href: '/' },
    { label: '마이페이지', href: '/mypage' },
    { label: '북마크', href: '/bookmark' },
  ];

  return (
    <div className="relative inline-block">
      <BasicButton
        className="cursor-pointer rounded-full border border-input bg-background p-2 shadow-sm transition hover:border-primary"
        onClick={() => setOpen((value) => !value)}
      >
        <UsersIcon className="h-5 w-5" />
      </BasicButton>

      {open && (
        <>
          <div className="absolute -right-2 top-full h-6 w-52" />

          <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-white/90 p-3 text-sm shadow-lg">
            {menuList.map((menu) => {
              return (
                isAuthed && (
                  <Link
                    key={menu.href}
                    href={menu.href}
                    className="block rounded-md px-2 py-1 hover:bg-primary/10"
                  >
                    {menu.label}
                  </Link>
                )
              );
            })}

            {session ? (
              <BasicButton
                onClick={() => signOut({ callbackUrl: '/' })}
                className="cursor-pointer w-full rounded-md px-2 py-1 text-left text-red-600 hover:bg-red-50"
              >
                로그아웃
              </BasicButton>
            ) : (
              <BasicButton
                onClick={() => signIn('kakao')}
                className="cursor-pointer w-full rounded-md px-2 py-1 text-left text-primary hover:bg-primary/10"
              >
                로그인
              </BasicButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthToggleButton;
