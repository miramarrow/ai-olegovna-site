import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { getVisibleCodeLines } from "./codeTypingTimeline.mjs";

const codeLines = [
  "import { createAgent } from \"@sborkai/ai\";",
  "",
  "const website = await createAgent({",
  "  brand: \"Sborkai\",",
  "  tone: \"clear, useful, human\",",
  "  palette: [\"white\", \"gray\", \"sky\", \"blue\"],",
  "});",
  "",
  "await website.launch({ channel: \"Telegram\" });",
];

const statusItems = ["design tokens", "brief router", "ai workflow", "telegram handoff"];
const previewItems = ["Telegram", "Sheets", "Vercel"];

const palette = {
  background: "#f8fbff",
  panel: "#ffffff",
  panelSoft: "#f1f6fd",
  border: "#d7e3f1",
  borderStrong: "#b7cbe4",
  text: "#172033",
  muted: "#7c889a",
  blue: "#2563eb",
  sky: "#38bdf8",
  slate: "#475569",
};

const getTokenColor = (line: string) => {
  if (line.includes("import") || line.includes("await") || line.includes("const")) {
    return palette.blue;
  }

  if (line.includes("palette") || line.includes("Telegram")) {
    return "#0ea5e9";
  }

  if (line.trim().startsWith("\"") || line.includes("\"")) {
    return "#334155";
  }

  return palette.text;
};

const seconds = (value: number, fps: number) => value * fps;

export const CodeTypingLight = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const visibleLines = getVisibleCodeLines(codeLines, frame, fps, {
    startFrame: seconds(0.8, fps),
    framesPerCharacter: 0.8,
    framesBetweenLines: seconds(0.08, fps),
  });

  const sceneIn = interpolate(frame, [0, seconds(1.1, fps)], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const windowIn = interpolate(frame, [seconds(0.15, fps), seconds(1.25, fps)], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorOpacity = Math.floor(frame / 14) % 2 === 0 ? 1 : 0.15;
  const progress = interpolate(frame, [seconds(1, fps), seconds(8, fps)], [0.08, 1], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.background, fontFamily: "Inter, Arial, sans-serif" }}>
      <AbsoluteFill
        style={{
          opacity: sceneIn,
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(56, 189, 248, 0.08) 34%, rgba(248, 251, 255, 0) 68%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(37, 99, 235, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.08) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          opacity: 0.55,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 82,
          top: 74,
          color: palette.blue,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 0,
          opacity: sceneIn,
          transform: `translateY(${interpolate(sceneIn, [0, 1], [20, 0])}px)`,
        }}
      >
        Sborkai code studio
      </div>

      <div
        style={{
          position: "absolute",
          left: 82,
          top: 120,
          color: palette.muted,
          fontSize: 21,
          opacity: sceneIn,
        }}
      >
        светлая AI-анимация набора кода
      </div>

      <div
        style={{
          position: "absolute",
          left: 76,
          top: 206,
          width: 716,
          height: 650,
          border: `1px solid ${palette.border}`,
          borderRadius: 24,
          backgroundColor: palette.panel,
          boxShadow: "0 28px 90px rgba(37, 99, 235, 0.12)",
          overflow: "hidden",
          opacity: windowIn,
          transform: `translateY(${interpolate(windowIn, [0, 1], [46, 0])}px) scale(${interpolate(
            windowIn,
            [0, 1],
            [0.97, 1],
          )})`,
        }}
      >
        <div
          style={{
            height: 66,
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingLeft: 28,
            borderBottom: `1px solid ${palette.border}`,
            backgroundColor: palette.panelSoft,
          }}
        >
          {["#93c5fd", "#60a5fa", "#2563eb"].map((color) => (
            <span
              key={color}
              style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: color }}
            />
          ))}
          <span style={{ marginLeft: 16, color: palette.muted, fontSize: 18 }}>
            automation.ts
          </span>
        </div>

        <div style={{ display: "flex", height: 584 }}>
          <div
            style={{
              width: 74,
              backgroundColor: "#f6f9fe",
              borderRight: `1px solid ${palette.border}`,
              paddingTop: 28,
              color: "#9aa8bb",
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 18,
              lineHeight: "36px",
              textAlign: "right",
              paddingRight: 18,
            }}
          >
            {codeLines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              padding: "28px 30px",
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 20,
              lineHeight: "36px",
              letterSpacing: 0,
              color: palette.text,
            }}
          >
            {codeLines.map((line, index) => {
              const visibleLine = visibleLines[index] ?? "";
              const isActiveLine = index === visibleLines.length - 1 && visibleLine.length < line.length;

              return (
                <div
                  key={`${line}-${index}`}
                  style={{
                    minHeight: 36,
                    color: getTokenColor(visibleLine || line),
                    opacity: visibleLine.length > 0 || isActiveLine ? 1 : 0.2,
                    whiteSpace: "pre",
                  }}
                >
                  {visibleLine}
                  {isActiveLine ? (
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 25,
                        marginLeft: 4,
                        transform: "translateY(5px)",
                        backgroundColor: palette.blue,
                        opacity: cursorOpacity,
                      }}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 720,
          top: 292,
          width: 282,
          border: `1px solid ${palette.border}`,
          borderRadius: 22,
          backgroundColor: "rgba(255, 255, 255, 0.86)",
          boxShadow: "0 22px 70px rgba(15, 23, 42, 0.08)",
          padding: 28,
          opacity: interpolate(frame, [seconds(1.5, fps), seconds(2.4, fps)], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ color: palette.slate, fontSize: 20, fontWeight: 700 }}>build status</div>
        <div
          style={{
            height: 13,
            marginTop: 22,
            borderRadius: 999,
            backgroundColor: "#dbeafe",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${palette.sky}, ${palette.blue})`,
            }}
          />
        </div>

        <div style={{ marginTop: 24, display: "grid", gap: 14 }}>
          {statusItems.map((item, index) => {
            const itemIn = interpolate(
              frame,
              [seconds(2 + index * 0.55, fps), seconds(2.45 + index * 0.55, fps)],
              [0, 1],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            return (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  opacity: itemIn,
                  transform: `translateX(${interpolate(itemIn, [0, 1], [18, 0])}px)`,
                  color: palette.slate,
                  fontSize: 18,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    backgroundColor: index % 2 === 0 ? palette.blue : palette.sky,
                    boxShadow: "0 0 0 6px rgba(37, 99, 235, 0.1)",
                  }}
                />
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 720,
          bottom: 132,
          width: 282,
          border: `1px solid ${palette.border}`,
          borderRadius: 22,
          backgroundColor: "#ffffff",
          boxShadow: "0 22px 70px rgba(15, 23, 42, 0.08)",
          padding: 28,
          opacity: interpolate(frame, [seconds(4.6, fps), seconds(5.6, fps)], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ color: palette.text, fontSize: 28, fontWeight: 800 }}>Sborkai</div>
        <div style={{ color: palette.muted, fontSize: 16, marginTop: 8 }}>
          заявки, боты и AI-автоматизации
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
          {previewItems.map((item, index) => (
            <span
              key={item}
              style={{
                borderRadius: 10,
                border: `1px solid ${index === 1 ? palette.blue : palette.borderStrong}`,
                color: index === 1 ? palette.blue : palette.slate,
                fontSize: 15,
                fontWeight: 700,
                padding: "9px 11px",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 88,
          bottom: 70,
          color: palette.blue,
          fontSize: 26,
          fontWeight: 700,
          opacity: interpolate(frame, [seconds(8.2, fps), seconds(9, fps)], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ready to launch
      </div>
    </AbsoluteFill>
  );
};
