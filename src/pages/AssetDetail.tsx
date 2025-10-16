import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssets } from '@/context/AssetContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Package, QrCode, History } from 'lucide-react';
import { QRCodeDialog } from '@/components/QRCodeDialog';
import { Separator } from '@/components/ui/separator';

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssetById, getAssetHistory } = useAssets();
  const asset = id ? getAssetById(id) : undefined;
  const history = id ? getAssetHistory(id) : [];
  const [qrOpen, setQrOpen] = useState(false);

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Aset Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-6">Aset yang Anda cari tidak tersedia</p>
        <Button onClick={() => navigate('/assets')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Daftar Aset
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Aktif': 'default',
      'Rusak': 'destructive',
      'Dalam Perbaikan': 'secondary',
      'Dihapus': 'outline',
    };
    return <Badge variant={variants[status] || 'default'} className="text-sm">{status}</Badge>;
  };

  const DetailRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b last:border-0">
      <span className="font-medium text-muted-foreground min-w-[180px] mb-1 sm:mb-0">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/assets')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setQrOpen(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            QR Code
          </Button>
          <Button onClick={() => navigate(`/assets/${id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Aset
          </Button>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{asset.namaAset}</CardTitle>
              <p className="text-muted-foreground mt-2">{asset.noAssetACC}</p>
            </div>
            {getStatusBadge(asset.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {asset.urlGambar && (
            <div className="rounded-lg overflow-hidden border bg-muted/30">
              <img
                src={asset.urlGambar}
                alt={asset.namaAset}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi Aset</h3>
            <div className="space-y-0">
              <DetailRow label="Model / Tipe" value={asset.modelTipe} />
              <DetailRow label="Nomor Seri" value={asset.nomorSeri} />
              <DetailRow label="Kategori" value={asset.kategori} />
              <DetailRow label="Pengguna" value={asset.pengguna} />
              <DetailRow label="Departemen" value={asset.departemen} />
              <DetailRow label="Tanggal Barang Masuk" value={new Date(asset.tanggalBarangMasuk).toLocaleDateString('id-ID')} />
              {asset.lokasi && <DetailRow label="Lokasi" value={asset.lokasi} />}
              {asset.hargaBeli && <DetailRow label="Harga Beli" value={`Rp ${asset.hargaBeli.toLocaleString('id-ID')}`} />}
              {asset.vendor && <DetailRow label="Vendor" value={asset.vendor} />}
              {asset.tanggalGaransiHabis && <DetailRow label="Garansi Hingga" value={new Date(asset.tanggalGaransiHabis).toLocaleDateString('id-ID')} />}
              {asset.catatan && <DetailRow label="Catatan" value={asset.catatan} />}
            </div>
          </div>
        </CardContent>
      </Card>

      {history.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Riwayat Aktivitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((h, index) => (
                <div key={h.id}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {index < history.length - 1 && (
                        <div className="w-0.5 h-12 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {h.action}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(h.timestamp).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{h.changes}</p>
                      {h.user && <p className="text-xs text-muted-foreground mt-1">Oleh: {h.user}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <QRCodeDialog asset={asset} open={qrOpen} onOpenChange={setQrOpen} />
    </div>
  );
};

export default AssetDetail;
