import { FaInstagram, FaTiktok, FaYoutube, FaLinkedin, FaSoundcloud } from 'react-icons/fa';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SocialIcons({
  className = '',
  size = 'small',
}: {
  className?: string;
  size?: 'small' | 'big' | 'responsive';
}) {
  const isMobile = useIsMobile();

  const sm =
    size === 'responsive'
      ? isMobile
        ? 'w-10 h-10'
        : 'w-12 h-12'
      : size === 'small'
      ? 'w-6 h-6'
      : 'w-12 h-12';

  const big =
    size === 'responsive'
      ? isMobile
        ? 'w-12 h-12'
        : 'w-14 h-14'
      : size === 'small'
      ? 'w-7 h-7'
      : 'w-14 h-14';

  return (
    <div className={className}>
      <a href='https://www.instagram.com/mistergoomba' target='_blank' rel='noopener noreferrer'>
        <FaInstagram className={big + ' text-gray-400 hover:text-white transition'} />
      </a>
      <a href='https://www.linkedin.com/in/mistergoomba/' target='_blank' rel='noopener noreferrer'>
        <FaLinkedin className={sm + ' text-gray-400 hover:text-white transition'} />
      </a>
      <a href='https://soundcloud.com/mistergoomba' target='_blank' rel='noopener noreferrer'>
        <FaSoundcloud className={big + ' text-gray-400 hover:text-white transition'} />
      </a>
      <a href='https://www.tiktok.com/@mrgoomba' target='_blank' rel='noopener noreferrer'>
        <FaTiktok className={sm + ' text-gray-400 hover:text-white transition'} />
      </a>
      <a href='https://www.youtube.com/@mistergoomba' target='_blank' rel='noopener noreferrer'>
        <FaYoutube className={big + ' text-gray-400 hover:text-white transition'} />
      </a>
    </div>
  );
}
