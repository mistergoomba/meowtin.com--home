import { ReactNode } from 'react';

import ElectricityBorder from './ElectricityBorder';

interface HomePageCardProps {
  onClick: () => void;
  hoverShadowColor: string;
  animateCards: Array<boolean>;
  cardId: number;
  laserColor: string;
  children: ReactNode;
}

export default function HomePageCard({
  onClick,
  hoverShadowColor,
  animateCards,
  cardId,
  laserColor,
  children,
}: HomePageCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-black/80 border border-gray-700 backdrop-blur-sm shadow-lg 
    flex flex-col transform transition-all duration-1000 ease-out ${hoverShadowColor}
    hover:scale-[1.02] hover:z-10 perspective-[1000px] hover:rotate-y-2 hover:rotate-x-2
    cursor-pointer md:h-auto md:flex-1 md:aspect-auto aspect-square
    ${animateCards[cardId] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      {/* The ElectricityBorder component with very high z-index */}
      <div className='absolute inset-0 overflow-visible' style={{ zIndex: 20 }}>
        <ElectricityBorder cardId={cardId} borderColor={laserColor} />
      </div>

      {children}
    </div>
  );
}
