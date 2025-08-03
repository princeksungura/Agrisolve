const WEATHER_API_KEY = 'a5dd5b7d87bb56108c3d62af441651c3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number; // Probability of precipitation
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
};

export const getForecast = async (lat: number, lon: number): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return response.json();
};

export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    });
  });
};

// Helper function to get weather icon based on OpenWeatherMap icon code
export const getWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds
    '03n': '☁️',
    '04d': '☁️', // broken clouds
    '04n': '☁️',
    '09d': '🌦️', // shower rain
    '09n': '🌦️',
    '10d': '🌧️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm
    '11n': '⛈️',
    '13d': '❄️', // snow
    '13n': '❄️',
    '50d': '🌫️', // mist
    '50n': '🌫️',
  };
  
  return iconMap[iconCode] || '⛅';
};

// Generate farming recommendations based on weather
export const generateFarmingTips = (weather: WeatherData, forecast: ForecastData) => {
  const tips = [];
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const rain = weather.weather[0].main.toLowerCase().includes('rain');
  
  // Check forecast for rain in next few days
  const nextDaysRain = forecast.list.slice(0, 8).some(item => item.pop > 0.6);
  
  if (rain || nextDaysRain) {
    tips.push({
      activity: "Spraying",
      recommendation: "Avoid spraying pesticides due to expected rain",
      urgency: "medium" as const
    });
    
    tips.push({
      activity: "Drainage",
      recommendation: "Check and clear drainage channels",
      urgency: "high" as const
    });
  }
  
  if (temp > 25 && humidity < 60) {
    tips.push({
      activity: "Irrigation",
      recommendation: "Consider watering crops due to hot, dry conditions",
      urgency: "high" as const
    });
  }
  
  if (temp >= 20 && temp <= 25 && !rain) {
    tips.push({
      activity: "Planting",
      recommendation: "Excellent weather conditions for planting",
      urgency: "high" as const
    });
  }
  
  if (weather.wind.speed > 15) {
    tips.push({
      activity: "Protection",
      recommendation: "Secure young plants and structures due to strong winds",
      urgency: "medium" as const
    });
  }
  
  return tips;
};