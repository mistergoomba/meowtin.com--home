'use client';

/**
 * A drop-in image slot with a tasteful placeholder.
 *
 * Leaves a clearly-marked spot for Martin to fill in final imagery: pass a real
 * `src` (e.g. "/projects/warboy.webp") to render the image, or leave it out to
 * show a labeled placeholder that matches the dark aesthetic. Either way the
 * surrounding layout is final.
 */
export default function AssetSlot({
  src,
  alt = '',
  label,
  accent = '#2dd4bf',
  className = '',
  objectPosition = 'center',
}: {
  src?: string;
  alt?: string;
  label?: string;
  accent?: string;
  className?: string;
  objectPosition?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 30% 20%, ${accent}22, transparent 60%), linear-gradient(160deg, #0a0a0c, #050506)`,
      }}
    >
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <span
          className="h-8 w-8 rounded-full border"
          style={{ borderColor: `${accent}66`, boxShadow: `0 0 24px ${accent}44` }}
        />
        {label && (
          <span className="px-4 text-[11px] uppercase tracking-[0.25em] text-white/40">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
