"use client";

import { useEffect, useState } from "react";
import { BasicLanding } from "./BasicLanding";
import { applySheet, loadSheet } from "./sheet";
import type { BasicConfig } from "./types";

/**
 * BasicLanding for a shop on the Google Sheet add-on.
 * The page first shows the config (also what search engines see), then swaps in the shop's sheet content once it loads.
 */
export function LiveLanding({ c, displayFont }: { c: BasicConfig; displayFont?: string }) {
  const [live, setLive] = useState(c);
  useEffect(() => {
    if (!c.sheet) return;
    let alive = true;
    loadSheet(c.sheet, c.sheetPlan)
      .then((data) => {
        if (alive) setLive(applySheet(c, data));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [c]);
  return <BasicLanding c={live} displayFont={displayFont} />;
}
