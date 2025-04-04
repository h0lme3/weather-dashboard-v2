import { Suspense } from "react";
import {
  getWeatherData,
  getForecastData,
  getWeatherCondition,
} from "@/lib/weather";
import { SearchForm } from "@/components/search-form";
import { WeatherDisplay } from "@/components/weather-display";
import { WeatherForecast } from "@/components/weather-forecast";
import { WeatherBackground } from "@/components/weather-background";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import PageHeader from "@/components/page-header";

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

// Generate dynamic metadata based on the city parameter
export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const decodedCity = decodeURIComponent((await params).city);

  // Use getWeatherData with shouldThrowNotFound=false to prevent notFound() during metadata generation
  const weatherData = await getWeatherData(decodedCity, false);

  // If city doesn't exist, return not-found metadata
  if (!weatherData) {
    return {
      title: "City Not Found",
      description: `We couldn't find weather data for "${decodedCity}". Please check the spelling and try again.`,
    };
  }

  // If city exists, use the weather data for the metadata
  const temp = Math.round(weatherData.main.temp);
  const condition = weatherData.weather[0].main;

  return {
    title: `${decodedCity} Weather: ${temp}°C, ${condition}`,
    description: `Current weather conditions for ${decodedCity}: ${temp}°C, ${condition}. Get the latest forecast and weather updates.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const decodedCity = decodeURIComponent((await params).city);

  // Fetch weather data - this will throw notFound() if city doesn't exist
  const weatherData = await getWeatherData(decodedCity);

  // If we get here, the city exists
  const weatherCondition = await getWeatherCondition(weatherData);

  return (
    <WeatherBackground condition={weatherCondition}>
      <div className="max-w-3xl mx-auto space-y-8">
        <PageHeader />

        <SearchForm initialCity={decodedCity} />

        <div className="space-y-6">
          <WeatherDisplay weatherData={weatherData} />

          <Separator className="bg-white/20" />

          {/* Move the forecast data fetching inside the ForecastSection component */}
          <Suspense fallback={<ForecastLoadingSkeleton />}>
            <ForecastSection city={decodedCity} />
          </Suspense>
        </div>
      </div>
    </WeatherBackground>
  );
}

// Create a separate component to fetch forecast data
async function ForecastSection({ city }: { city: string }) {
  const forecastData = await getForecastData(city);
  return <WeatherForecast forecastData={forecastData} />;
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
