"use server";

// OpenWeatherMap API base URL
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get API key from environment variable
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

// Function to fetch current weather data
export async function getWeatherData(city: string) {
  if (!API_KEY) {
    throw new Error("OpenWeatherMap API key is not configured");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`,
      { next: { revalidate: 1800 } } // Cache for 30 minutes
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found`);
      }
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      // Try to get the error message from the response
      const errorText = await response.text();
      throw new Error(
        `Weather API error: ${response.status} ${
          response.statusText
        }. ${errorText.substring(0, 100)}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Function to fetch forecast data
export async function getForecastData(city: string) {
  if (!API_KEY) {
    throw new Error("OpenWeatherMap API key is not configured");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/forecast?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`,
      { next: { revalidate: 1800 } } // Cache for 30 minutes
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded for forecast data");
        return null;
      }

      console.error(
        `Forecast API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
}
