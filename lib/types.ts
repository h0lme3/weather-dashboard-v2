// Basic weather information
export interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

// Weather condition details
export interface WeatherConditionDetails {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Wind information
export interface WindInfo {
  speed: number;
}

// System information (country, etc.)
export interface SystemInfo {
  country: string;
}

// City information
export interface CityInfo {
  name: string;
  country: string;
}

// Weather data response
export interface WeatherDataResponse {
  name: string;
  main: WeatherMain;
  weather: WeatherConditionDetails[];
  wind: WindInfo;
  sys: SystemInfo;
  dt: number;
}

// Forecast item (single time period)
export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: WeatherMain;
  weather: WeatherConditionDetails[];
  wind: WindInfo;
}

// Forecast data response
export interface ForecastDataResponse {
  list: ForecastItem[];
  city: CityInfo;
}

// Weather condition types
export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Fog"
  | "Haze"
  | "Dust"
  | "Smoke"
  | "Default";
