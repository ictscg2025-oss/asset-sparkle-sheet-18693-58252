import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Download, Upload, Trash2, Settings as SettingsIcon } from 'lucide-react';
import { useAssets } from '@/context/AssetContext';

const Settings = () => {
  const { toast } = useToast();
  const { assets } = useAssets();

  const handleExportData = () => {
    const dataStr = JSON.stringify({ assets }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `itam_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    toast({
      title: 'Data Berhasil Diexport',
      description: 'Backup data telah didownload',
    });
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            localStorage.setItem('itam-assets', JSON.stringify(data.assets));
            toast({
              title: 'Data Berhasil Diimport',
              description: 'Silakan refresh halaman',
            });
          } catch (error) {
            toast({
              title: 'Import Gagal',
              description: 'File tidak valid',
              variant: 'destructive',
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
      localStorage.clear();
      toast({
        title: 'Data Berhasil Dihapus',
        description: 'Silakan refresh halaman',
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground mt-2">
          Kelola konfigurasi dan preferensi sistem
        </p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Preferensi Sistem
          </CardTitle>
          <CardDescription>
            Atur preferensi tampilan dan notifikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifikasi Email</Label>
              <p className="text-sm text-muted-foreground">
                Terima notifikasi untuk perubahan aset
              </p>
            </div>
            <Switch id="notifications" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-save">Auto-save</Label>
              <p className="text-sm text-muted-foreground">
                Simpan perubahan secara otomatis
              </p>
            </div>
            <Switch id="auto-save" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan tema gelap
              </p>
            </div>
            <Switch id="dark-mode" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Export, import, atau hapus data sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleExportData} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={handleImportData} variant="outline" className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Informasi Sistem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Total Aset:</span>
            <span className="font-semibold">{assets.length}</span>
          </div>
          <Separator />
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Versi:</span>
            <span className="font-semibold">1.0.0</span>
          </div>
          <Separator />
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-semibold">{new Date().toLocaleDateString('id-ID')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
