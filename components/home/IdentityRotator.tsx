'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { ROLES } from './accent';

/**
 * Vertical list of roles on the right side of the hero. One is active at a time;
 * the parent auto-advances the index and also updates the accent/background.
 * Hovering or clicking a role selects it. The active role reveals a short
 * descriptive line beneath it.
 */
export default function IdentityRotator({
  active,
  onSelect,
  accent,
}: {
  active: number;
  onSelect: (index: number) => void;
  accent: string;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {ROLES.map((role, i) => {
        const isActive = i === active;
        return (
          <li key={role.id}>
            <button
              type="button"
              onMouseEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              onClick={() => onSelect(i)}
              className="group flex w-full items-center gap-3 py-1.5 text-left"
            >
              {/* active indicator bar */}
              <motion.span
                aria-hidden
                className="h-px shrink-0 rounded-full"
                animate={{
                  width: isActive ? 28 : 12,
                  backgroundColor: isActive ? accent : 'rgba(255,255,255,0.25)',
                  boxShadow: isActive ? `0 0 12px ${accent}` : '0 0 0 rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="whitespace-nowrap text-sm uppercase tracking-[0.2em] transition-colors md:text-base"
                animate={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                }}
                transition={{ duration: 0.3 }}
              >
                {role.label}
              </motion.span>
            </button>

            {/* description reveals under the active role */}
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pl-[40px] text-[13px] leading-relaxed text-white/55 md:max-w-xs"
                >
                  {role.description}
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
