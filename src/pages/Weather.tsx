import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Wind, Thermometer, Droplets, Eye, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  getCurrentWeather, 
  getForecast, 
  getCurrentLocation, 
  getWeatherIcon, 
  generateFarmingTips,
  type WeatherData,
  type ForecastData 
} from "@/services/weather";

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const position = await getCurrentLocation();
        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeather(position.coords.latitude, position.coords.longitude),
          getForecast(position.coords.latitude, position.coords.longitude)
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Unable to fetch weather data. Please check location permissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const farmingTips = weather && forecast ? generateFarmingTips(weather, forecast) : [];

  // Process forecast data for daily view
  const dailyForecast = forecast ? forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const existing = acc.find(f => f.day === day);
    
    if (!existing) {
      acc.push({
        day: day === new Date().toLocaleDateString('en-US', { weekday: 'long' }) ? 'Today' : day,
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        condition: item.weather[0].description,
        rain: Math.round(item.pop * 100),
        icon: getWeatherIcon(item.weather[0].icon)
      });
    } else {
      existing.high = Math.max(existing.high, Math.round(item.main.temp_max));
      existing.low = Math.min(existing.low, Math.round(item.main.temp_min));
    }
    return acc;
  }, [] as Array<{day: string, high: number, low: number, condition: string, rain: number, icon: string}>) : [];

  // Generate weather alerts based on real data
  const generateAlerts = () => {
    if (!weather || !forecast) return [];
    
    const alerts = [];
    const nextDayItems = forecast.list.slice(0, 8); // Next 24 hours
    const heavyRain = nextDayItems.some(item => item.pop > 0.8);
    const strongWind = weather.wind.speed > 20;
    
    if (heavyRain) {
      alerts.push({
        type: "warning",
        title: "Heavy Rainfall Expected",
        message: "High probability of heavy rainfall in the next 24 hours. Protect seedlings and ensure proper drainage.",
        timeframe: "Next 24 hours"
      });
    }
    
    if (strongWind) {
      alerts.push({
        type: "warning",
        title: "Strong Winds",
        message: "High wind speeds detected. Secure young plants and farming equipment.",
        timeframe: "Current conditions"
      });
    }
    
    if (weather.main.temp > 30) {
      alerts.push({
        type: "info",
        title: "Hot Weather",
        message: "High temperatures expected. Consider early morning or evening farming activities.",
        timeframe: "Today"
      });
    }
    
    return alerts;
  };

  const alerts = generateAlerts();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mr-3" />
            <span className="text-lg">Loading weather data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Weather Dashboard</h1>
          <p className="text-muted-foreground">Live weather updates and farming recommendations for {weather.name}</p>
        </div>

        {/* Current Weather */}
        <Card className="earth-shadow mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-6xl mb-2">{getWeatherIcon(weather.weather[0].icon)}</div>
                <div className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</div>
                <div className="text-muted-foreground capitalize">{weather.weather[0].description}</div>
                <div className="text-sm text-muted-foreground mt-1">{weather.name}, {weather.sys.country}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-medium">{Math.round(weather.main.temp_min)}°C / {Math.round(weather.main.temp_max)}°C</div>
                    <div className="text-sm text-muted-foreground">Low / High</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">{weather.main.humidity}%</div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                    <div className="text-sm text-muted-foreground">Wind Speed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{Math.round(weather.visibility / 1000)} km</div>
                    <div className="text-sm text-muted-foreground">Visibility</div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <div className="text-sm font-medium text-primary mb-2">☁️ Cloud Cover</div>
                <div className="text-2xl font-bold text-primary">{weather.clouds.all}%</div>
                <div className="text-sm text-muted-foreground">Current</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 7-Day Forecast */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-primary" />
                  7-Day Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyForecast.slice(0, 7).map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{day.icon}</div>
                        <div>
                          <div className="font-medium">{day.day}</div>
                          <div className="text-sm text-muted-foreground">{day.condition}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-medium">{day.high}° / {day.low}°</div>
                          <div className="text-sm text-primary">{day.rain}% rain</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Farming Recommendations */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌾 Farming Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {farmingTips.map((tip, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex-1">
                        <div className="font-medium">{tip.activity}</div>
                        <div className="text-sm text-muted-foreground">{tip.recommendation}</div>
                      </div>
                      <Badge variant={
                        tip.urgency === "high" ? "destructive" : 
                        tip.urgency === "medium" ? "default" : "secondary"
                      }>
                        {tip.urgency === "high" ? "Urgent" : 
                         tip.urgency === "medium" ? "Soon" : "Low Priority"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Alerts */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  Weather Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === "warning" ? "border-l-accent bg-accent/10" : "border-l-primary bg-primary/10"
                  }`}>
                    <div className="font-medium text-sm mb-1">{alert.title}</div>
                    <div className="text-sm text-muted-foreground mb-2">{alert.message}</div>
                    <div className="text-xs text-muted-foreground">{alert.timeframe}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Rainfall Data */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="text-lg">💧 This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">156mm</div>
                  <div className="text-sm text-muted-foreground">Total Rainfall</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Last 7 days</span>
                    <span className="font-medium">45mm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Expected next 7 days</span>
                    <span className="font-medium">78mm</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="text-lg">💡 Weather Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="font-medium text-primary mb-1">Rainy Season Prep</div>
                    <div className="text-muted-foreground">
                      Ensure proper drainage in your fields before heavy rains arrive.
                    </div>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <div className="font-medium text-accent mb-1">Sunny Days</div>
                    <div className="text-muted-foreground">
                      Perfect time for drying harvested crops and land preparation.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;