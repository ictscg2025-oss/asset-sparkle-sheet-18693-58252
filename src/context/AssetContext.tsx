import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Asset, AssetHistory } from '@/types/asset';
import { mockAssets } from '@/lib/mockData';

interface AssetContextType {
  assets: Asset[];
  history: AssetHistory[];
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (id: string, asset: Omit<Asset, 'id'>) => void;
  deleteAsset: (id: string) => void;
  bulkDeleteAssets: (ids: string[]) => void;
  bulkUpdateStatus: (ids: string[], status: Asset['status']) => void;
  getAssetById: (id: string) => Asset | undefined;
  getAssetHistory: (id: string) => AssetHistory[];
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<Asset[]>(() => {
    const stored = localStorage.getItem('itam-assets');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored assets:', e);
        return mockAssets;
      }
    }
    return mockAssets;
  });

  const [history, setHistory] = useState<AssetHistory[]>(() => {
    const stored = localStorage.getItem('itam-history');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('itam-assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('itam-history', JSON.stringify(history));
  }, [history]);

  const addHistory = (assetId: string, action: AssetHistory['action'], changes?: string) => {
    const newHistory: AssetHistory = {
      id: Date.now().toString(),
      assetId,
      action,
      changes,
      timestamp: new Date().toISOString(),
      user: 'Current User',
    };
    setHistory((prev) => [...prev, newHistory]);
  };

  const addAsset = (assetData: Omit<Asset, 'id'>) => {
    const now = new Date().toISOString();
    const newAsset: Asset = {
      ...assetData,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    setAssets((prev) => [...prev, newAsset]);
    addHistory(newAsset.id, 'created', `Asset ${newAsset.namaAset} created`);
  };

  const updateAsset = (id: string, assetData: Omit<Asset, 'id'>) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === id ? { ...assetData, id, updatedAt: new Date().toISOString() } : asset
      )
    );
    addHistory(id, 'updated', `Asset updated`);
  };

  const deleteAsset = (id: string) => {
    const asset = assets.find(a => a.id === id);
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
    if (asset) {
      addHistory(id, 'deleted', `Asset ${asset.namaAset} deleted`);
    }
  };

  const bulkDeleteAssets = (ids: string[]) => {
    setAssets((prev) => prev.filter((asset) => !ids.includes(asset.id)));
    ids.forEach(id => {
      const asset = assets.find(a => a.id === id);
      if (asset) {
        addHistory(id, 'deleted', `Bulk delete: ${asset.namaAset}`);
      }
    });
  };

  const bulkUpdateStatus = (ids: string[], status: Asset['status']) => {
    setAssets((prev) =>
      prev.map((asset) =>
        ids.includes(asset.id) ? { ...asset, status, updatedAt: new Date().toISOString() } : asset
      )
    );
    ids.forEach(id => {
      addHistory(id, 'updated', `Status changed to ${status}`);
    });
  };

  const getAssetById = (id: string) => {
    return assets.find((asset) => asset.id === id);
  };

  const getAssetHistory = (id: string) => {
    return history.filter((h) => h.assetId === id).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  return (
    <AssetContext.Provider
      value={{
        assets,
        history,
        addAsset,
        updateAsset,
        deleteAsset,
        bulkDeleteAssets,
        bulkUpdateStatus,
        getAssetById,
        getAssetHistory,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within AssetProvider');
  }
  return context;
};
