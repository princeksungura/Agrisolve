import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const MarketplacePreview = () => {
  const featuredListings = [
    {
      id: 1,
      title: "Fresh Tomatoes",
      price: "KSh 80/kg",
      seller: "Grace Farm",
      location: "Kiambu",
      image: "🍅",
      status: "Available"
    },
    {
      id: 2,
      title: "Organic Maize",
      price: "KSh 45/kg",
      seller: "Green Valley",
      location: "Nakuru",
      image: "🌽",
      status: "Limited"
    },
    {
      id: 3,
      title: "Fresh Milk",
      price: "KSh 60/liter",
      seller: "Dairy Co-op",
      location: "Meru",
      image: "🥛",
      status: "Available"
    }
  ];

  return (
    <Card className="earth-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Fresh from Farms
          </CardTitle>
          <Link to="/marketplace">
            <Button variant="ghost" size="sm" className="text-primary">
              Browse All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {featuredListings.map((listing) => (
          <div key={listing.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <div className="text-2xl">{listing.image}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{listing.title}</h4>
                <Badge variant={listing.status === "Available" ? "default" : "secondary"} className="text-xs">
                  {listing.status}
                </Badge>
              </div>
              <p className="text-lg font-bold text-primary">{listing.price}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{listing.seller} • {listing.location}</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Link to="/marketplace">
            <Button variant="outline" className="w-full">
              Buy Now
            </Button>
          </Link>
          <Link to="/marketplace/sell">
            <Button variant="default" className="w-full">
              Sell Produce
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplacePreview;