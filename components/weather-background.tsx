"use client";

import type React from "react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { WeatherCondition } from "@/lib/types";

interface WeatherBackgroundProps {
  condition: WeatherCondition;
  children: React.ReactNode;
}

export function WeatherBackground({
  condition,
  children,
}: WeatherBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
        {children}
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  // Get background image based on weather condition and theme
  const getBackgroundImage = () => {
    switch (condition) {
      case "Clear":
        return isDark
          ? "/backgrounds/clear-night.jpg"
          : "/backgrounds/clear-day.jpg";
      case "Clouds":
        return isDark
          ? "/backgrounds/cloudy-night.jpg"
          : "/backgrounds/cloudy-day.jpg";
      case "Rain":
        return "/backgrounds/rain.jpg";
      case "Drizzle":
        return "/backgrounds/drizzle.jpg";
      case "Thunderstorm":
        return "/backgrounds/thunderstorm.jpg";
      case "Snow":
        return "/backgrounds/snow.jpg";
      case "Mist":
        return "/backgrounds/mist.jpg";
      case "Fog":
        return "/backgrounds/fog.jpg";
      case "Haze":
      default:
        return isDark
          ? "/backgrounds/default-night.jpg"
          : "/backgrounds/default-day.jpg";
    }
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8 transition-all duration-1000 ease-in-out bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundBlendMode: isDark ? "overlay" : "normal",
        backgroundColor: isDark
          ? "rgba(15, 23, 42, 0.7)"
          : "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
