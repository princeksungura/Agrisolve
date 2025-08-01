import Navbar from "@/components/Navbar";
import WeatherCard from "@/components/WeatherCard";
import ForumPreview from "@/components/ForumPreview";
import MarketplacePreview from "@/components/MarketplacePreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Leaf, Globe } from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Active Farmers", value: "2,500+", icon: Users, color: "text-primary" },
    { label: "Questions Solved", value: "1,200+", icon: TrendingUp, color: "text-accent" },
    { label: "Crops Traded", value: "50+ types", icon: Leaf, color: "text-primary-glow" },
    { label: "Counties Served", value: "12", icon: Globe, color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Empowering Smallholder 
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Farmers</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect, trade, learn, and grow with Kenya's largest agricultural community platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="earth" size="lg" className="text-lg px-8">
                Join Community
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="earth-shadow text-center">
                  <CardContent className="pt-6">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <ForumPreview />
              <MarketplacePreview />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <WeatherCard />
              
              {/* Quick Actions */}
              <Card className="earth-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    📝 Ask a Question
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🛒 List Your Produce
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📚 Browse Knowledge Hub
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🌾 Track Your Farm Records
                  </Button>
                </CardContent>
              </Card>

              {/* Language Switcher */}
              <Card className="earth-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Language / Lugha</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="default" size="sm">English</Button>
                    <Button variant="outline" size="sm">Kiswahili</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
