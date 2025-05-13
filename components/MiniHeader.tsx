'use client';

import SocialIcons from './SocialIcons';

export default function MiniHeader() {
  return (
    <header className='flex items-center justify-between px-4 py-2 bg-transparent h-auto'>
      <a href='/' className='flex items-center'>
        <img
          src='/logo.png'
          alt='Meowtin Logo'
          className='h-12 w-auto object-contain drop-shadow-sm'
        />
      </a>
      <SocialIcons className='flex space-x-4' />
    </header>
  );
}
