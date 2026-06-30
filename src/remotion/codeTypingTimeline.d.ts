export type CodeTypingTimelineOptions = {
  startFrame?: number;
  framesPerCharacter?: number;
  framesBetweenLines?: number;
};

export declare const getVisibleCodeLines: (
  lines: string[],
  frame: number,
  fps: number,
  options?: CodeTypingTimelineOptions,
) => string[];

