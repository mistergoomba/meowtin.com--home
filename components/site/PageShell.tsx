import type { ReactNode } from 'react';

import SiteHeader from '@/components/home/SiteHeader';
import ContactFooter from '@/components/home/ContactFooter';

/**
 * Standard shell for every interior page: the same floating SiteHeader and
 * ContactFooter the home page uses, wrapped around a pure-black,
 * font-share-tech body. SiteHeader is absolutely positioned and transparent,
 * so pages should lead with a <PageHero> (or top padding) to clear it.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black font-share-tech text-white">
      <SiteHeader />
      {children}
      <ContactFooter />
    </div>
  );
}
