'use client';

import { useMemo } from 'react';
import { FaInstagram, FaTiktok, FaYoutube, FaLinkedin, FaSoundcloud } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

type IconKey = 'instagram' | 'linkedin' | 'soundcloud' | 'tiktok' | 'youtube';

export default function FallingSocialRain({ eyeHovering }: { eyeHovering: boolean }) {
  // Updated: urls + labels
  const links: Record<IconKey, { url: string; label: string }> = {
    instagram: {
      url: 'https://www.instagram.com/mistergoomba',
      label: 'Follow on Instagram',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/mistergoomba/',
      label: 'Connect on LinkedIn',
    },
    soundcloud: {
      url: 'https://soundcloud.com/mistergoomba',
      label: 'Listen on SoundCloud',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@mrgoomba',
      label: 'Follow on TikTok',
    },
    youtube: {
      url: 'https://www.youtube.com/@mistergoomba',
      label: 'Subscribe on YouTube',
    },
  };

  const icons = {
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    soundcloud: FaSoundcloud,
    tiktok: FaTiktok,
    youtube: FaYoutube,
  } as const;

  const isMobile =
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false;

  type IconSeed = {
    id: number;
    leftVW: number;
    delayMs: number;
    durationSec: number;
    sizePx: number;
    brightness: number;
    iconKey: IconKey;
  };

  // 75% density
  const seeds = useMemo<IconSeed[]>(() => {
    const COUNT = isMobile ? 32 : 72;
    const keys: IconKey[] = ['instagram', 'linkedin', 'soundcloud', 'tiktok', 'youtube'];
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    return Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      leftVW: Math.random() * 100,
      delayMs: Math.floor(Math.random() * 6000),
      durationSec: 10 + Math.random() * 12,
      sizePx: 16 + Math.floor(Math.random() * 28),
      brightness: 0.7 + Math.random() * 0.6,
      iconKey: pick(keys),
    }));
  }, [isMobile]);

  // Position helper for tooltip: flip below if the icon is near the top edge
  const handleEnter: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    // If icon's top is close to the top edge, place label below
    const THRESHOLD = 44; // px
    el.setAttribute('data-tip-pos', rect.top <= THRESHOLD ? 'below' : 'above');
  };
  const handleLeave: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.currentTarget.removeAttribute('data-tip-pos');
  };

  return (
    <>
      <div
        className={[
          'absolute inset-0 z-0 overflow-hidden select-none',
          eyeHovering ? 'icons-force-red icons-paused' : '',
        ].join(' ')}
      >
        {seeds.map((s) => {
          const Icon = icons[s.iconKey];
          const { url, label } = links[s.iconKey];
          return (
            <a
              key={s.id}
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='rainItem absolute'
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={
                {
                  left: `${s.leftVW}vw`,
                  top: '-10%',
                  // per-item tunables via CSS vars
                  '--fallDur': `${s.durationSec}s`,
                  '--fallDelay': `${s.delayMs}ms`,
                  '--chromaDur': `${8 + (s.id % 7)}s`,
                  '--driftX': `${((s.id * 37) % 9) - 4}px`,
                  '--iconSize': `${s.sizePx}px`,
                  '--baseBrightness': `${s.brightness}`,
                } as React.CSSProperties
              }
            >
              {/* We animate color on iconNode so fall pause doesn't stop chroma */}
              <span className='inline-block iconNode'>
                <Icon className='dark-rainbow' />
                {/* Tooltip label (inherits currentColor from icon for bg) */}
                <span className='iconLabel'>
                  <span className='labelText'>{label}</span>
                  <FiExternalLink className='labelIcon' aria-hidden />
                </span>
              </span>
            </a>
          );
        })}
      </div>

      {/* Styles */}
      <style jsx global>{`
        /* FALL: anchor animates vertical travel */
        .rainItem {
          font-size: var(--iconSize, 24px);
          filter: brightness(var(--baseBrightness, 1));
          animation: socialFall var(--fallDur, 16s) linear var(--fallDelay, 0ms) infinite;
          will-change: transform, opacity, filter;
        }
        /* Pause only hovered item fall */
        .rainItem:hover {
          animation-play-state: paused;
        }

        /* CHROMA: color shimmer on icon itself so it continues on hover */
        .iconNode {
          animation: chromaShift var(--chromaDur, 10s) ease-in-out var(--fallDelay, 0ms) infinite
            alternate;
          will-change: color, text-shadow, filter, transform;
          position: relative; /* for tooltip positioning */
        }

        /* Hover brighten bump on icon */
        .iconNode:hover {
          filter: brightness(1.5) contrast(1.08);
          transform: translateY(-2px);
          transition: filter 120ms ease, transform 120ms ease;
        }

        /* Tooltip */
        .iconLabel {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-6px) scale(0.98);
          bottom: calc(100% + 8px); /* default: above */
          opacity: 0;
          pointer-events: none; /* don't block clicks */
          padding: 4px 8px;
          border-radius: 8px;
          background: #f00;
          color: #000; /* black text */
          white-space: nowrap;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          z-index: 30;
          transition: opacity 120ms ease, transform 120ms ease;
        }
        .labelText {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2px;
        }
        .labelIcon {
          font-size: 12px;
          color: #000; /* ensure the pop-out icon is black too */
        }

        /* Show tooltip on hover */
        .iconNode:hover .iconLabel {
          opacity: 1;
          transform: translateX(-50%) translateY(-10px) scale(1);
        }

        /* Flip tooltip below when the item is near top */
        .rainItem[data-tip-pos='below'] .iconLabel {
          bottom: auto;
          top: calc(100% + 8px);
          transform: translateX(-50%) translateY(6px) scale(0.98);
        }
        .rainItem[data-tip-pos='below'] .iconNode:hover .iconLabel {
          transform: translateX(-50%) translateY(10px) scale(1);
        }

        /* Motion path */
        @keyframes socialFall {
          0% {
            transform: translate(calc(var(--driftX, 0px) * -1), -12vh);
            opacity: 0.9;
          }
          100% {
            transform: translate(var(--driftX, 0px), 112vh);
            opacity: 0.95;
          }
        }

        /* Dark rainbow color cycle */
        @keyframes chromaShift {
          0% {
            color: #19d88f;
            text-shadow: 0 0 6px rgba(25, 216, 143, 0.25);
          }
          33% {
            color: #7a4dff;
            text-shadow: 0 0 6px rgba(122, 77, 255, 0.25);
          }
          66% {
            color: #00b2ff;
            text-shadow: 0 0 6px rgba(0, 178, 255, 0.25);
          }
          100% {
            color: #19d88f;
            text-shadow: 0 0 6px rgba(25, 216, 143, 0.25);
          }
        }

        /* Eye-hover state: force red + pause ALL animations */
        .icons-force-red .iconNode,
        .icons-force-red .iconNode * {
          color: #ef4444 !important; /* Tailwind red-500 */
          text-shadow: 0 0 8px rgba(239, 68, 68, 0.35) !important;
        }
        .icons-paused .rainItem,
        .icons-paused .iconNode {
          animation-play-state: paused !important;
        }
      `}</style>
    </>
  );
}
