import { useState } from "react";
import HeroAbstractVisual from "./HeroAbstractVisual";

const heroVideoSrc = "/media/hero-code-generation.mp4";

const HeroCodeVideo = () => {
  const [hasVideoError, setHasVideoError] = useState(false);

  if (hasVideoError) {
    return <HeroAbstractVisual />;
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-lg border border-primary/15 bg-white shadow-sm">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onError={() => setHasVideoError(true)}
      >
        <source src={heroVideoSrc} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 border border-white/55" aria-hidden="true" />
    </div>
  );
};

export default HeroCodeVideo;
