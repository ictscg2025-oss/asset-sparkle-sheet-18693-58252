import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Asset } from '@/types/asset';
import * as XLSX from 'xlsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExportButtonProps {
  assets: Asset[];
}

export const ExportButton = ({ assets }: ExportButtonProps) => {
  const exportToCSV = () => {
    const headers = [
      'No Asset ACC',
      'Nama Aset',
      'Kategori',
      'Model/Tipe',
      'Nomor Seri',
      'Pengguna',
      'Departemen',
      'Status',
      'Tanggal Masuk',
      'Lokasi',
      'Harga Beli',
      'Vendor',
    ];

    const rows = assets.map((asset) => [
      asset.noAssetACC,
      asset.namaAset,
      asset.kategori,
      asset.modelTipe,
      asset.nomorSeri,
      asset.pengguna,
      asset.departemen,
      asset.status,
      asset.tanggalBarangMasuk,
      asset.lokasi || '-',
      asset.hargaBeli || '-',
      asset.vendor || '-',
    ]);

    const csvContent =
      headers.join(',') + '\n' + rows.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `assets_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      assets.map((asset) => ({
        'No Asset ACC': asset.noAssetACC,
        'Nama Aset': asset.namaAset,
        Kategori: asset.kategori,
        'Model/Tipe': asset.modelTipe,
        'Nomor Seri': asset.nomorSeri,
        Pengguna: asset.pengguna,
        Departemen: asset.departemen,
        Status: asset.status,
        'Tanggal Masuk': asset.tanggalBarangMasuk,
        Lokasi: asset.lokasi || '-',
        'Harga Beli': asset.hargaBeli || '-',
        Vendor: asset.vendor || '-',
        Catatan: asset.catatan || '-',
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets');
    XLSX.writeFile(workbook, `assets_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportToCSV}>
          Export to CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel}>
          Export to Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
