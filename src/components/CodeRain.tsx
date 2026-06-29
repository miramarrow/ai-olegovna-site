import { useEffect, useState } from "react";

type CodeRainIntensity = "home" | "subtle";

interface CodeRainProps {
  intensity?: CodeRainIntensity;
}

interface CodeParticle {
  id: number;
  char: string;
  left: number;
  duration: number;
  delay: number;
  sizeClass: string;
  opacityClass: string;
  animationClass: string;
}

const homeCodeChars = [
  "{", "}", "[", "]", "(", ")", "<", ">", "/", "\\",
  "const", "let", "=>", "===", "function", "return",
  "if", "else", "for", "while", "class", "import",
  "AI", "MAX", "API", "CRM", "GPT", "LLM", "RAG", "n8n",
  "agent", "prompt", "vector", "webhook",
];

const subtleCodeChars = [
  "{", "}", "[", "]", "(", ")", "<", ">", "/", "\\",
  "const", "=>", "return", "if", "import", "agent", "prompt",
];

const homeSizeClasses = ["text-xs", "text-sm", "text-base", "text-lg"];
const subtleSizeClasses = ["text-xs", "text-sm"];
const homeOpacityClasses = ["opacity-25", "opacity-35", "opacity-45", "opacity-55"];
const subtleOpacityClasses = ["opacity-10", "opacity-20"];

const CodeRain = ({ intensity = "subtle" }: CodeRainProps) => {
  const [particles, setParticles] = useState<CodeParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: CodeParticle[] = [];
      const particleCount = intensity === "home" ? 64 : 24;
      const codeChars = intensity === "home" ? homeCodeChars : subtleCodeChars;
      const sizeClasses = intensity === "home" ? homeSizeClasses : subtleSizeClasses;
      const opacityClasses = intensity === "home" ? homeOpacityClasses : subtleOpacityClasses;
      const animationClass = intensity === "home" ? "animate-code-fall-muted md:animate-code-fall" : "animate-code-fall-subtle";

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          char: codeChars[Math.floor(Math.random() * codeChars.length)],
          left: 2 + Math.random() * 96,
          duration: 8 + Math.random() * 7,
          delay: Math.random() * 6,
          sizeClass: sizeClasses[Math.floor(Math.random() * sizeClasses.length)],
          opacityClass: opacityClasses[Math.floor(Math.random() * opacityClasses.length)],
          animationClass,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [intensity]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${particle.animationClass} font-mono font-medium text-primary ${particle.sizeClass} ${particle.opacityClass}`}
          style={{
            left: `${particle.left}%`,
            top: "-50px",
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.char}
        </div>
      ))}
    </div>
  );
};

export default CodeRain;
