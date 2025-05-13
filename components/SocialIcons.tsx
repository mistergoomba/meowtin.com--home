import { FaInstagram, FaTiktok, FaYoutube, FaLinkedin, FaSoundcloud } from 'react-icons/fa';

export default function SocialIcons({
  className = '',
  size = 'small',
}: {
  className?: string;
  size?: 'small' | 'big';
}) {
  const sm = `${
    size === 'small' ? 'w-6 h-6' : 'w-12 h-12'
  } text-gray-400 hover:text-white transition`;
  const big = `${
    size === 'small' ? 'w-7 h-7' : 'w-14 h-14'
  } text-gray-400 hover:text-white transition`;

  return (
    <div className={className}>
      <a href='https://www.instagram.com/mistergoomba' target='_blank' rel='noopener noreferrer'>
        <FaInstagram className={big} />
      </a>
      <a href='https://www.linkedin.com/in/mistergoomba/' target='_blank' rel='noopener noreferrer'>
        <FaLinkedin className={sm} />
      </a>
      <a href='https://soundcloud.com/mistergoomba' target='_blank' rel='noopener noreferrer'>
        <FaSoundcloud className={big} />
      </a>
      <a href='https://www.tiktok.com/@mrgoomba' target='_blank' rel='noopener noreferrer'>
        <FaTiktok className={sm} />
      </a>
      <a href='https://www.youtube.com/@mistergoomba' target='_blank' rel='noopener noreferrer'>
        <FaYoutube className={big} />
      </a>
    </div>
  );
}
