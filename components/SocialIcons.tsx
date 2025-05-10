import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export default function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <a
        href='https://www.facebook.com/mistergoombaremix'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FaFacebookF className='w-6 h-6 text-gray-400 hover:text-white transition' />
      </a>
      <a href='https://www.instagram.com/mistergoomba' target='_blank' rel='noopener noreferrer'>
        <FaInstagram className='w-7 h-7 text-gray-400 hover:text-white transition' />
      </a>
      <a href='https://www.tiktok.com/@mrgoomba' target='_blank' rel='noopener noreferrer'>
        <FaTiktok className='w-6 h-6 text-gray-400 hover:text-white transition' />
      </a>
      <a href='https://www.youtube.com/@mistergoomba' target='_blank' rel='noopener noreferrer'>
        <FaYoutube className='w-7 h-7 text-gray-400 hover:text-white transition' />
      </a>
    </div>
  );
}
