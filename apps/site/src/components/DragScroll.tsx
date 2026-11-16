"use client";

import { useEffect, useRef } from "react";

/**
 * A horizontal row you can grab and drag with the mouse (touch already swipes natively).
 * No arrow buttons, and dragging never selects the text inside the cards.
 * On release it lets scroll-snap settle the nearest card again.
 */
export function DragScroll({ className = "", children, cursor }: { className?: string; children: React.ReactNode; cursor?: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let down = false;
    let moved = false;
    let x0 = 0;
    let s0 = 0;
    const start = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      x0 = e.clientX;
      s0 = el.scrollLeft;
      e.preventDefault(); // no text selection or native image drag
    };
    const move = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        el.style.scrollSnapType = "none";
        el.style.cursor = "grabbing";
      }
      if (moved) el.scrollLeft = s0 - dx;
    };
    const end = () => {
      if (!down) return;
      down = false;
      el.style.cursor = "";
      // re-enable snapping after the drag so the row settles on a card
      el.style.scrollSnapType = "";
    };
    // a drag should not count as a click on whatever is under the mouse
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", start);
    el.addEventListener("click", click, true);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    return () => {
      el.removeEventListener("pointerdown", start);
      el.removeEventListener("click", click, true);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
    };
  }, []);

  return (
    <ul ref={ref} data-cursor={cursor} className={`cursor-grab select-none ${className}`}>
      {children}
    </ul>
  );
}
