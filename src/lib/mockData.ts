import { Asset } from '@/types/asset';

export const mockAssets: Asset[] = [
  {
    id: '1',
    namaAset: 'Dell Latitude 5420',
    noAssetACC: 'ACC-LPT-001',
    modelTipe: 'Latitude 5420',
    nomorSeri: 'DLL5420-2023-001',
    pengguna: 'Ahmad Rizki',
    departemen: 'IT Development',
    tanggalBarangMasuk: '2023-01-15',
    status: 'Aktif',
    kategori: 'Laptop',
    catatan: 'Laptop untuk development team',
  },
  {
    id: '2',
    namaAset: 'HP LaserJet Pro',
    noAssetACC: 'ACC-PRT-001',
    modelTipe: 'LaserJet Pro M404n',
    nomorSeri: 'HP404-2023-001',
    pengguna: 'Departemen HR',
    departemen: 'Human Resources',
    tanggalBarangMasuk: '2023-02-20',
    status: 'Aktif',
    kategori: 'Printer',
    catatan: 'Printer untuk dokumen HR',
  },
  {
    id: '3',
    namaAset: 'LG UltraWide 34"',
    noAssetACC: 'ACC-MON-001',
    modelTipe: '34WN80C-B',
    nomorSeri: 'LG34-2023-001',
    pengguna: 'Budi Santoso',
    departemen: 'Design',
    tanggalBarangMasuk: '2023-03-10',
    status: 'Aktif',
    kategori: 'Monitor',
    catatan: 'Monitor untuk graphic designer',
  },
  {
    id: '4',
    namaAset: 'Lenovo ThinkCentre',
    noAssetACC: 'ACC-PC-001',
    modelTipe: 'ThinkCentre M920',
    nomorSeri: 'LNV920-2023-001',
    pengguna: 'Siti Nurhaliza',
    departemen: 'Finance',
    tanggalBarangMasuk: '2023-04-05',
    status: 'Rusak',
    kategori: 'PC Desktop',
    catatan: 'Perlu penggantian hard drive',
  },
  {
    id: '5',
    namaAset: 'Cisco Catalyst 2960',
    noAssetACC: 'ACC-NET-001',
    modelTipe: 'Catalyst 2960-X',
    nomorSeri: 'CSC2960-2023-001',
    pengguna: 'Network Team',
    departemen: 'IT Infrastructure',
    tanggalBarangMasuk: '2023-05-12',
    status: 'Aktif',
    kategori: 'Network Equipment',
    catatan: 'Switch utama lantai 3',
  },
  {
    id: '6',
    namaAset: 'MacBook Pro 14"',
    noAssetACC: 'ACC-LPT-002',
    modelTipe: 'MacBook Pro M2',
    nomorSeri: 'MBLM2-2023-001',
    pengguna: 'Diana Putri',
    departemen: 'Marketing',
    tanggalBarangMasuk: '2023-06-18',
    status: 'Aktif',
    kategori: 'Laptop',
    catatan: 'Laptop untuk content creator',
  },
];

export const getDashboardStats = () => {
  const totalAssets = mockAssets.length;
  const activeAssets = mockAssets.filter(a => a.status === 'Aktif').length;
  const brokenAssets = mockAssets.filter(a => a.status === 'Rusak').length;
  const inRepairAssets = mockAssets.filter(a => a.status === 'Dalam Perbaikan').length;

  return {
    totalAssets,
    activeAssets,
    brokenAssets,
    inRepairAssets,
  };
};

export const getAssetsByCategory = () => {
  const categories = ['Laptop', 'Printer', 'Monitor', 'PC Desktop', 'Server', 'Network Equipment', 'Lainnya'];
  return categories.map(cat => ({
    category: cat,
    count: mockAssets.filter(a => a.kategori === cat).length,
  }));
};
