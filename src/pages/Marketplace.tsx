import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Search, MapPin, Phone, Filter, Plus, Star, Heart, Share2, Eye, Calendar, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getListings } from "@/services/supabase";
import AddListingForm from "@/components/forms/AddListingForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter and sort listings
  useEffect(() => {
    let filtered = [...listings];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.seller_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(listing =>
        listing.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter(listing =>
        listing.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      default:
        break;
    }

    setFilteredListings(filtered);
  }, [listings, searchQuery, selectedCategory, selectedLocation, sortBy]);

  const handleListingAdded = () => {
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

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev =>
      prev.includes(listingId)
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

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

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "grains", label: "Grains & Cereals" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "dairy", label: "Dairy Products" },
    { value: "poultry", label: "Poultry & Eggs" },
    { value: "livestock", label: "Livestock" },
    { value: "seeds", label: "Seeds & Seedlings" },
    { value: "equipment", label: "Farm Equipment" },
    { value: "organic", label: "Organic Products" },
    { value: "processed", label: "Processed Foods" }
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "kiambu", label: "Kiambu County" },
    { value: "nakuru", label: "Nakuru County" },
    { value: "meru", label: "Meru County" },
    { value: "nyandarua", label: "Nyandarua County" },
    { value: "murang'a", label: "Murang'a County" },
    { value: "nyeri", label: "Nyeri County" },
    { value: "laikipia", label: "Laikipia County" },
    { value: "embu", label: "Embu County" }
  ];

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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <AddListingForm onSuccess={handleListingAdded} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Enhanced Filters */}
        <Card className="earth-shadow mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products, sellers..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1"
                >
                  Grid
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1"
                >
                  List
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {categories.find(c => c.value === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {selectedLocation !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Location: {locations.find(l => l.value === selectedLocation)?.label}
                  <button onClick={() => setSelectedLocation("all")} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{filteredListings.length}</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">{new Set(listings.map(l => l.location)).size}</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{new Set(listings.map(l => l.category)).size}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary-glow">⭐ 4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            Showing {filteredListings.length} of {listings.length} products
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {/* Listings Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Loading marketplace listings...</div>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              {listings.length === 0 
                ? "No listings yet. Be the first to sell!" 
                : "Try adjusting your filters to see more results."
              }
            </p>
            <div className="flex gap-4 justify-center">
              {listings.length === 0 ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="earth">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Listing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <AddListingForm onSuccess={handleListingAdded} />
                  </DialogContent>
                </Dialog>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedLocation("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="earth">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Listing
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <AddListingForm onSuccess={handleListingAdded} />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="earth-shadow hover:shadow-lg transition-all duration-300 group">
                {viewMode === "grid" ? (
                  <>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-4xl">{getCategoryEmoji(listing.category)}</div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => toggleFavorite(listing.id)}
                          >
                            <Heart 
                              className={`w-4 h-4 ${
                                favorites.includes(listing.id) 
                                  ? "fill-red-500 text-red-500" 
                                  : "text-muted-foreground"
                              }`} 
                            />
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
                        <Button variant="default" size="sm" className="w-full">
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
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
                              onClick={() => toggleFavorite(listing.id)}
                            >
                              <Heart 
                                className={`w-4 h-4 ${
                                  favorites.includes(listing.id) 
                                    ? "fill-red-500 text-red-500" 
                                    : "text-muted-foreground"
                                }`} 
                              />
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
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`tel:${listing.seller_phone}`}>
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </a>
                            </Button>
                            <Button variant="default" size="sm">
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredListings.length > 0 && (
          <div className="text-center pt-8">
            <Button variant="outline" size="lg">Load More Products</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;