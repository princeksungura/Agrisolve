import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getListings } from "@/services/supabase";
import AddListingForm from "@/components/forms/AddListingForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import MarketplaceStats from "@/components/marketplace/MarketplaceStats";
import MarketplaceResultsHeader from "@/components/marketplace/MarketplaceResultsHeader";
import MarketplaceListings from "@/components/marketplace/MarketplaceListings";
import MarketplaceEmptyState from "@/components/marketplace/MarketplaceEmptyState";

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

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLocation("all");
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

        <MarketplaceFilters
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode as "grid" | "list"}
          onViewModeChange={setViewMode}
        />

        <MarketplaceStats 
          filteredListings={filteredListings}
          totalListings={listings}
        />

        <MarketplaceResultsHeader
          filteredCount={filteredListings.length}
          totalCount={listings.length}
          viewMode={viewMode as "grid" | "list"}
          setViewMode={setViewMode}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Loading marketplace listings...</div>
          </div>
        ) : filteredListings.length === 0 ? (
          <MarketplaceEmptyState
            hasListings={listings.length > 0}
            onListingAdded={handleListingAdded}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <MarketplaceListings
            listings={filteredListings}
            viewMode={viewMode as "grid" | "list"}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

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