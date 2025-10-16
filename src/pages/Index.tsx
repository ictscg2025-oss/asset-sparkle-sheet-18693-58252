import { useState } from "react";
import { Package, TrendingUp } from "lucide-react";
import { AssetCard, Asset } from "@/components/AssetCard";
import { AddAssetDialog } from "@/components/AddAssetDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { toast } from "sonner";

const DEMO_ASSETS: Asset[] = [
  {
    id: "1",
    name: "MacBook Pro 16-inch",
    category: "Electronics",
    description: "M3 Max chip, 64GB RAM, 2TB SSD - Primary development machine",
    value: 3499,
    dateAdded: "2024-01-15",
  },
  {
    id: "2",
    name: "Herman Miller Aeron Chair",
    category: "Furniture",
    description: "Ergonomic office chair with lumbar support, size B",
    value: 1495,
    dateAdded: "2024-02-01",
  },
  {
    id: "3",
    name: "Sony A7 IV Camera",
    category: "Electronics",
    description: "Full-frame mirrorless camera with 33MP sensor",
    value: 2498,
    dateAdded: "2024-03-10",
  },
];

const Index = () => {
  const [assets, setAssets] = useState<Asset[]>(DEMO_ASSETS);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    assetId: string | null;
    assetName: string;
  }>({ open: false, assetId: null, assetName: "" });

  const handleAddAsset = (newAsset: Omit<Asset, "id">) => {
    const asset: Asset = {
      ...newAsset,
      id: Date.now().toString(),
    };
    setAssets([asset, ...assets]);
    toast.success("Asset added successfully!", {
      description: `${asset.name} has been added to your inventory.`,
    });
  };

  const handleDeleteClick = (id: string) => {
    const asset = assets.find((a) => a.id === id);
    if (asset) {
      setDeleteDialog({ open: true, assetId: id, assetName: asset.name });
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.assetId) {
      setAssets(assets.filter((a) => a.id !== deleteDialog.assetId));
      toast.success("Asset deleted", {
        description: `${deleteDialog.assetName} has been removed from your inventory.`,
      });
      setDeleteDialog({ open: false, assetId: null, assetName: "" });
    }
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Asset Manager</h1>
                <p className="text-sm text-muted-foreground">Track and manage your inventory</p>
              </div>
            </div>
            <AddAssetDialog onAdd={handleAddAsset} />
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Assets</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{assets.length}</p>
          </div>
          
          <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 shadow-[var(--shadow-card)] text-white">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium opacity-90">Total Value</span>
            </div>
            <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Categories</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {new Set(assets.map((a) => a.category)).size}
            </p>
          </div>
        </div>

        {/* Assets Grid */}
        {assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-6 bg-muted/50 rounded-full mb-4">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No assets yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first asset to your inventory
            </p>
            <AddAssetDialog onAdd={handleAddAsset} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} onDelete={handleDeleteClick} />
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ ...deleteDialog, open })
        }
        onConfirm={handleDeleteConfirm}
        assetName={deleteDialog.assetName}
      />
    </div>
  );
};

export default Index;
