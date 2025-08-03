import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Thermometer, Droplets, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentWeather, getCurrentLocation, getWeatherIcon, type WeatherData } from "@/services/weather";

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await getCurrentLocation();
        const weatherData = await getCurrentWeather(
          position.coords.latitude,
          position.coords.longitude
        );
        setWeather(weatherData);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Unable to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <Card className="earth-shadow">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Loading weather...</span>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="earth-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CloudRain className="w-5 h-5 text-primary" />
            Today's Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            {error || 'Weather data unavailable'}
          </p>
        </CardContent>
      </Card>
    );
  }

  const generateFarmingTip = (weather: WeatherData) => {
    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const isRainy = weather.weather[0].main.toLowerCase().includes('rain');
    
    if (isRainy) {
      return "Rainy weather - perfect for checking drainage and avoiding field work.";
    } else if (temp > 25 && humidity < 60) {
      return "Hot and dry conditions - consider irrigating crops and working early morning.";
    } else if (temp >= 20 && temp <= 25) {
      return "Ideal weather for most farming activities including planting and weeding.";
    } else {
      return "Monitor weather conditions and adjust farming activities accordingly.";
    }
  };

  return (
    <Card className="earth-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CloudRain className="w-5 h-5 text-primary" />
          Today's Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{getWeatherIcon(weather.weather[0].icon)}</div>
            <div>
              <p className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</p>
              <p className="text-sm text-muted-foreground capitalize">
                {weather.weather[0].description}
              </p>
              <p className="text-xs text-muted-foreground">{weather.name}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {Math.round(weather.main.temp_min)}°C / {Math.round(weather.main.temp_max)}°C
              </p>
              <p className="text-xs text-muted-foreground">Low / High</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-medium">{weather.main.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-3">
          <p className="text-sm font-medium text-primary">💡 Farming Tip</p>
          <p className="text-sm text-muted-foreground mt-1">
            {generateFarmingTip(weather)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;