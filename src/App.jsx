import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HivesPage from './pages/HivesPage';
import HiveDetailPage from './pages/HiveDetailPage';
import AddHivePage from './pages/AddHivePage';
import HarvestPage from './pages/HarvestPage';
import AddHarvestPage from './pages/AddHarvestPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import BatchesPage from './pages/BatchesPage';
import CreateBatchPage from './pages/CreateBatchPage';
import BatchDetailPage from './pages/BatchDetailPage';
import TraceabilityPage from './pages/TraceabilityPage';
import QRCodePage from './pages/QRCodePage';
import VerificationPage from './pages/VerificationPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public standalone pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify/:batchId" element={<VerificationPage />} />

          {/* Authenticated / Dashboard Layout routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Hive Management */}
            <Route path="/hives" element={<HivesPage />} />
            <Route path="/hives/create" element={<AddHivePage />} />
            <Route path="/hives/:id" element={<HiveDetailPage />} />

            {/* Honey Harvest */}
            <Route path="/harvest" element={<HarvestPage />} />
            <Route path="/harvest/create" element={<AddHarvestPage />} />

            {/* Products (Honey + Multi-Crop) */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/create" element={<AddProductPage />} />

            {/* Batches */}
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/batches/create" element={<CreateBatchPage />} />
            <Route path="/batches/:id" element={<BatchDetailPage />} />

            {/* Traceability & QR */}
            <Route path="/traceability" element={<TraceabilityPage />} />
            <Route path="/qr" element={<QRCodePage />} />
            <Route path="/verification" element={<VerificationPage />} />

            {/* Admin & Profile */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
