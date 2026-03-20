'use client';

import { useState } from 'react';
import { SiPaypal, SiCashapp, SiZelle } from 'react-icons/si';

function VenmoV({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='white'>
      <path d='M19.27 3c.76 1.25 1.1 2.54 1.1 4.17 0 5.19-4.43 11.93-8.03 16.66H5.23L2.63 4.14l6.13-.58 1.4 11.25c1.3-2.12 2.9-5.45 2.9-7.73 0-1.54-.26-2.6-.68-3.47L19.27 3z' />
    </svg>
  );
}

const payments = [
  {
    name: 'Venmo',
    handle: '@mistergoomba',
    href: 'https://venmo.com/mistergoomba',
    color: '#3D95CE',
    icon: VenmoV,
  },
  {
    name: 'PayPal',
    handle: '@mistergoomba',
    href: 'https://paypal.me/mistergoomba',
    color: '#003087',
    icon: SiPaypal,
  },
  {
    name: 'Cash App',
    handle: '$mistergoomba',
    href: 'https://cash.app/$mistergoomba',
    color: '#00D632',
    icon: SiCashapp,
  },
];

export default function QrPage() {
  const [copied, setCopied] = useState(false);

  const handleZelleCopy = async () => {
    try {
      await navigator.clipboard.writeText('mistergoomba@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = 'mistergoomba@gmail.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className='min-h-screen bg-gradient-to-b from-[#0e001a] via-purple-950 to-purple-900 text-white flex flex-col items-center px-4 pt-8'>
      <img
        src='/qr-header.png'
        alt='Tip Meowtin'
        className='w-[95%] max-w-sm h-auto object-contain mb-8 drop-shadow-lg'
      />

      <div className='grid grid-cols-2 gap-4 w-full max-w-sm'>
        {payments.map(({ name, handle, href, color, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='flex flex-col items-center justify-center aspect-square rounded-2xl shadow-lg active:scale-95 transition-transform duration-150 p-4'
            style={{ backgroundColor: color }}
          >
            <Icon size={48} color='white' />
            <span className='mt-3 text-lg font-bold'>{name}</span>
            <span className='text-sm opacity-80'>{handle}</span>
          </a>
        ))}

        <button
          onClick={handleZelleCopy}
          className='flex flex-col items-center justify-center aspect-square rounded-2xl shadow-lg active:scale-95 transition-transform duration-150 p-4 cursor-pointer'
          style={{ backgroundColor: '#6D1ED4' }}
        >
          <SiZelle size={48} color='white' />
          <span className='mt-3 text-lg font-bold'>Zelle</span>
          <span className='text-sm opacity-80'>
            {copied ? 'Copied!' : 'mistergoomba@gmail.com'}
          </span>
        </button>
      </div>
    </main>
  );
}
