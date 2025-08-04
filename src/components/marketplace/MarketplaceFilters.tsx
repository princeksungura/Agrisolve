import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface MarketplaceFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const MarketplaceFilters = ({
  searchQuery,
  onSearchQueryChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}: MarketplaceFiltersProps) => {
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

  return (
    <Card className="earth-shadow mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products, sellers..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
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

          <Select value={selectedLocation} onValueChange={onLocationChange}>
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

          <Select value={sortBy} onValueChange={onSortChange}>
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
              onClick={() => onViewModeChange("grid")}
              className="flex-1"
            >
              Grid
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="sm"
              onClick={() => onViewModeChange("list")}
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
              <button onClick={() => onSearchQueryChange("")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find(c => c.value === selectedCategory)?.label}
              <button onClick={() => onCategoryChange("all")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          {selectedLocation !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Location: {locations.find(l => l.value === selectedLocation)?.label}
              <button onClick={() => onLocationChange("all")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplaceFilters;