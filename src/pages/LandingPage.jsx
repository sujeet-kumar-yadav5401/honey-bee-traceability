import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Layers,
  Sparkles,
  QrCode,
  ArrowRight,
  Search,
  CheckCircle2,
  Activity,
  Flame,
  Package,
  Blocks,
  Award,
  Globe,
  Users,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage = () => {
  const [quickBatchInput, setQuickBatchInput] = useState('');
  const navigate = useNavigate();
  const { batches } = useApp();

  const handleQuickVerify = (e) => {
    e.preventDefault();
    if (quickBatchInput.trim()) {
      navigate(`/verification?batch=${encodeURIComponent(quickBatchInput.trim())}`);
    } else {
      navigate('/verification');
    }
  };

  const workflowSteps = [
    { title: 'Hive', desc: 'IoT acoustic & thermal telemetry monitoring colony health', icon: Layers, color: 'text-amber-500 bg-amber-50' },
    { title: 'Harvest', desc: 'Beekeeper records floral source, moisture & quantity', icon: Sparkles, color: 'text-yellow-600 bg-yellow-50' },
    { title: 'Processing', desc: 'Raw settling & gentle cold micro-filtration at certified hubs', icon: Flame, color: 'text-orange-500 bg-orange-50' },
    { title: 'Packaging', desc: 'Hermetic jars & tamper-evident RFID serialization', icon: Package, color: 'text-blue-500 bg-blue-50' },
    { title: 'Blockchain', desc: 'Cryptographic SHA-256 hash anchored into immutable block', icon: Blocks, color: 'text-indigo-500 bg-indigo-50' },
    { title: 'QR Code', desc: 'Dynamic encrypted QR code generated for retail jars', icon: QrCode, color: 'text-purple-500 bg-purple-50' },
    { title: 'Customer', desc: 'Instant smartphone scanning proves purity & zero adulteration', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
  ];

  const features = [
    {
      title: 'Smart Hive Management',
      desc: 'Real-time sensor monitoring of brood temperatures, weight gain, queen status, and scheduled health inspections.',
      icon: Layers,
      color: 'amber'
    },
    {
      title: 'Honey Traceability',
      desc: 'Follow the raw honey journey from high-altitude Coorg apiaries to retail store shelves with verifiable provenance.',
      icon: Sparkles,
      color: 'yellow'
    },
    {
      title: 'Blockchain Verification',
      desc: 'Decentralized consortium ledger guarantees tamper-evident records, preventing syrup adulteration and fraudulent origins.',
      icon: Blocks,
      color: 'indigo'
    },
    {
      title: 'QR Product Verification',
      desc: 'Shoppers scan on-pack QR codes to view certified lab moisture tests, floral pollen signatures, and harvest timestamps.',
      icon: QrCode,
      color: 'emerald'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* Navigation bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-xl shadow-xs">
              🐝
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                AgriTrace <span className="text-amber-600">Platform</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-400 ml-2 font-mono">
                Smart Honey & Agro Traceability
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/verification"
              className="text-xs font-semibold text-slate-700 hover:text-amber-600 px-3 py-2 rounded-lg transition-colors hidden sm:block"
            >
              Verify Product
            </Link>
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Glow & Backdrop elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-100/60 via-amber-50/20 to-transparent pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-6 border border-amber-300 shadow-2xs">
            <span className="text-base">🌱</span>
            <span>Blockchain-Powered Smart Agricultural Provenance</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-amber-700 font-medium">College Project Prototype</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Blockchain-Based <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">Honey Traceability</span> & Smart Beekeeping
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Track every stage of your honey journey — from hive to customer with transparent, tamper-evident traceability and smart IoT hive health telemetry.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Dashboard</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/verification"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <QrCode size={16} className="text-amber-600" />
              <span>Verify Product</span>
            </Link>
          </div>

          {/* Quick Demo Batch Verifier Bar */}
          <div className="mt-12 max-w-xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200 shadow-md">
            <form onSubmit={handleQuickVerify} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={quickBatchInput}
                  onChange={(e) => setQuickBatchInput(e.target.value)}
                  placeholder="Enter Batch ID (e.g. HNY-2026-001)"
                  className="w-full pl-10 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck size={14} />
                <span>Verify Now</span>
              </button>
            </form>
            <div className="mt-2 text-left text-[11px] text-slate-400 px-2 flex flex-wrap items-center gap-1.5">
              <span>Try demo batches:</span>
              <button
                type="button"
                onClick={() => setQuickBatchInput('HNY-2026-001')}
                className="text-amber-600 hover:underline font-mono"
              >
                HNY-2026-001 (Honey)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setQuickBatchInput('RICE-2026-001')}
                className="text-amber-600 hover:underline font-mono"
              >
                RICE-2026-001 (Rice)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setQuickBatchInput('INVALID-001')}
                className="text-rose-500 hover:underline font-mono"
              >
                INVALID-001 (Fail test)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section: Hive -> Customer */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">End-to-End Traceability</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              From Hive to Customer Hands
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Every critical lifecycle transition is registered with cryptographic authenticity
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group hover:bg-amber-50/50 hover:border-amber-200 transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-2xs ${step.color}`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 mb-0.5">0{idx + 1}</span>
                  <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-3">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Key Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Smart Platform Built for College Demonstration
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Combining beekeeping biology, IoT sensor telemetry, and consortium blockchain principles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                    <span>Explore module</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Multi-Crop Architecture Showcase */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Multi-Product Agricultural Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight">
                Honey First, Scalable to Any Farm Harvest
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                While Smart Beekeeping and Honey Traceability are deeply detailed, the platform's modular schema handles grains, coffee micro-lots, GI-tagged fruits, and spices with zero structural code changes.
              </p>

              {/* Supported crop badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-lg text-xs font-semibold">
                  🍯 Raw Honey (Deep Detailed)
                </span>
                <span className="px-3 py-1 bg-white/10 text-slate-200 rounded-lg text-xs font-semibold">
                  🌾 Organic Rice
                </span>
                <span className="px-3 py-1 bg-white/10 text-slate-200 rounded-lg text-xs font-semibold">
                  🌾 Sharbati Wheat
                </span>
                <span className="px-3 py-1 bg-white/10 text-slate-200 rounded-lg text-xs font-semibold">
                  ☕ Wayanad Coffee
                </span>
                <span className="px-3 py-1 bg-white/10 text-slate-200 rounded-lg text-xs font-semibold">
                  🌶 Malabar Spices
                </span>
                <span className="px-3 py-1 bg-white/10 text-slate-200 rounded-lg text-xs font-semibold">
                  🥭 Alphonso Mango
                </span>
                <span className="px-3 py-1 bg-white/10 text-slate-200 rounded-lg text-xs font-semibold">
                  🍅 Hydroponic Tomato
                </span>
              </div>

              <div className="mt-8 flex gap-3">
                <Link
                  to="/products"
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm"
                >
                  View Agricultural Catalog
                </Link>
                <Link
                  to="/batches"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
                >
                  Explore Batches
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-xs text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <span>🐝 AgriTrace Platform</span>
            <span className="text-slate-500 font-normal">| College Project Prototype</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/verification" className="hover:text-white">QR Verification</Link>
            <Link to="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
