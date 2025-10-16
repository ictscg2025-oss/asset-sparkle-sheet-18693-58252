import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '@/context/AssetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Eye } from 'lucide-react';

const AssetList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { assets } = useAssets();

  const filteredAssets = assets.filter(
    (asset) =>
      asset.namaAset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.noAssetACC.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.pengguna.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.departemen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Aktif': 'default',
      'Rusak': 'destructive',
      'Dalam Perbaikan': 'secondary',
      'Dihapus': 'outline',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
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
        <Button onClick={() => navigate('/assets/new')} className="shadow-soft">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Aset
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Pencarian Aset</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama, nomor aset, pengguna, atau departemen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
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
                      <TableCell className="font-medium">{asset.noAssetACC}</TableCell>
                      <TableCell>{asset.namaAset}</TableCell>
                      <TableCell>{asset.kategori}</TableCell>
                      <TableCell>{asset.pengguna}</TableCell>
                      <TableCell>{asset.departemen}</TableCell>
                      <TableCell>{getStatusBadge(asset.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/assets/${asset.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
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
    </div>
  );
};

export default AssetList;
