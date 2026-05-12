type Props = {
  variant: 'hero' | 'cover';
  day?: string;
  month?: string;
};

export default function EventOrnament({ variant, day, month }: Props) {
  if (variant === 'hero') {
    return (
      <div className="relative w-40 h-40 mx-auto">
        <div className="absolute inset-0 border border-gold/50 rounded-full" />
        <div className="absolute inset-[18px] border border-gold/30 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center font-greatvibes text-gold/85 text-6xl">
          I
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute inset-4 border border-gold/35 rounded-lg" />
      <div className="absolute inset-6 border border-gold/20 rounded-md" />
      <div className="relative z-10 text-center text-white">
        {day && <div className="font-cormorant text-4xl font-semibold leading-none">{day}</div>}
        {month && (
          <div className="font-montserrat uppercase tracking-[0.4em] text-[9px] text-gold mt-1">
            {month}
          </div>
        )}
      </div>
    </div>
  );
}
