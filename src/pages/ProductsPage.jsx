import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Search, Filter, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/cards/ProductCard';

export const ProductsPage = () => {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { key: 'ALL', label: 'All Products', icon: '🌱' },
    { key: 'Honey & Bee Products', label: 'Honey (Primary)', icon: '🍯' },
    { key: 'Cereals & Grains', label: 'Rice & Wheat', icon: '🌾' },
    { key: 'Plantation Crops', label: 'Coffee', icon: '☕' },
    { key: 'Spices & Herbs', label: 'Spices', icon: '🌶' },
    { key: 'Fruits & Horticulture', label: 'Mango / Fruits', icon: '🥭' },
    { key: 'Vegetables', label: 'Vegetables', icon: '🍅' },
  ];

  const filteredProducts = products.filter(prod => {
    const matchesCategory = selectedCategory === 'ALL' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Package size={20} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Agricultural Products</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Universal supply chain taxonomy • Honey primary system with full multi-crop extensible schema
          </p>
        </div>

        <Link
          to="/products/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>+ Add Product Category</span>
        </Link>
      </div>

      {/* Primary Honey Spotlight Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent border border-amber-300/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="text-3xl p-2.5 rounded-2xl bg-amber-500 text-slate-950 shadow-xs shrink-0">
            🍯
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                Primary Showcase Product
              </span>
              <span className="text-xs text-slate-500">• 28 Verified Batches</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Raw Forest & Smart Apiary Honey System
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Full palynological pollen profiling, moisture telemetry, and tamper-evident blockchain verification.
            </p>
          </div>
        </div>

        <Link
          to="/batches/create?category=Honey"
          className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all shrink-0 self-start md:self-auto shadow-xs"
        >
          Create Honey Batch
        </Link>
      </div>

      {/* Filter and Category Pills */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product, origin, or certified producer..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:border-amber-500 focus:outline-hidden shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
