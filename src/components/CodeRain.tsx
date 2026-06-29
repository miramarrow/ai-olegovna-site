import { useEffect, useState } from "react";

interface CodeParticle {
  id: number;
  char: string;
  left: number;
  duration: number;
  delay: number;
}

const codeChars = [
  "{", "}", "[", "]", "(", ")", "<", ">", "/", "\\",
  "const", "let", "=>", "===", "function", "return",
  "if", "else", "for", "while", "class", "import"
];

const CodeRain = () => {
  const [particles, setParticles] = useState<CodeParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: CodeParticle[] = [];
      const particleCount = 40; // Увеличили количество

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          char: codeChars[Math.floor(Math.random() * codeChars.length)],
          left: Math.random() * 100, // Процент от ширины
          duration: 8 + Math.random() * 6, // 8-14 секунд для плавности
          delay: Math.random() * 5, // Задержка до 5 секунд
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-blue-500/40 font-mono text-base animate-code-fall"
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
