import { motion } from 'framer-motion';

export default function Chevron() {
  return (
    <motion.div className='fixed bottom-0 left-0 right-0 z-50 flex justify-center'>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4], y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className='pb-[5px]'
      >
        <svg
          width='24'
          height='14'
          viewBox='0 0 24 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 2L12 12L22 2'
            stroke='white'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
