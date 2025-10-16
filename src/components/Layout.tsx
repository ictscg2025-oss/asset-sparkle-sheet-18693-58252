import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package2, LayoutDashboard, Package, LogOut, BarChart3, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/assets', icon: Package, label: 'Daftar Aset' },
    { path: '/reports', icon: BarChart3, label: 'Laporan' },
    { path: '/settings', icon: Settings, label: 'Pengaturan' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-soft">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary p-2 rounded-lg shadow-soft">
              <Package2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">IT Asset Management</span>
          </Link>
          
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Button
                  key={item.path}
                  variant={isActive ? 'default' : 'ghost'}
                  asChild
                  className={isActive ? 'shadow-soft' : ''}
                >
                  <Link to={item.path}>
                    <item.icon className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
            <Button variant="ghost" onClick={handleLogout} className="ml-2">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container py-6 px-4 text-center text-sm text-muted-foreground">
          © 2025 IT Asset Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
