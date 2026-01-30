import { useEffect, useRef } from 'react';

export const NoiseTexture = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateNoise();
    };

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 15;    // A - very subtle
      }

      ctx.putImageData(imageData, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Animate noise slightly for premium feel
    let animationFrame: number;
    let lastTime = 0;
    const fps = 4; // Low FPS for subtle effect
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      animationFrame = requestAnimationFrame(animate);
      const delta = currentTime - lastTime;
      
      if (delta > interval) {
        lastTime = currentTime - (delta % interval);
        generateNoise();
      }
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.025] mix-blend-overlay"
      aria-hidden="true"
    />
  );
};
