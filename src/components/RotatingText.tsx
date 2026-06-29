import { useState, useEffect, type ComponentProps } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MotionSpanProps = ComponentProps<typeof motion.span>;

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: "first" | "last";
  initial?: MotionSpanProps["initial"];
  animate?: MotionSpanProps["animate"];
  exit?: MotionSpanProps["exit"];
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: MotionSpanProps["transition"];
  rotationInterval?: number;
}

export default function RotatingText({
  texts,
  mainClassName = "",
  staggerFrom = "first",
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  staggerDuration = 0.025,
  splitLevelClassName = "",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2000,
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[currentIndex];
  const letters = currentText.split("");

  return (
    <div className={`inline-flex ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="inline-flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={`${currentIndex}-${index}`}
              className={splitLevelClassName}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{
                ...transition,
                delay:
                  staggerFrom === "first"
                    ? index * staggerDuration
                    : (letters.length - 1 - index) * staggerDuration,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
