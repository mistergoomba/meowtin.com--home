'use client';

/**
 * A drop-in image slot.
 *
 * Pass a real `src` (e.g. "/projects/warboy.webp") to render the image. Leave it
 * out and the slot renders a LOUD RED PLACEHOLDER — deliberately impossible to
 * miss, so a missing asset can never quietly ship. Every red square on the site
 * is catalogued in MISSING-ASSETS.md. Either way the surrounding layout is final.
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

  // No src: a big red square. Impossible to overlook, easy to grep for.
  return (
    <div
      data-missing-asset={label ?? true}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#e11d1d] ${className}`}
    >
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
          Missing Image
        </span>
        {label && (
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/80">{label}</span>
        )}
      </div>
    </div>
  );
}
