import { Composition } from "remotion";

import { HeroCodeGeneration } from "./HeroCodeGeneration";

export const RemotionRoot = () => {
  return (
    <Composition
      id="HeroCodeGeneration"
      component={HeroCodeGeneration}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
