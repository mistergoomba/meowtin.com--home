'use client';
import { Code, Smartphone, Server, Database, Gamepad2 } from 'lucide-react';

const ICONS = [
  { Icon: Code, label: 'React' },
  { Icon: Smartphone, label: 'React Native' },
  { Icon: Server, label: 'Node.js' },
  { Icon: Database, label: 'Full Stack' },
  { Icon: Gamepad2, label: 'Game Dev' },
];

export default function IntroSection() {
  const contentWidth = 'w-[90vw] md:w-[50vw] max-w-[600px]';

  return (
    <section className='h-screen w-full flex flex-col justify-center items-center pointer-events-auto'>
      <a href='/'>
        <img src='/logo.png' alt='Meowtin Logo' className={`${contentWidth} mb-6`} />
      </a>

      <div className={`flex flex-wrap justify-center md:justify-between ${contentWidth}`}>
        {ICONS.map(({ Icon, label }) => (
          <div
            key={label}
            className='flex flex-col items-center justify-center text-center w-1/3 md:w-1/5'
          >
            <Icon className='w-12 h-12 text-[#b38bfc] mb-2' />
            <span className='text-white text-sm'>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
