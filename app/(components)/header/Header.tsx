'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { NavLinkItem } from './NavLinkItem';
import AuthToggleButton from '../buttons/AuthToggleButton';
import BriefcaseIcon from '../icons/BriefcaseIcon';

const Header = () => {
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link className="flex items-center space-x-2" href="/">
          <BriefcaseIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            IWant
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinkItem href="/">채용공고</NavLinkItem>
          <NavLinkItem href="/mypage">마이페이지</NavLinkItem>
          <NavLinkItem href="/bookmark">북마크</NavLinkItem>
        </nav>
        <div className="flex items-center space-x-3">
          <AuthToggleButton status={status} />
        </div>
      </div>
    </header>
  );
};

export default Header;
