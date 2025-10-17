export interface Asset {
  id: string;
  namaAset: string;
  noAssetACC: string;
  modelTipe: string;
  nomorSeri: string;
  pengguna: string;
  departemen: string;
  tanggalBarangMasuk: string;
  status: 'Aktif' | 'Rusak' | 'Dalam Perbaikan' | 'Dihapus';
  kategori: 'Laptop' | 'Printer' | 'Monitor' | 'PC Desktop' | 'Server' | 'Network Equipment' | 'Radio RIG' | 'Radio HT' | 'Lainnya';
  catatan?: string;
  urlGambar?: string;
  lokasi?: string;
  hargaBeli?: number;
  tanggalGaransiHabis?: string;
  vendor?: string;
  jadwalMaintenance?: string;
  lastMaintenance?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssetHistory {
  id: string;
  assetId: string;
  action: 'created' | 'updated' | 'deleted' | 'maintenance';
  changes?: string;
  timestamp: string;
  user?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
