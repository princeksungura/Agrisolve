import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Search, MapPin, Phone, Filter, Plus } from "lucide-react";

const Marketplace = () => {
  const listings = [
    {
      id: 1,
      title: "Fresh Organic Tomatoes",
      price: "KSh 80/kg",
      seller: "Grace Farm Co-op",
      location: "Kiambu County",
      quantity: "500 kg available",
      image: "🍅",
      status: "Available",
      phone: "+254 712 345 678",
      description: "Grade A tomatoes, perfect for hotels and restaurants"
    },
    {
      id: 2,
      title: "Yellow Maize (Dry)",
      price: "KSh 45/kg",
      seller: "Green Valley Farmers",
      location: "Nakuru County", 
      quantity: "2 tons available",
      image: "🌽",
      status: "Available",
      phone: "+254 723 456 789",
      description: "High quality maize, 13% moisture content"
    },
    {
      id: 3,
      title: "Fresh Cow Milk",
      price: "KSh 60/liter",
      seller: "Dairy Farmers SACCO",
      location: "Meru County",
      quantity: "200 liters daily",
      image: "🥛",
      status: "Daily Supply",
      phone: "+254 734 567 890",
      description: "Fresh milk delivered twice daily"
    },
    {
      id: 4,
      title: "Irish Potatoes",
      price: "KSh 35/kg",
      seller: "Highland Growers",
      location: "Nyandarua County",
      quantity: "1.5 tons available",
      image: "🥔",
      status: "Limited",
      phone: "+254 745 678 901",
      description: "Premium potatoes, perfect for french fries"
    },
    {
      id: 5,
      title: "Free Range Eggs",
      price: "KSh 15/piece",
      seller: "Sunrise Poultry",
      location: "Machakos County",
      quantity: "500 eggs available",
      image: "🥚",
      status: "Available",
      phone: "+254 756 789 012",
      description: "Fresh eggs from free-range chickens"
    },
    {
      id: 6,
      title: "Passion Fruits",
      price: "KSh 120/kg",
      seller: "Tropical Fruits Ltd",
      location: "Murang'a County",
      quantity: "300 kg available",
      image: "🟠",
      status: "Available",
      phone: "+254 767 890 123",
      description: "Sweet purple passion fruits, export quality"
    }
  ];

  const categories = ["All", "Grains", "Vegetables", "Fruits", "Dairy", "Poultry", "Livestock"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell fresh produce directly from farmers</p>
          </div>
          <Button variant="earth" className="mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            List Your Produce
          </Button>
        </div>

        {/* Filters */}
        <Card className="earth-shadow mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kiambu">Kiambu County</SelectItem>
                  <SelectItem value="nakuru">Nakuru County</SelectItem>
                  <SelectItem value="meru">Meru County</SelectItem>
                  <SelectItem value="nyandarua">Nyandarua County</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">47</div>
              <div className="text-sm text-muted-foreground">Counties</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Product Types</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary-glow">⭐ 4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="earth-shadow hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{listing.image}</div>
                  <Badge variant={listing.status === "Available" ? "default" : listing.status === "Limited" ? "destructive" : "secondary"}>
                    {listing.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
                <div className="text-2xl font-bold text-primary">{listing.price}</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{listing.seller} • {listing.location}</span>
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {listing.quantity}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="default" size="sm" className="w-full">
                    Make Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-8">
          <Button variant="outline" size="lg">Load More Products</Button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;