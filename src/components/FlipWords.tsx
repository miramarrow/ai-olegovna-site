import { useState, useEffect } from "react";

interface FlipWordsProps {
  words: string[];
  duration?: number;
}

const FlipWords = ({ words, duration = 2000 }: FlipWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span className="inline-block relative align-middle">
      <span className="inline-flex items-center justify-center bg-foreground text-background px-8 py-3 rounded-2xl min-w-[280px] h-[4.5rem]">
        <span
          className={`inline-block transition-all duration-300 ${
            isAnimating ? "opacity-0 rotate-x-90" : "opacity-100 rotate-x-0"
          }`}
          style={{
            transform: isAnimating ? "rotateX(90deg)" : "rotateX(0deg)",
          }}
        >
          {words[currentIndex]}
        </span>
      </span>
    </span>
  );
};

export default FlipWords;
