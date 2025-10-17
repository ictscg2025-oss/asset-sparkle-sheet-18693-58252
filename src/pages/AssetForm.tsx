import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAssets } from '@/context/AssetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, X } from 'lucide-react';

const AssetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addAsset, updateAsset, getAssetById } = useAssets();
  const isEdit = Boolean(id);
  const existingAsset = isEdit && id ? getAssetById(id) : null;

  const [formData, setFormData] = useState({
    namaAset: existingAsset?.namaAset || '',
    noAssetACC: existingAsset?.noAssetACC || '',
    modelTipe: existingAsset?.modelTipe || '',
    nomorSeri: existingAsset?.nomorSeri || '',
    pengguna: existingAsset?.pengguna || '',
    departemen: existingAsset?.departemen || '',
    tanggalBarangMasuk: existingAsset?.tanggalBarangMasuk || '',
    status: existingAsset?.status || 'Aktif',
    kategori: existingAsset?.kategori || 'Laptop',
    catatan: existingAsset?.catatan || '',
    lokasi: existingAsset?.lokasi || '',
    hargaBeli: existingAsset?.hargaBeli?.toString() || '',
    vendor: existingAsset?.vendor || '',
    tanggalGaransiHabis: existingAsset?.tanggalGaransiHabis || '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(existingAsset?.urlGambar || null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const assetData = {
      ...formData,
      hargaBeli: formData.hargaBeli ? parseFloat(formData.hargaBeli) : undefined,
      urlGambar: imagePreview || undefined,
    };
    
    if (isEdit && id) {
      updateAsset(id, assetData);
      toast({
        title: "Aset Berhasil Diperbarui",
        description: `${formData.namaAset} telah diperbarui`,
      });
    } else {
      addAsset(assetData);
      toast({
        title: "Aset Berhasil Ditambahkan",
        description: `${formData.namaAset} telah ditambahkan ke sistem`,
      });
    }
    
    navigate('/assets');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/assets')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEdit ? 'Edit Aset' : 'Tambah Aset Baru'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="namaAset">Nama Aset *</Label>
                <Input
                  id="namaAset"
                  value={formData.namaAset}
                  onChange={(e) => handleInputChange('namaAset', e.target.value)}
                  placeholder="Contoh: Dell Latitude 5420"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noAssetACC">No Asset ACC *</Label>
                <Input
                  id="noAssetACC"
                  value={formData.noAssetACC}
                  onChange={(e) => handleInputChange('noAssetACC', e.target.value)}
                  placeholder="Contoh: ACC-LPT-001"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelTipe">Model / Tipe *</Label>
                <Input
                  id="modelTipe"
                  value={formData.modelTipe}
                  onChange={(e) => handleInputChange('modelTipe', e.target.value)}
                  placeholder="Contoh: Latitude 5420"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomorSeri">Nomor Seri *</Label>
                <Input
                  id="nomorSeri"
                  value={formData.nomorSeri}
                  onChange={(e) => handleInputChange('nomorSeri', e.target.value)}
                  placeholder="Contoh: DLL5420-2023-001"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pengguna">Pengguna *</Label>
                <Input
                  id="pengguna"
                  value={formData.pengguna}
                  onChange={(e) => handleInputChange('pengguna', e.target.value)}
                  placeholder="Contoh: Ahmad Rizki"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departemen">Departemen *</Label>
                <Input
                  id="departemen"
                  value={formData.departemen}
                  onChange={(e) => handleInputChange('departemen', e.target.value)}
                  placeholder="Contoh: IT Development"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggalBarangMasuk">Tanggal Barang Masuk *</Label>
                <Input
                  id="tanggalBarangMasuk"
                  type="date"
                  value={formData.tanggalBarangMasuk}
                  onChange={(e) => handleInputChange('tanggalBarangMasuk', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Rusak">Rusak</SelectItem>
                    <SelectItem value="Dalam Perbaikan">Dalam Perbaikan</SelectItem>
                    <SelectItem value="Dihapus">Dihapus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori *</Label>
                <Select value={formData.kategori} onValueChange={(value) => handleInputChange('kategori', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laptop">Laptop</SelectItem>
                    <SelectItem value="Printer">Printer</SelectItem>
                    <SelectItem value="Monitor">Monitor</SelectItem>
                    <SelectItem value="PC Desktop">PC Desktop</SelectItem>
                    <SelectItem value="Server">Server</SelectItem>
                    <SelectItem value="Network Equipment">Network Equipment</SelectItem>
                    <SelectItem value="Radio RIG">Radio RIG</SelectItem>
                    <SelectItem value="Radio HT">Radio HT</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  id="lokasi"
                  value={formData.lokasi}
                  onChange={(e) => handleInputChange('lokasi', e.target.value)}
                  placeholder="Contoh: Lantai 3, Ruang 301"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hargaBeli">Harga Beli (Rp)</Label>
                <Input
                  id="hargaBeli"
                  type="number"
                  value={formData.hargaBeli}
                  onChange={(e) => handleInputChange('hargaBeli', e.target.value)}
                  placeholder="Contoh: 15000000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => handleInputChange('vendor', e.target.value)}
                  placeholder="Contoh: PT. Teknologi Indonesia"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggalGaransiHabis">Tanggal Garansi Habis</Label>
                <Input
                  id="tanggalGaransiHabis"
                  type="date"
                  value={formData.tanggalGaransiHabis}
                  onChange={(e) => handleInputChange('tanggalGaransiHabis', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="catatan">Catatan</Label>
              <Textarea
                id="catatan"
                value={formData.catatan}
                onChange={(e) => handleInputChange('catatan', e.target.value)}
                placeholder="Tambahkan catatan tambahan tentang aset ini..."
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <Label>Upload Gambar Aset</Label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-64 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <span className="text-primary hover:underline">Klik untuk upload</span>
                    <span className="text-muted-foreground"> atau drag and drop</span>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-muted-foreground mt-2">PNG, JPG hingga 10MB</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" size="lg">
                {isEdit ? 'Perbarui Aset' : 'Simpan Aset'}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate('/assets')}>
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetForm;
