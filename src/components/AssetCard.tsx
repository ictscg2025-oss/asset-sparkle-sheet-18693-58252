import { Trash2, DollarSign, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Asset {
  id: string;
  name: string;
  category: string;
  description: string;
  value: number;
  dateAdded: string;
}

interface AssetCardProps {
  asset: Asset;
  onDelete: (id: string) => void;
}

export const AssetCard = ({ asset, onDelete }: AssetCardProps) => {
  return (
    <Card className="group relative overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{asset.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {asset.category}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(asset.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {asset.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-primary font-semibold">
            <DollarSign className="h-4 w-4" />
            {asset.value.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(asset.dateAdded).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Card>
  );
};
