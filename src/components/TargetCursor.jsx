import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

const TargetCursor = ({
  targetSelector = 'a, button, [role="button"], input:not([type="hidden"]), textarea, select, summary, label[for], .cursor-target, [data-cursor-target]',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = "#ffffff",
  cursorColorOnTarget,
}) => {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const cornersRef = useRef([]);
  const posRef = useRef({ x: 0, y: 0 });
  const activeTargetRef = useRef(null);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return (hasTouchScreen && isSmallScreen) || mobileUA;
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    const corners = cornersRef.current;
    if (!wrapper || !dot || corners.length !== 4) return;

    if (hideDefaultCursor) {
      document.documentElement.style.cssText += "; cursor: none !important;";
    }

    const CS = 10;   // corner size (px)
    const H = 14;    // resting half-box (px)
    const PAD = 4;   // padding around hovered element

    const color = cursorColor;
    gsap.set(dot, { background: color });
    gsap.set(corners, { borderColor: color });

    // Resting offsets: 4 brackets forming a square centered on the cursor
    const restOffsets = [
      { x: -H, y: -H },          // tl
      { x: H - CS, y: -H },      // tr
      { x: H - CS, y: H - CS },  // br
      { x: -H, y: H - CS },      // bl
    ];

    // Start centered, hidden until first move
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    posRef.current = { x: startX, y: startY };
    gsap.set(wrapper, { x: startX, y: startY, rotation: 0, opacity: 0 });
    corners.forEach((c, i) => gsap.set(c, { x: restOffsets[i].x, y: restOffsets[i].y }));

    // Spin the whole wrapper (dot + corners spin together)
    let spinTl = null;
    const buildSpin = () => {
      if (spinTl) spinTl.kill();
      gsap.set(wrapper, { rotation: 0 });
      spinTl = gsap.timeline({ repeat: -1 }).to(wrapper, {
        rotation: 360,
        duration: spinDuration,
        ease: "none",
      });
    };
    buildSpin();

    const spreadToTarget = (target) => {
      // Target removed from DOM (e.g. modal closed via its X button):
      // no mouseout fires, and getBoundingClientRect() would return zeros,
      // snapping brackets to (0,0). Bail and reset instead.
      if (!target || !target.isConnected) {
        activeTargetRef.current = null;
        resetCorners();
        return;
      }
      const rect = target.getBoundingClientRect();
      // Zero-size rect = target hidden (display:none) but not yet unmounted.
      if (rect.width === 0 && rect.height === 0) {
        activeTargetRef.current = null;
        resetCorners();
        return;
      }
      const { x: cx, y: cy } = posRef.current;
      const targetColor = cursorColorOnTarget || color;

      spinTl && spinTl.pause();
      gsap.set(wrapper, { rotation: 0 }); // align brackets to screen axes
      gsap.to(dot, { opacity: 0, duration: 0.1, overwrite: true });

      const offs = [
        { x: rect.left - PAD - cx, y: rect.top - PAD - cy },
        { x: rect.right + PAD - CS - cx, y: rect.top - PAD - cy },
        { x: rect.right + PAD - CS - cx, y: rect.bottom + PAD - CS - cy },
        { x: rect.left - PAD - cx, y: rect.bottom + PAD - CS - cy },
      ];
      corners.forEach((c, i) =>
        gsap.to(c, {
          x: offs[i].x,
          y: offs[i].y,
          borderColor: targetColor,
          duration: hoverDuration,
          ease: "power2.out",
          overwrite: true,
        })
      );
    };

    const resetCorners = () => {
      gsap.to(dot, { opacity: 1, duration: 0.1, overwrite: true });
      corners.forEach((c, i) =>
        gsap.to(c, {
          x: restOffsets[i].x,
          y: restOffsets[i].y,
          borderColor: color,
          duration: hoverDuration,
          ease: "power2.out",
          overwrite: true,
        })
      );
      buildSpin();
    };

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      gsap.set(wrapper, { opacity: 1 });
      if (parallaxOn) {
        gsap.to(wrapper, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.12,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else {
        gsap.set(wrapper, { x: e.clientX, y: e.clientY });
      }
      // Keep brackets locked to the active target while the pointer moves inside it
      if (activeTargetRef.current) spreadToTarget(activeTargetRef.current);
    };

    // Event delegation: works for all current + future clickable elements
    const onOver = (e) => {
      const t = e.target.closest && e.target.closest(targetSelector);
      if (!t) return;
      if (activeTargetRef.current === t) return;
      activeTargetRef.current = t;
      spreadToTarget(t);
    };

    const onOut = (e) => {
      const t = e.target.closest && e.target.closest(targetSelector);
      if (!t || activeTargetRef.current !== t) return;
      const related = e.relatedTarget;
      // moving to another target -> let onOver handle it (no flicker)
      if (related && related.closest && related.closest(targetSelector)) return;
      // moving to a child still inside the same target -> stay
      if (related && t.contains(related)) return;
      activeTargetRef.current = null;
      resetCorners();
    };

    // Scroll can move the target out from under a frozen bracket -> re-track
    const onScroll = () => {
      const at = activeTargetRef.current;
      if (!at) return;
      const { x, y } = posRef.current;
      const el = document.elementFromPoint(x, y);
      if (el && at.contains(el)) {
        spreadToTarget(at);
      } else {
        activeTargetRef.current = null;
        resetCorners();
      }
    };

    // Capture phase: the 3D canvas calls stopPropagation() on its own
    // bubble-phase pointermove (Island.jsx), which would kill a bubble
    // listener here. Capturing fires on the way down, before that runs,
    // and still delivers events during pointer-capture drags.
    document.addEventListener("pointermove", onMove, { capture: true, passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      document.removeEventListener("pointermove", onMove, { capture: true });
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll, { capture: true });
      spinTl && spinTl.kill();
      if (hideDefaultCursor) {
        document.documentElement.style.cursor = "";
      }
    };
  }, [isMobile, hideDefaultCursor, spinDuration, hoverDuration, parallaxOn, cursorColor, cursorColorOnTarget, targetSelector]);

  if (isMobile) return null;

  return (
    <div ref={wrapperRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" style={{ background: cursorColor }} />
      {["corner-tl", "corner-tr", "corner-br", "corner-bl"].map((cls, i) => (
        <div
          key={cls}
          ref={(el) => (cornersRef.current[i] = el)}
          className={`target-cursor-corner ${cls}`}
          style={{ borderColor: cursorColor }}
        />
      ))}
    </div>
  );
};

export default TargetCursor;
