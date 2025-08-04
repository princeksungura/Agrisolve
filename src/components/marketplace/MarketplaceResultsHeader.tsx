import { Button } from "@/components/ui/button";

interface MarketplaceResultsHeaderProps {
  filteredCount: number;
  totalCount: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const MarketplaceResultsHeader = ({ 
  filteredCount, 
  totalCount, 
  viewMode, 
  setViewMode 
}: MarketplaceResultsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-muted-foreground">
        Showing {filteredCount} of {totalCount} products
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
  );
};

export default MarketplaceResultsHeader;