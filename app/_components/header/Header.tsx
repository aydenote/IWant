'use client';

import Link from 'next/link';
import AuthToggleButton from '../buttons/AuthToggleButton';
import BriefcaseIcon from '../icons/BriefcaseIcon';

const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link className="flex items-center space-x-2" href="/">
          <BriefcaseIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            IWant
          </span>
        </Link>

        <div className="flex items-center space-x-3">
          <AuthToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
