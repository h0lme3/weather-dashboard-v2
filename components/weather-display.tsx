import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Wind, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { WeatherData } from "@/lib/types";

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  const { name, main, weather, wind, sys, dt } = weatherData;
  const weatherIcon = weather[0]?.icon || "01d";
  const weatherDescription = weather[0]?.description || "Clear sky";

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80">
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
              <div className="text-center mt-2 capitalize font-medium">
                {weatherDescription}
              </div>
              <Image
                src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
                alt={weatherDescription}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
