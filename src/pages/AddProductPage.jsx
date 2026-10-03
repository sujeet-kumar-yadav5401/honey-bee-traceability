import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Package, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FormInput, { SelectInput } from '../components/common/FormInput';

export const AddProductPage = () => {
  const { products } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: `PROD-NEW-${Date.now().toString().slice(-4)}`,
    category: 'Honey & Bee Products',
    icon: '🍯',
    name: '',
    producer: 'Regional Agricultural Cooperative',
    origin: 'Karnataka, India',
    description: '',
    standardsText: 'FSSAI Certified, NABL Lab Tested',
    badge: 'New Standard'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    let icon = '🌱';
    if (cat.includes('Honey')) icon = '🍯';
    else if (cat.includes('Grain') || cat.includes('Cereals')) icon = '🌾';
    else if (cat.includes('Coffee')) icon = '☕';
    else if (cat.includes('Spices')) icon = '🌶';
    else if (cat.includes('Fruit')) icon = '🥭';
    else if (cat.includes('Vegetable')) icon = '🍅';

    setFormData(prev => ({ ...prev, category: cat, icon }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate back to products
    navigate('/products');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Agricultural Products</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xl">
            {formData.icon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Add Agricultural Product</h1>
            <p className="text-xs text-slate-500">Configure new commodity or botanical profile for blockchain batch registration</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectInput
              label="Product Category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              options={[
                'Honey & Bee Products',
                'Cereals & Grains',
                'Plantation Crops',
                'Spices & Herbs',
                'Fruits & Horticulture',
                'Vegetables'
              ]}
              required
            />

            <FormInput
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Raw Acacia Blossom Honey"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Certified Producer / Cooperative"
              name="producer"
              value={formData.producer}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Geographical Origin / Soil Zone"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description & Provenance Standards</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-hidden"
              placeholder="Detailed description of farming method, chemical-free guarantees, or harvesting approach..."
            />
          </div>

          <FormInput
            label="Quality Certifications & Standards (comma separated)"
            name="standardsText"
            value={formData.standardsText}
            onChange={handleChange}
            placeholder="e.g. FSSAI, Agmark Grade A, Jaivik Bharat"
          />

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Save size={15} />
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
