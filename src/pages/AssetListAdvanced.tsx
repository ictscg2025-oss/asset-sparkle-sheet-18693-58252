import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '@/context/AssetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Search, Eye, QrCode, Edit, Filter } from 'lucide-react';
import { ExportButton } from '@/components/ExportButton';
import { QRCodeDialog } from '@/components/QRCodeDialog';
import { BulkActionsBar } from '@/components/BulkActionsBar';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Asset } from '@/types/asset';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AssetListAdvanced = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [qrCodeAsset, setQrCodeAsset] = useState<Asset | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { assets, bulkDeleteAssets, bulkUpdateStatus } = useAssets();
  const { toast } = useToast();

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.namaAset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.noAssetACC.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.pengguna.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.departemen.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || asset.kategori === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Aktif': 'default',
      'Rusak': 'destructive',
      'Dalam Perbaikan': 'secondary',
      'Dihapus': 'outline',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const toggleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(filteredAssets.map(a => a.id));
    }
  };

  const toggleSelectAsset = (id: string) => {
    setSelectedAssets(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmBulkDelete = () => {
    bulkDeleteAssets(selectedAssets);
    toast({
      title: 'Aset Berhasil Dihapus',
      description: `${selectedAssets.length} aset telah dihapus`,
    });
    setSelectedAssets([]);
    setDeleteDialogOpen(false);
  };

  const handleBulkStatusUpdate = (status: Asset['status']) => {
    bulkUpdateStatus(selectedAssets, status);
    toast({
      title: 'Status Berhasil Diperbarui',
      description: `${selectedAssets.length} aset diperbarui ke status ${status}`,
    });
    setSelectedAssets([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Daftar Aset</h1>
          <p className="text-muted-foreground mt-2">
            Kelola dan pantau semua aset IT perusahaan
          </p>
        </div>
        <div className="flex gap-2">
          <ExportButton assets={filteredAssets} />
          <Button onClick={() => navigate('/assets/new')} className="shadow-soft">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Aset
          </Button>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Pencarian & Filter
          </CardTitle>
          <div className="grid gap-4 mt-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari aset..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Rusak">Rusak</SelectItem>
                <SelectItem value="Dalam Perbaikan">Dalam Perbaikan</SelectItem>
                <SelectItem value="Dihapus">Dihapus</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Printer">Printer</SelectItem>
                <SelectItem value="Monitor">Monitor</SelectItem>
                <SelectItem value="PC Desktop">PC Desktop</SelectItem>
                <SelectItem value="Server">Server</SelectItem>
                <SelectItem value="Network Equipment">Network Equipment</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedAssets.length === filteredAssets.length && filteredAssets.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>No Asset ACC</TableHead>
                  <TableHead>Nama Aset</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <Checkbox
                          checked={selectedAssets.includes(asset.id)}
                          onCheckedChange={() => toggleSelectAsset(asset.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{asset.noAssetACC}</TableCell>
                      <TableCell>{asset.namaAset}</TableCell>
                      <TableCell>{asset.kategori}</TableCell>
                      <TableCell>{asset.pengguna}</TableCell>
                      <TableCell>{asset.departemen}</TableCell>
                      <TableCell>{getStatusBadge(asset.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/assets/${asset.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/assets/${asset.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setQrCodeAsset(asset)}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Tidak ada aset ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Menampilkan {filteredAssets.length} dari {assets.length} aset
          </div>
        </CardContent>
      </Card>

      <BulkActionsBar
        selectedCount={selectedAssets.length}
        onClearSelection={() => setSelectedAssets([])}
        onBulkDelete={handleBulkDelete}
        onBulkStatusUpdate={handleBulkStatusUpdate}
      />

      <QRCodeDialog
        asset={qrCodeAsset}
        open={!!qrCodeAsset}
        onOpenChange={(open) => !open && setQrCodeAsset(null)}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmBulkDelete}
        title="Hapus Aset Terpilih"
        description={`Apakah Anda yakin ingin menghapus ${selectedAssets.length} aset? Tindakan ini tidak dapat dibatalkan.`}
      />
    </div>
  );
};

export default AssetListAdvanced;
