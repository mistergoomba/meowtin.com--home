import { useEffect, useState } from 'react';

export type ScreenCategory =
  | 'xs' // Extra small, < 640px
  | 'sm' // Small, 640–767px
  | 'md' // Medium, 768–1023px
  | 'lg' // Large, 1024–1279px
  | 'xl' // Extra Large, 1280–1535px
  | '2xl'; // 2XL, ≥ 1536px

export function useScreenCategory(): ScreenCategory {
  const [category, setCategory] = useState<ScreenCategory>('2xl');

  useEffect(() => {
    const updateCategory = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setCategory('xs');
      } else if (width < 768) {
        setCategory('sm');
      } else if (width < 1024) {
        setCategory('md');
      } else if (width < 1280) {
        setCategory('lg');
      } else if (width < 1536) {
        setCategory('xl');
      } else {
        setCategory('2xl');
      }
    };

    updateCategory();
    window.addEventListener('resize', updateCategory);
    return () => window.removeEventListener('resize', updateCategory);
  }, []);

  return category;
}
