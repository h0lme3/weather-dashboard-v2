import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
import { WeatherDisplay } from "@/components/weather-display";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home({
  searchParams,
}: {
  searchParams: { city?: string };
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
              Weather Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Search for a city to check the current weather conditions
            </p>
          </div>
          <ThemeToggle />
        </div>

        <SearchForm initialCity={searchParams.city} />

        <ErrorBoundary>
          <Suspense fallback={<WeatherLoadingSkeleton />}>
            <WeatherDisplay city={searchParams.city} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}

function WeatherLoadingSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto w-32"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
