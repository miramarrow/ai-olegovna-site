const defaultTimelineOptions = {
  startFrame: 18,
  framesPerCharacter: 2,
  framesBetweenLines: 8,
};

const normalizeOptions = (options = {}) => ({
  ...defaultTimelineOptions,
  ...options,
});

export const getVisibleCodeLines = (lines, frame, fps, options = {}) => {
  void fps;

  const { startFrame, framesPerCharacter, framesBetweenLines } = normalizeOptions(options);
  const visibleLines = [];
  let lineStartFrame = startFrame;

  for (const line of lines) {
    const lineEndFrame = lineStartFrame + line.length * framesPerCharacter;

    if (frame < lineStartFrame) {
      visibleLines.push("");
      break;
    }

    if (frame < lineEndFrame) {
      const visibleCharacterCount = Math.max(
        0,
        Math.min(line.length, Math.floor((frame - lineStartFrame) / framesPerCharacter)),
      );

      visibleLines.push(line.slice(0, visibleCharacterCount));
      break;
    }

    visibleLines.push(line);
    lineStartFrame = lineEndFrame + framesBetweenLines;
  }

  return visibleLines.length > 0 ? visibleLines : [""];
};
