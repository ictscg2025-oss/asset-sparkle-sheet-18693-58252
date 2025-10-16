import { QRCodeSVG } from 'qrcode.react';
import { Asset } from '@/types/asset';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface QRCodeDialogProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QRCodeDialog = ({ asset, open, onOpenChange }: QRCodeDialogProps) => {
  if (!asset) return null;

  const assetData = JSON.stringify({
    id: asset.id,
    name: asset.namaAset,
    acc: asset.noAssetACC,
    serial: asset.nomorSeri,
  });

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `QR_${asset.noAssetACC}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code - {asset.namaAset}</DialogTitle>
          <DialogDescription>
            Scan QR code ini untuk melihat detail aset
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG id="qr-code-svg" value={assetData} size={256} level="H" />
          </div>
          <div className="text-center space-y-1">
            <p className="font-semibold">{asset.noAssetACC}</p>
            <p className="text-sm text-muted-foreground">{asset.nomorSeri}</p>
          </div>
          <Button onClick={downloadQRCode} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
