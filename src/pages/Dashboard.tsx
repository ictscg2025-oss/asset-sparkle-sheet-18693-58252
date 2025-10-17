import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAssets } from '@/context/AssetContext';
import { Package, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';

const Dashboard = () => {
  const { assets } = useAssets();
  
  const totalAssets = assets.length;
  const activeAssets = assets.filter(a => a.status === 'Aktif').length;
  const brokenAssets = assets.filter(a => a.status === 'Rusak').length;
  const inRepairAssets = assets.filter(a => a.status === 'Dalam Perbaikan').length;
  
  const stats = {
    totalAssets,
    activeAssets,
    brokenAssets,
    inRepairAssets,
  };
  
  const categories = ['Laptop', 'Printer', 'Monitor', 'PC Desktop', 'Server', 'Network Equipment', 'Radio RIG', 'Radio HT', 'Lainnya'];
  const categoryData = categories.map(cat => ({
    category: cat,
    count: assets.filter(a => a.kategori === cat).length,
  }));

  const statCards = [
    {
      title: 'Total Aset',
      value: stats.totalAssets,
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Aset Aktif',
      value: stats.activeAssets,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Aset Rusak',
      value: stats.brokenAssets,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Dalam Perbaikan',
      value: stats.inRepairAssets,
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Ringkasan dan statistik aset IT perusahaan
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Aset per Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-sm font-medium min-w-[140px]">{item.category}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(item.count / stats.totalAssets) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary ml-4">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
