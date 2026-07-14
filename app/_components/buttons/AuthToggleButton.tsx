'use client';

import UsersIcon from '../icons/UsersIcon';
import Link from 'next/link';
import BasicButton from './BasicButton';
import { useAuthMenu } from '../../_hooks/useAuthMenu';

const AuthToggleButton = () => {
  const {
    isAuthed,
    isSignedIn,
    menuList,
    messages,
    open,
    signInWithKakao,
    signOutToHome,
    toggleOpen,
  } = useAuthMenu();

  return (
    <div className="relative inline-block">
      <BasicButton
        className="cursor-pointer rounded-full border border-input bg-background p-2 shadow-sm transition hover:border-primary"
        onClick={toggleOpen}
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

            {isSignedIn ? (
              <BasicButton
                onClick={signOutToHome}
                className="cursor-pointer w-full rounded-md px-2 py-1 text-left text-red-600 hover:bg-red-50"
              >
                {messages.navigation.signOut}
              </BasicButton>
            ) : (
              <BasicButton
                onClick={signInWithKakao}
                className="cursor-pointer w-full rounded-md px-2 py-1 text-left text-primary hover:bg-primary/10"
              >
                {messages.navigation.signIn}
              </BasicButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthToggleButton;
