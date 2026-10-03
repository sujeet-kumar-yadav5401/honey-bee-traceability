import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Layers, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FormInput, { SelectInput } from '../components/common/FormInput';

export const AddHivePage = () => {
  const { addHive, hives } = useApp();
  const navigate = useNavigate();

  const nextHiveNumber = hives.length + 1;
  const suggestedId = `HIVE-00${nextHiveNumber}`;

  const [formData, setFormData] = useState({
    id: suggestedId,
    name: `Coorg Hill Apiary #${nextHiveNumber}`,
    location: 'Madikeri, Coorg, Karnataka (12.4244° N, 75.7382° E)',
    state: 'Karnataka',
    beeSpecies: 'Apis mellifera (European Honeybee)',
    installationDate: new Date().toISOString().split('T')[0],
    colonyStrength: 'Strong',
    queenStatus: 'Laying Queen (Marked)',
    healthStatus: 'Healthy',
    framesCount: 10,
    notes: 'Installed in shaded orchard area with active seasonal wildflowers and water source.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = addHive(formData);
    navigate(`/hives/${created.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/hives"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to My Hives</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            🐝
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Add New Smart Hive</h1>
            <p className="text-xs text-slate-500">Register apiary colony with IoT telemetry parameters</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Hive ID"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              helperText="Unique identifier for telemetry sensors"
            />

            <FormInput
              label="Hive Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Coorg Apiary #6"
            />
          </div>

          <FormInput
            label="Location & GPS Coordinates"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g. Madikeri, Coorg, Karnataka"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectInput
              label="Bee Species"
              name="beeSpecies"
              value={formData.beeSpecies}
              onChange={handleChange}
              options={[
                'Apis mellifera (European Honeybee)',
                'Apis cerana indica (Indian Hive Bee)',
                'Apis dorsata (Giant Rock Bee Hybrid)',
                'Tetragonula iridipennis (Stingless Bee / Dammer Bee)'
              ]}
              required
            />

            <FormInput
              type="date"
              label="Installation Date"
              name="installationDate"
              value={formData.installationDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SelectInput
              label="Colony Strength"
              name="colonyStrength"
              value={formData.colonyStrength}
              onChange={handleChange}
              options={['Strong', 'Moderate', 'Developing', 'Weak']}
              required
            />

            <SelectInput
              label="Queen Status"
              name="queenStatus"
              value={formData.queenStatus}
              onChange={handleChange}
              options={[
                'Laying Queen (Marked)',
                'Laying Queen (Unmarked)',
                'Virgin Queen',
                'Supersedure In Progress',
                'Queenless'
              ]}
              required
            />

            <SelectInput
              label="Initial Health Status"
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              options={['Healthy', 'Attention Required', 'Inspection Due']}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Apiary Notes & Observations</label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
              placeholder="Record initial colony condition, brood pattern, and forage flora nearby..."
            />
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/hives')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Save size={15} />
              <span>Save Hive</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHivePage;
