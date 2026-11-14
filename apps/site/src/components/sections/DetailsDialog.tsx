"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A button that opens a sticker-style modal (native <dialog>: focus trap and Esc for free).
 * While it is open the page stays put: the body is pinned in place with its scrollbar still
 * showing (overflow-y: scroll) so nothing jumps sideways, and only the modal's own body scrolls,
 * vertically. Links marked data-close shut the modal first, then scroll to their target.
 */
export function DetailsDialog({
  label,
  cursor,
  closeLabel,
  title,
  buttonClass,
  children,
}: {
  label: string;
  cursor: string;
  closeLabel: string;
  title: React.ReactNode;
  buttonClass: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const saved = useRef(0);
  const [open, setOpen] = useState(false);

  const lock = () => {
    const y = window.scrollY;
    saved.current = y;
    const b = document.body.style;
    b.position = "fixed";
    b.top = `-${y}px`;
    b.left = "0";
    b.right = "0";
    document.documentElement.style.overflowY = "scroll";
  };

  const unlock = useCallback(() => {
    const b = document.body.style;
    b.position = b.top = b.left = b.right = "";
    const html = document.documentElement;
    html.style.overflowY = "";
    // jump back without the page's smooth-scroll animation
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, saved.current);
    html.style.scrollBehavior = "";
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      setOpen(false);
      unlock();
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [unlock]);

  const show = () => {
    lock();
    ref.current?.showModal();
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={show} data-cursor={cursor} aria-haspopup="dialog" aria-expanded={open} className={buttonClass}>
        {label}
      </button>
      <dialog
        ref={ref}
        // click on the backdrop (the dialog element itself, outside the panel) closes it
        onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
        className="details-dialog m-auto max-h-[90dvh] w-[min(42rem,calc(100vw-1.5rem))] overflow-visible bg-transparent p-0 pb-2 pr-2 text-ink"
      >
        <div className="sticker wobbly flex max-h-[88dvh] flex-col overflow-hidden bg-paper">
          <div className="flex items-start justify-between gap-4 border-b-2 border-ink/10 px-6 pb-4 pt-6 md:px-8">
            <div className="min-w-0">{title}</div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={closeLabel}
              className="sticker-sm flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper text-lg hover:bg-rose hover:text-white"
            >
              ✕
            </button>
          </div>
          <div
            className="overflow-y-auto overflow-x-hidden overscroll-contain px-6 py-6 md:px-8"
            onClick={(e) => {
              const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-close]");
              if (!a) return;
              e.preventDefault();
              ref.current?.close();
              const id = a.getAttribute("href")?.slice(1);
              requestAnimationFrame(() => id && document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
            }}
          >
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
