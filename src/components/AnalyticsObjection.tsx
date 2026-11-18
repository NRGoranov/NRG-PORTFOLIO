"use client";

import { useEffect, useState } from "react";
import { ANALYTICS_OBJECTION_EVENT, ANALYTICS_OBJECTION_KEY } from "@/lib/legal";

export function AnalyticsObjection() {
  const [objected, setObjected] = useState(false);

  useEffect(() => {
    setObjected(localStorage.getItem(ANALYTICS_OBJECTION_KEY) === "1");
  }, []);

  const setObjection = (on: boolean) => {
    if (on) localStorage.setItem(ANALYTICS_OBJECTION_KEY, "1");
    else localStorage.removeItem(ANALYTICS_OBJECTION_KEY);
    setObjected(on);
    window.dispatchEvent(new Event(ANALYTICS_OBJECTION_EVENT));
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => setObjection(!objected)}
        className="rounded-md border border-white/15 px-3 py-2 text-sm text-foreground hover:bg-white/5"
      >
        {objected ? "Allow audience measurement again" : "Object on this browser"}
      </button>
      <p className="text-sm text-muted-foreground">
        {objected
          ? "Audience measurement is off in this browser."
          : "Audience measurement is on in this browser."}
      </p>
    </div>
  );
}
