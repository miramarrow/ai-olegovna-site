import { useEffect, useRef } from "react";

export const BackgroundGradientAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.003;

      const width = canvas.width;
      const height = canvas.height;

      // Create gradient with smooth transitions
      const gradient = ctx.createLinearGradient(
        width / 2 + Math.sin(time) * width * 0.3,
        height / 2 + Math.cos(time * 0.7) * height * 0.3,
        width / 2 + Math.sin(time * 1.2) * width * 0.3,
        height / 2 + Math.cos(time * 0.9) * height * 0.3
      );

      // Dark gradient colors for silk-like effect
      gradient.addColorStop(0, `hsl(0, 0%, ${3 + Math.sin(time) * 2}%)`);
      gradient.addColorStop(0.3, `hsl(0, 0%, ${5 + Math.sin(time * 1.3) * 2}%)`);
      gradient.addColorStop(0.6, `hsl(0, 0%, ${7 + Math.sin(time * 0.8) * 2}%)`);
      gradient.addColorStop(1, `hsl(0, 0%, ${4 + Math.sin(time * 1.5) * 2}%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: "blur(80px)" }}
    />
  );
};
