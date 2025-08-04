import ProductCard from "@/components/marketplace/ProductCard";
import ContactSellerDialog from "@/components/marketplace/ContactSellerDialog";
import { useState } from "react";

interface MarketplaceListingsProps {
  listings: any[];
  viewMode: "grid" | "list";
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const MarketplaceListings = ({ 
  listings, 
  viewMode, 
  favorites, 
  onToggleFavorite 
}: MarketplaceListingsProps) => {
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const handleContact = (listing: any) => {
    setSelectedListing(listing);
    setIsContactDialogOpen(true);
  };

  return (
    <>
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {listings.map((listing) => (
          <ProductCard
            key={listing.id}
            listing={listing}
            viewMode={viewMode}
            isFavorite={favorites.includes(listing.id)}
            onToggleFavorite={onToggleFavorite}
            onContact={handleContact}
          />
        ))}
      </div>

      <ContactSellerDialog
        listing={selectedListing}
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
      />
    </>
  );
};

export default MarketplaceListings;