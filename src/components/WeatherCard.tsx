import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Thermometer, Droplets } from "lucide-react";

const WeatherCard = () => {
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
          <div className="flex items-center gap-2">
            <Sun className="w-8 h-8 text-accent" />
            <div>
              <p className="text-2xl font-bold">28°C</p>
              <p className="text-sm text-muted-foreground">Partly Cloudy</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">24°C / 32°C</p>
              <p className="text-xs text-muted-foreground">Low / High</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-medium">60% chance</p>
              <p className="text-xs text-muted-foreground">Rain today</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-3">
          <p className="text-sm font-medium text-primary">💡 Farming Tip</p>
          <p className="text-sm text-muted-foreground mt-1">
            Good weather for weeding. Consider applying fertilizer before the expected rain.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;