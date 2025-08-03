import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListings } from "@/services/supabase";

const MarketplacePreview = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data.slice(0, 3)); // Show only 3 most recent
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

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
        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : listings.length === 0 ? (
          <div className="text-center text-muted-foreground">No products listed yet. Be the first to sell!</div>
        ) : (
          listings.map((listing) => (
            <div key={listing.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <div className="text-2xl">{getCategoryEmoji(listing.category)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{listing.title}</h4>
                  <Badge variant={listing.status === "available" ? "default" : "secondary"} className="text-xs">
                    {listing.status === "available" ? "Available" : listing.status}
                  </Badge>
                </div>
                <p className="text-lg font-bold text-primary">KSh {listing.price}/{listing.unit}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{listing.seller_name} • {listing.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
        
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

const getCategoryEmoji = (category: string) => {
  const emojiMap: { [key: string]: string } = {
    'vegetables': '🥬',
    'fruits': '🍎',
    'grains': '🌾',
    'dairy': '🥛',
    'poultry': '🐔',
    'livestock': '🐄',
    'herbs': '🌿',
    'nuts': '🥜'
  };
  return emojiMap[category.toLowerCase()] || '🌱';
};

export default MarketplacePreview;