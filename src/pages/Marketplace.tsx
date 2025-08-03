import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Search, MapPin, Phone, Filter, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getListings } from "@/services/supabase";
import AddListingForm from "@/components/forms/AddListingForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleListingAdded = () => {
    // Refresh listings after adding a new one
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="earth" className="mt-4 md:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                List Your Produce
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <AddListingForm onSuccess={handleListingAdded} />
            </DialogContent>
          </Dialog>
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
              <div className="text-2xl font-bold text-primary">{listings.length}</div>
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
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary-glow">⭐ 4.8</div>
              <div className="text-sm text-muted-foreground">Platform Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="text-muted-foreground">Loading marketplace listings...</div>
            </div>
          ) : listings.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <div className="text-muted-foreground mb-4">No listings yet. Be the first to sell!</div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Listing
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <AddListingForm onSuccess={handleListingAdded} />
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            listings.map((listing) => (
              <Card key={listing.id} className="earth-shadow hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{getCategoryEmoji(listing.category)}</div>
                    <Badge variant={listing.status === "available" ? "default" : listing.status === "reserved" ? "destructive" : "secondary"}>
                      {listing.status === "available" ? "Available" : listing.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary">KSh {listing.price}/{listing.unit}</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{listing.seller_name} • {listing.location}</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {listing.quantity} {listing.unit} available
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={`tel:${listing.seller_phone}`}>
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </a>
                    </Button>
                    <Button variant="default" size="sm" className="w-full">
                      Contact Seller
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
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