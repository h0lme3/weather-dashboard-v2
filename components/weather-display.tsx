import { Suspense } from "react";
import Image from "next/image";
import { getWeatherData } from "@/lib/weather";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Wind, Calendar, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { WeatherForecast } from "./weather-forecast";
import { ErrorDisplay } from "./error-display";

interface WeatherDisplayProps {
  city?: string | null;
}

export async function WeatherDisplay({ city }: WeatherDisplayProps) {
  // If no city is provided, show the empty state
  if (!city) {
    return <EmptyState />;
  }

  try {
    // Fetch weather data
    const weatherData = await getWeatherData(city);

    if (!weatherData) {
      throw new Error("Failed to fetch weather data");
    }

    const { name, main, weather, wind, sys, dt } = weatherData;
    const weatherIcon = weather[0]?.icon || "01d";
    const weatherDescription = weather[0]?.description || "Clear sky";

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl md:text-3xl">
                  {name}, {sys.country}
                </CardTitle>
                <CardDescription>{formatDate(dt)}</CardDescription>
              </div>
              <Badge variant="outline" className="text-sm font-medium">
                <Calendar className="mr-1 h-3 w-3" />
                Current Weather
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-5xl font-bold">
                    {Math.round(main.temp)}°C
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 capitalize">
                    {weatherDescription}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Feels like
                    </span>
                    <span className="font-medium">
                      {Math.round(main.feels_like)}°C
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Humidity
                    </span>
                    <span className="font-medium">{main.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Wind
                    </span>
                    <span className="font-medium">
                      {Math.round(wind.speed)} m/s
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Pressure
                    </span>
                    <span className="font-medium">{main.pressure} hPa</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32">
                  <Image
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
                    alt={weatherDescription}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="text-center mt-2 capitalize font-medium">
                  {weatherDescription}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Suspense fallback={<ForecastLoadingSkeleton />}>
          <WeatherForecast city={city} />
        </Suspense>
      </div>
    );
  } catch (error: any) {
    return <ErrorDisplay error={error} />;
  }
}

function EmptyState() {
  return (
    <div className="text-center p-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
      <div className="mx-auto w-24 h-24 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center mb-4">
        <Search className="h-12 w-12 text-sky-500" />
      </div>
      <h3 className="text-xl font-medium mb-2">Search for a city</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        Enter a city name in the search box above to see the current weather
        conditions and forecast.
      </p>
    </div>
  );
}

function ForecastLoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800"
            >
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12 mb-2"></div>
              <div className="h-16 w-16 bg-slate-200 dark:bg-slate-700 rounded-full my-2"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-10 mb-1"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
