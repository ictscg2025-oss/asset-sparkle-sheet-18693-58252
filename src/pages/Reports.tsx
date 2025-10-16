import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAssets } from '@/context/AssetContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, Package, AlertTriangle } from 'lucide-react';

const Reports = () => {
  const { assets } = useAssets();

  const categoryData = ['Laptop', 'Printer', 'Monitor', 'PC Desktop', 'Server', 'Network Equipment', 'Lainnya'].map(cat => ({
    name: cat,
    count: assets.filter(a => a.kategori === cat).length,
  }));

  const statusData = [
    { name: 'Aktif', value: assets.filter(a => a.status === 'Aktif').length, color: '#22c55e' },
    { name: 'Rusak', value: assets.filter(a => a.status === 'Rusak').length, color: '#ef4444' },
    { name: 'Dalam Perbaikan', value: assets.filter(a => a.status === 'Dalam Perbaikan').length, color: '#f97316' },
  ];

  const departmentData = Array.from(new Set(assets.map(a => a.departemen))).map(dept => ({
    name: dept,
    count: assets.filter(a => a.departemen === dept).length,
  }));

  const totalValue = assets.reduce((sum, asset) => sum + (asset.hargaBeli || 0), 0);
  const avgValue = totalValue / (assets.length || 1);

  const statCards = [
    {
      title: 'Total Nilai Aset',
      value: `Rp ${totalValue.toLocaleString('id-ID')}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Rata-rata Nilai',
      value: `Rp ${avgValue.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Aset',
      value: assets.length,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Perlu Perhatian',
      value: assets.filter(a => a.status !== 'Aktif').length,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Laporan & Analisis</h1>
        <p className="text-muted-foreground mt-2">
          Visualisasi data dan statistik aset perusahaan
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Aset per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Status Aset</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft md:col-span-2">
          <CardHeader>
            <CardTitle>Aset per Departemen</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
