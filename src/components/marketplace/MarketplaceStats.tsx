import { Card, CardContent } from "@/components/ui/card";

interface MarketplaceStatsProps {
  filteredListings: any[];
  totalListings: any[];
}

const MarketplaceStats = ({ filteredListings, totalListings }: MarketplaceStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card className="earth-shadow text-center">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-primary">{filteredListings.length}</div>
          <div className="text-sm text-muted-foreground">Active Listings</div>
        </CardContent>
      </Card>
      <Card className="earth-shadow text-center">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-accent">{new Set(totalListings.map(l => l.location)).size}</div>
          <div className="text-sm text-muted-foreground">Locations</div>
        </CardContent>
      </Card>
      <Card className="earth-shadow text-center">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-primary">{new Set(totalListings.map(l => l.category)).size}</div>
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
  );
};

export default MarketplaceStats;