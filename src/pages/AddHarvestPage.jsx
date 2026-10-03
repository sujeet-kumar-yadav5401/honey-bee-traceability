import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Scale, Layers, Calendar, MapPin, Droplets, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FormInput, { SelectInput } from '../components/common/FormInput';

export const AddHarvestPage = () => {
  const { hives, addHarvest } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preselectedHive = searchParams.get('hiveId') || (hives[0]?.id || 'HIVE-001');

  const [formData, setFormData] = useState({
    hiveId: preselectedHive,
    harvestDate: new Date().toISOString().split('T')[0],
    honeyType: 'Wildflower Honey',
    quantity: 28,
    unit: 'KG',
    floralSource: 'Wild Mountain Blossom & Cardamom Flora',
    location: 'Coorg Apiary #1, Karnataka (12.4244° N, 75.7382° E)',
    moistureLevel: '17.9%',
    initialQuality: 'Grade A+ (Premium)',
    color: 'Deep Amber',
    notes: 'Frames fully capped. Cold uncapped with manual uncapping knife. Cold centrifuged extraction.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHiveChange = (e) => {
    const selectedHiveId = e.target.value;
    const found = hives.find(h => h.id === selectedHiveId);
    setFormData(prev => ({
      ...prev,
      hiveId: selectedHiveId,
      location: found ? found.location : prev.location
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdHarvest = addHarvest(formData);
    // Directly guide user to Create Honey Batch step pre-populated
    navigate(`/batches/create?harvestId=${createdHarvest.id}&type=${encodeURIComponent(formData.honeyType)}&qty=${formData.quantity}&hive=${formData.hiveId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      <div>
        <Link
          to="/harvest"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Harvest Logs</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column (2 spans) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              🍯
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Record Honey Harvest</h1>
              <p className="text-xs text-slate-500">Log raw extraction yield and initial botanical attributes</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectInput
                label="Source Hive"
                name="hiveId"
                value={formData.hiveId}
                onChange={handleHiveChange}
                options={hives.map(h => ({ value: h.id, label: `${h.id} — ${h.name}` }))}
                required
              />

              <FormInput
                type="date"
                label="Harvest Date"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectInput
                label="Honey Type"
                name="honeyType"
                value={formData.honeyType}
                onChange={handleChange}
                options={[
                  'Raw Honey',
                  'Wildflower Honey',
                  'Forest Honey',
                  'Acacia Honey',
                  'Multifloral Honey',
                  'Other'
                ]}
                required
              />

              <FormInput
                type="number"
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                helperText="Extracted yield"
              />

              <SelectInput
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                options={['KG', 'Liters', 'Grams']}
                required
              />
            </div>

            <FormInput
              label="Floral Source"
              name="floralSource"
              value={formData.floralSource}
              onChange={handleChange}
              required
              placeholder="e.g. Wildflower & Coffee Blossom"
            />

            <FormInput
              label="Extraction / Apiary Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Moisture Level (Refractometer %)"
                name="moistureLevel"
                value={formData.moistureLevel}
                onChange={handleChange}
                required
                placeholder="e.g. 17.8%"
                helperText="Below 19% prevents natural fermentation"
              />

              <SelectInput
                label="Initial Quality Grade"
                name="initialQuality"
                value={formData.initialQuality}
                onChange={handleChange}
                options={[
                  'Grade A+ (Premium)',
                  'Grade A (Standard Pure)',
                  'Grade B (Requires Settling)',
                  'Industrial Grade'
                ]}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Extraction Notes</label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
              />
            </div>

            {/* Action button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/harvest"
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Create Honey Batch</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Card Column (Requirement: Add a preview card) */}
        <div className="space-y-4">
          <div className="sticky top-24 bg-gradient-to-b from-amber-50/70 to-white rounded-2xl border-2 border-amber-300/80 p-6 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full inline-block mb-3">
              Live Harvest Preview
            </span>

            <div className="text-center py-4 border-b border-amber-200/60">
              <span className="text-4xl block mb-2">🍯</span>
              <h3 className="text-lg font-black text-slate-900">{formData.honeyType || 'Raw Honey'}</h3>
              <div className="text-2xl font-black text-amber-600 mt-1">
                {formData.quantity || 0} {formData.unit}
              </div>
            </div>

            <div className="space-y-3 py-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Layers size={13} className="text-amber-500" /> Source Hive:
                </span>
                <span className="font-mono font-bold text-slate-900">{formData.hiveId}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar size={13} className="text-amber-500" /> Harvest Date:
                </span>
                <span className="font-semibold text-slate-800">{formData.harvestDate}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Droplets size={13} className="text-blue-500" /> Moisture:
                </span>
                <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  {formData.moistureLevel}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <CheckCircle size={13} className="text-emerald-500" /> Quality Grade:
                </span>
                <span className="font-semibold text-emerald-700">{formData.initialQuality}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-200/60 text-[11px] text-slate-500">
              Clicking <strong>"Create Honey Batch"</strong> will package this harvest into a cryptographically anchored batch.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHarvestPage;
