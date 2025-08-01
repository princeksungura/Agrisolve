import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Sun, Wind, Thermometer, Droplets, Eye, AlertTriangle } from "lucide-react";

const Weather = () => {
  const forecast = [
    { day: "Today", high: 28, low: 18, condition: "Partly Cloudy", rain: 20, icon: "⛅" },
    { day: "Tomorrow", high: 30, low: 19, condition: "Sunny", rain: 5, icon: "☀️" },
    { day: "Thursday", high: 26, low: 17, condition: "Light Rain", rain: 80, icon: "🌦️" },
    { day: "Friday", high: 24, low: 16, condition: "Heavy Rain", rain: 95, icon: "🌧️" },
    { day: "Saturday", high: 27, low: 18, condition: "Cloudy", rain: 40, icon: "☁️" },
    { day: "Sunday", high: 29, low: 20, condition: "Partly Cloudy", rain: 25, icon: "⛅" },
    { day: "Monday", high: 31, low: 21, condition: "Sunny", rain: 10, icon: "☀️" }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Heavy Rainfall Expected",
      message: "Expect 40-60mm of rainfall Thursday-Friday. Protect seedlings and ensure proper drainage.",
      timeframe: "Next 48 hours"
    },
    {
      type: "info", 
      title: "Planting Opportunity",
      message: "Good conditions for planting maize after Friday's rains. Soil moisture will be optimal.",
      timeframe: "This weekend"
    }
  ];

  const farmingTips = [
    {
      activity: "Land Preparation",
      recommendation: "Wait until soil dries after Friday's rain",
      urgency: "low"
    },
    {
      activity: "Planting",
      recommendation: "Excellent time for maize planting this weekend",
      urgency: "high"
    },
    {
      activity: "Spraying",
      recommendation: "Avoid spraying until Sunday due to expected rain",
      urgency: "medium"
    },
    {
      activity: "Harvesting",
      recommendation: "Complete harvesting before Thursday",
      urgency: "high"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Weather Dashboard</h1>
          <p className="text-muted-foreground">Stay informed with weather updates and farming recommendations</p>
        </div>

        {/* Current Weather */}
        <Card className="earth-shadow mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-6xl mb-2">⛅</div>
                <div className="text-3xl font-bold">28°C</div>
                <div className="text-muted-foreground">Partly Cloudy</div>
                <div className="text-sm text-muted-foreground mt-1">Kiambu County</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-medium">18°C / 28°C</div>
                    <div className="text-sm text-muted-foreground">Low / High</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">65%</div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">15 km/h</div>
                    <div className="text-sm text-muted-foreground">Wind Speed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">10 km</div>
                    <div className="text-sm text-muted-foreground">Visibility</div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <div className="text-sm font-medium text-primary mb-2">🌧️ Rain Chance</div>
                <div className="text-2xl font-bold text-primary">20%</div>
                <div className="text-sm text-muted-foreground">Today</div>
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
                  {forecast.map((day, index) => (
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