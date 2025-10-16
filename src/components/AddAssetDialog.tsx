import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asset } from "./AssetCard";

interface AddAssetDialogProps {
  onAdd: (asset: Omit<Asset, "id">) => void;
}

const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Vehicles",
  "Real Estate",
  "Equipment",
  "Other",
];

export const AddAssetDialog = ({ onAdd }: AddAssetDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    value: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.value) {
      return;
    }

    onAdd({
      name: formData.name,
      category: formData.category,
      description: formData.description,
      value: parseFloat(formData.value),
      dateAdded: new Date().toISOString(),
    });

    setFormData({ name: "", category: "", description: "", value: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
          <Plus className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>
            Add a new asset to your inventory. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              placeholder="e.g., MacBook Pro 16-inch"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="value">Value ($)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add any additional details about this asset..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Asset</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
