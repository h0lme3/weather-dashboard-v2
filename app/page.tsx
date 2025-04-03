import { SearchForm } from "@/components/search-form";
import { EmptyState } from "@/components/empty-state";
import { ThemeToggle } from "@/components/theme-toggle";
import { WeatherBackground } from "@/components/weather-background";

export default function Home() {
  return (
    <WeatherBackground condition="Default">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
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

        <SearchForm />

        <EmptyState />
      </div>
    </WeatherBackground>
  );
}
