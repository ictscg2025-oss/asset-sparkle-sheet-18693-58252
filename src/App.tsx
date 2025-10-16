import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AssetProvider } from "@/context/AssetContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AssetListAdvanced from "./pages/AssetListAdvanced";
import AssetDetail from "./pages/AssetDetail";
import AssetForm from "./pages/AssetForm";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AssetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/assets" element={<Layout><AssetListAdvanced /></Layout>} />
            <Route path="/assets/new" element={<Layout><AssetForm /></Layout>} />
            <Route path="/assets/:id" element={<Layout><AssetDetail /></Layout>} />
            <Route path="/assets/:id/edit" element={<Layout><AssetForm /></Layout>} />
            <Route path="/reports" element={<Layout><Reports /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AssetProvider>
  </QueryClientProvider>
);

export default App;
