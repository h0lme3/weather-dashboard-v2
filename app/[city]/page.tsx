import { Suspense } from "react";
import { getWeatherData, getWeatherCondition } from "@/lib/weather";
import { SearchForm } from "@/components/search-form";
import { WeatherDisplay } from "@/components/weather-display";
import { WeatherForecast } from "@/components/weather-forecast";
import { ThemeToggle } from "@/components/theme-toggle";
import { WeatherBackground } from "@/components/weather-background";
import { Separator } from "@/components/ui/separator";

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const decodedCity = decodeURIComponent((await params).city);

  // Fetch weather data
  const weatherData = await getWeatherData(decodedCity);
  const weatherCondition = await getWeatherCondition(weatherData);

  return (
    <WeatherBackground condition={weatherCondition}>
      <div className="max-w-3xl mx-auto space-y-8">
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

        <SearchForm initialCity={decodedCity} />

        <div className="space-y-6">
          <WeatherDisplay weatherData={weatherData} />

          <Separator className="bg-white/20" />

          <Suspense fallback={<ForecastLoadingSkeleton />}>
            <WeatherForecast initialCity={decodedCity} />
          </Suspense>
        </div>
      </div>
    </WeatherBackground>
  );
}

function ForecastLoadingSkeleton() {
  return (
    <div className="animate-pulse bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-2 rounded-lg bg-slate-50/80 dark:bg-slate-800/80"
          >
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12 mb-2"></div>
            <div className="h-16 w-16 bg-slate-200 dark:bg-slate-700 rounded-full my-2"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-10 mb-1"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
