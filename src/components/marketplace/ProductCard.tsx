import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Phone, MapPin, Calendar, Share2, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProductCardProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price: number;
    unit: string;
    quantity: string;
    category: string;
    location: string;
    seller_name: string;
    seller_phone: string;
    status: string;
    created_at: string;
    images?: string[];
  };
  viewMode?: "grid" | "list";
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onContact?: (listing: any) => void;
}

const ProductCard = ({ 
  listing, 
  viewMode = "grid", 
  isFavorite = false, 
  onToggleFavorite,
  onContact 
}: ProductCardProps) => {
  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      'grains & cereals': '🌾',
      'vegetables': '🥬',
      'fruits': '🍎',
      'dairy products': '🥛',
      'poultry & eggs': '🐔',
      'livestock': '🐄',
      'seeds & seedlings': '🌱',
      'farm equipment': '🚜',
      'organic products': '🌿',
      'processed foods': '🥫'
    };
    return emojiMap[category.toLowerCase()] || '🌱';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "default";
      case "reserved":
        return "secondary";
      case "sold":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: `Check out this ${listing.category.toLowerCase()} listing: ${listing.title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (viewMode === "list") {
    return (
      <Card className="earth-shadow hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{getCategoryEmoji(listing.category)}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {listing.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <div className="text-xl font-bold text-primary">KSh {listing.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">per {listing.unit}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onToggleFavorite?.(listing.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        isFavorite 
                          ? "fill-red-500 text-red-500" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Badge variant={getStatusColor(listing.status)}>
                    {listing.status === "available" ? "Available" : 
                     listing.status === "reserved" ? "Reserved" : "Sold"}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{listing.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{listing.seller_name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span>{listing.location}</span>
                  </div>
                  <div className="font-medium">
                    {listing.quantity} {listing.unit} available
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${listing.seller_phone}`}>
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </a>
                  </Button>
                  <Button variant="default" size="sm" onClick={() => onContact?.(listing)}>
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="earth-shadow hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{getCategoryEmoji(listing.category)}</div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onToggleFavorite?.(listing.id)}
            >
              <Heart 
                className={`w-4 h-4 ${
                  isFavorite 
                    ? "fill-red-500 text-red-500" 
                    : "text-muted-foreground"
                }`} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Badge variant={getStatusColor(listing.status)}>
              {listing.status === "available" ? "Available" : 
               listing.status === "reserved" ? "Reserved" : "Sold"}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {listing.title}
        </CardTitle>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-primary">KSh {listing.price.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">per {listing.unit}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{listing.seller_name}</span>
            <span className="text-muted-foreground">•</span>
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium text-foreground">
              {listing.quantity} {listing.unit} available
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href={`tel:${listing.seller_phone}`}>
              <Phone className="w-4 h-4 mr-1" />
              Call
            </a>
          </Button>
          <Button variant="default" size="sm" className="w-full" onClick={() => onContact?.(listing)}>
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;