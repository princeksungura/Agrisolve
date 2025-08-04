import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingBag, Plus } from "lucide-react";
import AddListingForm from "@/components/forms/AddListingForm";

interface MarketplaceEmptyStateProps {
  hasListings: boolean;
  onListingAdded: () => void;
  onClearFilters: () => void;
}

const MarketplaceEmptyState = ({ 
  hasListings, 
  onListingAdded, 
  onClearFilters 
}: MarketplaceEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-muted-foreground mb-6">
        {!hasListings 
          ? "No listings yet. Be the first to sell!" 
          : "Try adjusting your filters to see more results."
        }
      </p>
      <div className="flex gap-4 justify-center">
        {!hasListings ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="earth">
                <Plus className="w-4 h-4 mr-2" />
                Add First Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <AddListingForm onSuccess={onListingAdded} />
            </DialogContent>
          </Dialog>
        ) : (
          <>
            <Button variant="outline" onClick={onClearFilters}>
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
                <AddListingForm onSuccess={onListingAdded} />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default MarketplaceEmptyState;