import assert from "node:assert/strict";
import test from "node:test";

import { getVisibleCodeLines } from "../src/remotion/codeTypingTimeline.mjs";

const lines = ["const build = await start();", "return build.status;"];

test("shows no code before the typing delay starts", () => {
  const visible = getVisibleCodeLines(lines, 10, 30, {
    startFrame: 18,
    framesPerCharacter: 2,
    framesBetweenLines: 6,
  });

  assert.deepEqual(visible, [""]);
});

test("types the first line character by character", () => {
  const visible = getVisibleCodeLines(lines, 28, 30, {
    startFrame: 18,
    framesPerCharacter: 2,
    framesBetweenLines: 6,
  });

  assert.deepEqual(visible, ["const"]);
});

test("holds a completed line before starting the next one", () => {
  const firstLineDoneFrame = 18 + lines[0].length * 2;
  const visible = getVisibleCodeLines(lines, firstLineDoneFrame + 3, 30, {
    startFrame: 18,
    framesPerCharacter: 2,
    framesBetweenLines: 6,
  });

  assert.deepEqual(visible, [lines[0], ""]);
});

test("keeps all lines visible after typing completes", () => {
  const visible = getVisibleCodeLines(lines, 160, 30, {
    startFrame: 18,
    framesPerCharacter: 2,
    framesBetweenLines: 6,
  });

  assert.deepEqual(visible, lines);
});
