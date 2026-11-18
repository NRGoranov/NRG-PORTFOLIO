"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ANALYTICS_OBJECTION_EVENT, ANALYTICS_OBJECTION_KEY } from "@/lib/legal";

export function AudienceMeasurement() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const read = () => localStorage.getItem(ANALYTICS_OBJECTION_KEY) !== "1";
    setAllowed(read());
    const onChange = () => setAllowed(read());
    window.addEventListener(ANALYTICS_OBJECTION_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(ANALYTICS_OBJECTION_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
