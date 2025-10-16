import { Button } from '@/components/ui/button';
import { Trash2, CheckCircle, AlertCircle, Wrench, X } from 'lucide-react';
import { Asset } from '@/types/asset';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkStatusUpdate: (status: Asset['status']) => void;
}

export const BulkActionsBar = ({
  selectedCount,
  onClearSelection,
  onBulkDelete,
  onBulkStatusUpdate,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-card border rounded-lg shadow-lg px-4 py-3 flex items-center gap-4">
        <span className="text-sm font-medium">
          {selectedCount} aset dipilih
        </span>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Update Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onBulkStatusUpdate('Aktif')}>
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Aktif
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkStatusUpdate('Rusak')}>
                <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
                Rusak
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkStatusUpdate('Dalam Perbaikan')}>
                <Wrench className="mr-2 h-4 w-4 text-orange-600" />
                Dalam Perbaikan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="destructive" size="sm" onClick={onBulkDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus
          </Button>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
