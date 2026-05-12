type Props = {
  variant: 'hero' | 'cover';
  day?: string;
  month?: string;
};

export default function EventOrnament({ variant, day, month }: Props) {
  if (variant === 'hero') {
    return (
      <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none" aria-hidden="true">
          <circle cx="100" cy="100" r="95" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.5" />
          <circle cx="100" cy="100" r="70" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="45" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.15" />
        </svg>
        <div className="relative w-2 h-2 rotate-45 bg-gold/70" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none" aria-hidden="true">
        <circle cx="100" cy="100" r="80" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.3" />
        <circle cx="100" cy="100" r="55" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.15" />
      </svg>
      <div className="relative z-10 text-center text-blush">
        {day && <div className="font-tenor text-5xl leading-none tracking-[0.01em]">{day}</div>}
        {month && (
          <div className="font-montserrat uppercase tracking-[0.4em] text-[10px] text-gold mt-2">
            {month}
          </div>
        )}
      </div>
    </div>
  );
}
