import React from "react";

import { ThemeToggle } from "./theme-toggle";

export default function PageHeader() {
  return (
    <div className="flex justify-between items-center backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 rounded-lg p-4">
      <div className="text-center flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Weather Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-200">
          Search for a city to check the current weather conditions
        </p>
      </div>
      <ThemeToggle />
    </div>
  );
}
