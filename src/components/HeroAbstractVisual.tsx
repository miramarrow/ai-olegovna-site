const rails = [
  "left-[10%] top-[18%] h-[1px] w-[58%] rotate-[-18deg]",
  "right-[7%] top-[39%] h-[1px] w-[72%] rotate-[11deg]",
  "bottom-[23%] left-[18%] h-[1px] w-[64%] rotate-[-7deg]",
];

const HeroAbstractVisual = () => {
  return (
    <div className="hero-abstract relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-lg border border-primary/15 bg-white/80 shadow-sm" />
      <div className="hero-abstract-grid absolute inset-4 rounded-md border border-border/80" />

      <div className="hero-abstract-drift absolute left-[18%] top-[14%] h-[42%] w-[42%] border border-primary/45" />
      <div className="hero-abstract-drift-reverse absolute bottom-[11%] right-[12%] h-[48%] w-[34%] border border-foreground/20" />
      <div className="hero-abstract-turn absolute left-[31%] top-[28%] h-[45%] w-[45%] rounded-full border border-primary/30" />

      {rails.map((rail) => (
        <span key={rail} className={`hero-abstract-rail absolute origin-center bg-foreground/25 ${rail}`} />
      ))}

      <span className="hero-abstract-scan absolute left-[20%] top-[12%] h-[76%] w-[10%] border-x border-primary/25" />
      <span className="absolute bottom-[17%] left-[12%] h-5 w-[48%] border-y border-primary/25" />
      <span className="absolute right-[16%] top-[13%] h-[44%] w-5 border-x border-foreground/20" />

      <div className="absolute inset-x-[18%] bottom-[14%] grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="h-1 rounded-sm bg-primary/45" style={{ opacity: 0.22 + index * 0.11 }} />
        ))}
      </div>
    </div>
  );
};

export default HeroAbstractVisual;
