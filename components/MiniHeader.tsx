'use client';

import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export default function MiniHeader() {
  return (
    <header className='flex items-center justify-between px-4 py-2 bg-transparent h-auto'>
      <a href='/home/' className='flex items-center'>
        <img
          src='/logo.png'
          alt='Meowtin Logo'
          className='h-12 w-auto object-contain drop-shadow-sm'
        />
      </a>
      <div className='flex space-x-4'>
        <a
          href='https://www.facebook.com/mistergoombaremix'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaFacebookF className='w-5 h-5 text-gray-400 hover:text-white transition' />
        </a>
        <a href='https://www.instagram.com/mistergoomba' target='_blank' rel='noopener noreferrer'>
          <FaInstagram className='w-5 h-5 text-gray-400 hover:text-white transition' />
        </a>
        <a href='https://www.tiktok.com/@mrgoomba' target='_blank' rel='noopener noreferrer'>
          <FaTiktok className='w-5 h-5 text-gray-400 hover:text-white transition' />
        </a>
        <a href='https://www.youtube.com/@mistergoomba' target='_blank' rel='noopener noreferrer'>
          <FaYoutube className='w-6 h-6 text-gray-400 hover:text-white transition' />
        </a>
      </div>
    </header>
  );
}
