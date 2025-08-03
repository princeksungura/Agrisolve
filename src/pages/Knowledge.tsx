import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Play, FileText, Clock, Star } from "lucide-react";

const Knowledge = () => {
  const categories = [
    { name: "Crop Production", count: 45, icon: "🌾" },
    { name: "Livestock", count: 32, icon: "🐄" },
    { name: "Pest Management", count: 28, icon: "🐛" },
    { name: "Soil Health", count: 23, icon: "🌱" },
    { name: "Climate Smart", count: 19, icon: "🌡️" },
    { name: "Post Harvest", count: 15, icon: "📦" }
  ];

  // Featured content can be loaded from a CMS or static data
  const featured = [
    {
      id: 1,
      title: "Complete Guide to Tomato Farming in Kenya",
      type: "Article",
      duration: "15 min read",
      author: "Dr. Jane Mwangi",
      rating: 4.8,
      image: "🍅",
      description: "Everything you need to know about growing healthy, profitable tomatoes"
    },
    {
      id: 2,
      title: "Organic Pest Control Methods",
      type: "Video",
      duration: "12 min watch",
      author: "Peter Kamau",
      rating: 4.9,
      image: "🌿",
      description: "Natural ways to protect your crops without harmful chemicals"
    },
    {
      id: 3,
      title: "Soil Testing and Improvement",
      type: "Guide",
      duration: "8 min read",
      author: "Prof. Mary Njeri",
      rating: 4.7,
      image: "🔬",
      description: "Learn how to test and improve your soil for better yields"
    }
  ];

  const recent = [
    {
      title: "Maize Planting Calendar 2024",
      category: "Crop Production",
      type: "Article",
      readTime: "5 min"
    },
    {
      title: "Water-Smart Irrigation Techniques",
      category: "Climate Smart",
      type: "Video",
      readTime: "10 min"
    },
    {
      title: "Common Poultry Diseases Prevention",
      category: "Livestock",
      type: "Guide",
      readTime: "7 min"
    },
    {
      title: "Value Addition for Small-Scale Farmers",
      category: "Post Harvest",
      type: "Article",
      readTime: "12 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Knowledge Hub</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn modern farming techniques, best practices, and expert advice to boost your agricultural success
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search articles, videos, guides..." className="pl-10" />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="earth-shadow hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} resources</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((item) => (
              <Card key={item.id} className="earth-shadow hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="text-4xl mb-3 text-center">{item.image}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{item.type}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">by {item.author}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    {item.type === "Video" ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Read Article
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">Latest Resources</h2>
            <div className="space-y-4">
              {recent.map((item, index) => (
                <Card key={index} className="earth-shadow hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant="secondary">{item.type}</Badge>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{item.readTime}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {item.type === "Video" ? <Play className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular This Week */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="text-lg">🔥 Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Drip Irrigation Setup Guide</div>
                  <div className="text-muted-foreground">1,234 views</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Organic Composting Methods</div>
                  <div className="text-muted-foreground">987 views</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Chicken Farming for Beginners</div>
                  <div className="text-muted-foreground">756 views</div>
                </div>
              </CardContent>
            </Card>

            {/* Expert Tips */}
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle className="text-lg">💡 Expert Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm font-medium text-primary mb-2">Tip of the Day</p>
                  <p className="text-sm text-muted-foreground">
                    Plant marigolds around your tomato plants to naturally repel pests and improve soil health.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Knowledge;