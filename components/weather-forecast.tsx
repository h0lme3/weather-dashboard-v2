import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getForecastData } from "@/lib/weather";
import { formatDate } from "@/lib/utils";

export async function WeatherForecast({ city }: { city: string }) {
  const forecastData = await getForecastData(city);

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return null;
  }

  // Get one forecast per day (noon time) for the next 5 days
  const dailyForecasts = forecastData.list
    .filter((item: any) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {dailyForecasts.map((forecast: any) => (
            <div
              key={forecast.dt}
              className="flex flex-col items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800"
            >
              <div className="text-sm font-medium">
                {formatDate(forecast.dt, "short")}
              </div>
              <div className="relative w-16 h-16 my-2">
                <Image
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-bold">
                {Math.round(forecast.main.temp)}°C
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                {forecast.weather[0].description}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
