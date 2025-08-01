import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, MapPin, Star, MessageSquare, TrendingUp, Award } from "lucide-react";

const Community = () => {
  const cooperatives = [
    {
      name: "Kiambu Coffee Farmers SACCO",
      members: 245,
      location: "Kiambu County",
      specialty: "Coffee Production",
      rating: 4.8,
      verified: true
    },
    {
      name: "Nakuru Maize Growers Cooperative",
      members: 178,
      location: "Nakuru County", 
      specialty: "Grain Production",
      rating: 4.6,
      verified: true
    },
    {
      name: "Meru Dairy Farmers Union",
      members: 320,
      location: "Meru County",
      specialty: "Dairy Farming",
      rating: 4.9,
      verified: true
    }
  ];

  const experts = [
    {
      name: "Dr. Jane Mwangi",
      title: "Agricultural Extension Officer",
      expertise: "Crop Disease Management",
      rating: 4.9,
      answered: 156,
      location: "Nairobi"
    },
    {
      name: "Peter Kamau",
      title: "Organic Farming Specialist", 
      expertise: "Sustainable Agriculture",
      rating: 4.7,
      answered: 89,
      location: "Nakuru"
    },
    {
      name: "Mary Njeri",
      title: "Livestock Veterinarian",
      expertise: "Animal Health",
      rating: 4.8,
      answered: 134,
      location: "Meru"
    }
  ];

  const events = [
    {
      title: "Modern Farming Techniques Workshop",
      date: "March 15, 2024",
      location: "Kiambu Agricultural Center",
      attendees: 67,
      type: "Workshop"
    },
    {
      title: "Dairy Cooperative Annual Meeting",
      date: "March 20, 2024",
      location: "Meru County Hall",
      attendees: 124,
      type: "Meeting"
    },
    {
      title: "Organic Certification Training",
      date: "March 25, 2024",
      location: "Nakuru Training Center",
      attendees: 45,
      type: "Training"
    }
  ];

  const achievements = [
    {
      user: "Grace Wanjiku",
      achievement: "Top Contributor",
      description: "Helped 50+ farmers this month",
      icon: "🏆"
    },
    {
      user: "John Kimani",
      achievement: "Expert Mentor",
      description: "100 successful answers",
      icon: "⭐"
    },
    {
      user: "Kiambu Coffee SACCO",
      achievement: "Community Builder",
      description: "250+ active members",
      icon: "👥"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Community Hub</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with fellow farmers, cooperatives, and agricultural experts across Kenya
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="earth">Join a Cooperative</Button>
            <Button variant="outline">Find Local Experts</Button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">2,500+</div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-muted-foreground">Cooperatives</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <Award className="w-8 h-8 mx-auto mb-2 text-primary-glow" />
              <div className="text-2xl font-bold">78</div>
              <div className="text-sm text-muted-foreground">Expert Advisors</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Counties</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Cooperatives */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Featured Cooperatives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cooperatives.map((coop, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {coop.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{coop.name}</h3>
                          {coop.verified && <Badge variant="default" className="text-xs">✓ Verified</Badge>}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{coop.location}</span>
                        </div>
                        <div className="text-sm text-primary">{coop.specialty}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{coop.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{coop.members} members</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">View All Cooperatives</Button>
              </CardContent>
            </Card>

            {/* Agricultural Experts */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Top Agricultural Experts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experts.map((expert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-accent text-foreground font-bold">
                          {expert.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{expert.name}</h3>
                        <div className="text-sm text-muted-foreground">{expert.title}</div>
                        <div className="text-sm text-primary">{expert.expertise}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{expert.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{expert.answered} answers</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">Connect with Experts</Button>
              </CardContent>
            </Card>

            {/* Community Events */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="text-lg">📅 Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge variant="secondary">{event.type}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>📅 {event.date}</div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div>{event.attendees} people interested</div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">Register Interest</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Achievements */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="text-lg">🏆 Community Heroes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{achievement.user}</div>
                      <div className="text-xs text-primary">{achievement.achievement}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  🤝 Join a Cooperative
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💬 Start Group Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📍 Find Local Farmers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📚 Become a Mentor
                </Button>
              </CardContent>
            </Card>

            {/* Regional Activity */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="text-lg">🗺️ Regional Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Kiambu County</span>
                  <span className="font-medium text-primary">456 farmers</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Nakuru County</span>
                  <span className="font-medium text-primary">389 farmers</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Meru County</span>
                  <span className="font-medium text-primary">234 farmers</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Murang'a County</span>
                  <span className="font-medium text-primary">198 farmers</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;