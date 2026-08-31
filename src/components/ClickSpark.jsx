import { useRef, useCallback } from "react";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  extraScale = 1.0,
  children,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const rafRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = performance.now();
    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = now - spark.startTime;
      if (elapsed >= duration) return false;
      const progress = elapsed / duration;
      const eased = easeOut(progress);
      const opacity = 1 - eased;
      const scale = eased * extraScale;
      const distance = scale * sparkRadius;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      const x = spark.x + Math.cos(spark.angle) * distance;
      const y = spark.y + Math.sin(spark.angle) * distance;
      const endX =
        spark.x +
        Math.cos(spark.angle) * (distance + sparkSize * (1 - progress));
      const endY =
        spark.y +
        Math.sin(spark.angle) * (distance + sparkSize * (1 - progress));

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.restore();
      return true;
    });

    if (sparksRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [sparkColor, sparkSize, sparkRadius, duration, extraScale]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();

      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x,
          y,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
        });
      }

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    },
    [sparkCount, draw]
  );

  const initCanvas = useCallback((node) => {
    if (!node) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      canvas.width = node.offsetWidth;
      canvas.height = node.offsetHeight;
    });
    ro.observe(node);
    canvas.width = node.offsetWidth;
    canvas.height = node.offsetHeight;
  }, []);

  return (
    <div
      ref={initCanvas}
      onClick={handleClick}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
