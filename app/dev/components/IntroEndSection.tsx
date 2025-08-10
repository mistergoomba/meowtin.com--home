import { motion } from 'framer-motion';
import SocialIcons from '@/components/SocialIcons';
import { useIsMobile } from '@/hooks/use-mobile';

export default function IntroEndSection() {
  const isMobile = useIsMobile();
  return (
    <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center z-[60]'>
      <motion.div className='flex flex-col items-center px-4'>
        <a href='/'>
          <img
            src='/logo.png'
            alt='Meowtin Logo'
            className={`${isMobile ? 'w-[90vw]' : 'w-[50vw]'} max-w-[600px] mb-6`}
          />
        </a>
        <SocialIcons size='responsive' className='flex justify-center gap-6 flex-wrap mb-10' />
      </motion.div>
    </div>
  );
}
