import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Boxes,
  Layers,
  Flame,
  ShieldCheck,
  Package,
  Blocks,
  Cpu,
  Info,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import FormInput, { SelectInput } from '../components/common/FormInput';

export const CreateBatchPage = () => {
  const { hives, addBatch, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State across all 6 steps
  const [batchData, setBatchData] = useState({
    // Step 1: Product selection
    productCategory: searchParams.get('category') || 'Honey',
    product: searchParams.get('type') || 'Raw Wildflower Honey',

    // Step 2: Production Information (Honey vs Agri)
    hiveId: searchParams.get('hive') || 'HIVE-001',
    beeSpecies: 'Apis mellifera (European Honeybee)',
    honeyType: searchParams.get('type') || 'Wildflower Honey',
    floralSource: 'Wild Mountain Blossom & Forest Flora',
    harvestLocation: 'Coorg Apiaries, Karnataka, India (12.4244° N, 75.7382° E)',
    origin: 'Madikeri, Coorg, Karnataka, India',
    producer: currentUser?.name || 'Sujeet Kumar Yadav (Certified Beekeeper)',
    harvestDate: new Date().toISOString().split('T')[0],
    quantity: searchParams.get('qty') ? `${searchParams.get('qty')} KG` : '35 KG',
    quantityNum: Number(searchParams.get('qty')) || 35,

    // Step 3: Processing Information
    processingFacility: 'Coorg Natural Processing Facility #1',
    processingMethod: 'Cold Settling & Gentle Micro-Mesh Filtration (<38°C)',
    processingDate: new Date().toISOString().split('T')[0],
    extractionTechnique: 'Centrifugal cold extraction without boiling',

    // Step 4: Quality Information
    moistureLevel: '17.8%',
    qualityGrade: 'Grade A+ (Premium Pure)',
    pollenCount: '46,000 grains/g',
    c4SugarAdulteration: 'Negative (<1.5% delta 13C)',
    hpmfIndex: '7.4 mg/kg (Freshness Guarantee)',
    antibioticResidue: 'ND (Not Detected)',
    testingLab: 'NABL Accredited Southern Regional Food Quality Lab',

    // Step 5: Packaging Information
    packagingType: '500g Food-Grade Hexagonal Glass Jars with Tamper Seal',
    unitCount: '70 Units',
    storageConditions: 'Cool dry ambient (18-24°C), Dark storage',
    packagingDate: new Date().toISOString().split('T')[0],
    barcodeBatchNumber: `AGRI-LOT-${Date.now().toString().slice(-6)}`,

    // Step 6: Blockchain parameters preview
    simulatedNetwork: 'AgriTrace Consortium Ledger (Prototype)',
    smartContract: '0xAgriTraceHoneyRegistryV2_09A1'
  });

  const productOptions = [
    { key: 'Honey', label: 'Honey', icon: '🍯', subtitle: 'Raw Forest & Apiary Honey (Primary Deep Detail)' },
    { key: 'Rice', label: 'Rice', icon: '🌾', subtitle: 'Organic Sona Masoori & Basmati' },
    { key: 'Wheat', label: 'Wheat', icon: '🌾', subtitle: 'Sharbati High-Gluten Grains' },
    { key: 'Coffee', label: 'Coffee', icon: '☕', subtitle: 'Single Origin Wayanad Arabica' },
    { key: 'Spices', label: 'Spices', icon: '🌶', subtitle: 'Malabar Black Pepper & Cardamom' },
    { key: 'Fruit', label: 'Fruit', icon: '🥭', subtitle: 'GI-Tagged Alphonso Mangoes' },
    { key: 'Vegetable', label: 'Vegetable', icon: '🍅', subtitle: 'Greenhouse Vine Tomatoes & Potatoes' }
  ];

  const isHoney = batchData.productCategory === 'Honey';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (catKey, label) => {
    let defaultProductName = 'Raw Wildflower Honey';
    if (catKey === 'Rice') defaultProductName = 'Organic Sona Masoori Rice';
    else if (catKey === 'Wheat') defaultProductName = 'Sharbati Golden Whole Wheat';
    else if (catKey === 'Coffee') defaultProductName = 'Single Origin Arabica Specialty Coffee';
    else if (catKey === 'Spices') defaultProductName = 'Malabar Extra Bold Black Pepper';
    else if (catKey === 'Fruit') defaultProductName = 'GI-Tagged Alphonso Table Mangoes';
    else if (catKey === 'Vegetable') defaultProductName = 'Protected Greenhouse Vine Tomatoes';

    setBatchData(prev => ({
      ...prev,
      productCategory: catKey,
      product: defaultProductName
    }));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleGenerateBatch = () => {
    const createdBatch = addBatch(batchData);
    navigate(`/batches/${createdBatch.id}`);
  };

  const stepsHeader = [
    { num: 1, title: 'Select Product' },
    { num: 2, title: 'Production' },
    { num: 3, title: 'Processing' },
    { num: 4, title: 'Quality & Lab' },
    { num: 5, title: 'Packaging' },
    { num: 6, title: 'Blockchain Preview' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/batches"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Batches</span>
        </Link>
      </div>

      {/* Main wizard card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8">
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Multi-Step Batch Wizard • Step {currentStep} of 6
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {stepsHeader[currentStep - 1].title}
              </h1>
            </div>
            <span className="text-xs font-semibold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
              {batchData.productCategory} Batch
            </span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-6 gap-2 mt-4">
            {stepsHeader.map((s) => (
              <div key={s.num} className="space-y-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s.num < currentStep
                      ? 'bg-emerald-500'
                      : s.num === currentStep
                      ? 'bg-amber-500'
                      : 'bg-slate-200'
                  }`}
                />
                <span
                  className={`hidden sm:block text-[10px] font-semibold truncate ${
                    s.num === currentStep ? 'text-amber-600' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: Select Product */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-slate-600">
              Choose the primary agricultural commodity for this traceability lot. Honey includes deep IoT hive biology; others utilize universal agronomic fields.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {productOptions.map((opt) => {
                const isSelected = batchData.productCategory === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => handleProductSelect(opt.key, opt.label)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/60 ring-4 ring-amber-500/10 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl p-2 rounded-xl bg-slate-100">{opt.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{opt.label}</h4>
                        {opt.key === 'Honey' && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-200/70 px-1.5 py-0.2 rounded-md">
                            Primary System
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{opt.subtitle}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <FormInput
                label="Product Variant Name"
                name="product"
                value={batchData.product}
                onChange={handleChange}
                placeholder="e.g. Raw Forest Acacia Honey"
                required
              />
            </div>
          </div>
        )}

        {/* STEP 2: Production Information */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-slate-600">
              {isHoney
                ? 'Enter IoT Smart Hive details, bee taxonomy, and botanical nectar source.'
                : 'Enter farm plot identifier, grower credentials, and soil zone provenance.'}
            </p>

            {isHoney ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectInput
                    label="Source Hive ID"
                    name="hiveId"
                    value={batchData.hiveId}
                    onChange={handleChange}
                    options={hives.map(h => ({ value: h.id, label: `${h.id} — ${h.name}` }))}
                    required
                  />

                  <SelectInput
                    label="Bee Species"
                    name="beeSpecies"
                    value={batchData.beeSpecies}
                    onChange={handleChange}
                    options={[
                      'Apis mellifera (European Honeybee)',
                      'Apis cerana indica (Indian Hive Bee)',
                      'Apis dorsata / mellifera hybrid reserve',
                      'Tetragonula iridipennis (Stingless Bee)'
                    ]}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectInput
                    label="Honey Type"
                    name="honeyType"
                    value={batchData.honeyType}
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
                    label="Primary Floral Source"
                    name="floralSource"
                    value={batchData.floralSource}
                    onChange={handleChange}
                    placeholder="e.g. Coorg Coffee Blossom & Forest Wildflowers"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Moisture Level at Harvest (%)"
                    name="moistureLevel"
                    value={batchData.moistureLevel}
                    onChange={handleChange}
                    placeholder="e.g. 17.8%"
                    required
                  />

                  <FormInput
                    label="Harvest Location & Coordinates"
                    name="harvestLocation"
                    value={batchData.harvestLocation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Field / Plot / Orchard Identifier"
                    name="hiveId"
                    value={batchData.hiveId}
                    onChange={handleChange}
                    placeholder="e.g. Plot #KM-48 (Canal Fed)"
                    required
                  />
                  <FormInput
                    label="Crop Variety / Cultivar"
                    name="honeyType"
                    value={batchData.honeyType}
                    onChange={handleChange}
                    placeholder="e.g. Sona Masoori Organic / Arabica SLN9"
                    required
                  />
                </div>
                <FormInput
                  label="Farm Location & Agro-Climatic Zone"
                  name="harvestLocation"
                  value={batchData.harvestLocation}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormInput
                label="Certified Producer / Farmer"
                name="producer"
                value={batchData.producer}
                onChange={handleChange}
                required
              />

              <FormInput
                type="date"
                label="Harvest Date"
                name="harvestDate"
                value={batchData.harvestDate}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Quantity / Net Mass"
                name="quantity"
                value={batchData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 3: Processing Information */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-slate-600">
              Document post-harvest handling, cold extraction parameters, and facility temperature logs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Processing Facility / Extraction Hub"
                name="processingFacility"
                value={batchData.processingFacility}
                onChange={handleChange}
                required
              />

              <FormInput
                type="date"
                label="Processing Date"
                name="processingDate"
                value={batchData.processingDate}
                onChange={handleChange}
                required
              />
            </div>

            <SelectInput
              label="Primary Processing Method"
              name="processingMethod"
              value={batchData.processingMethod}
              onChange={handleChange}
              options={[
                'Cold Settling & Gentle Micro-Mesh Filtration (<38°C)',
                'Gravity Clarified Raw Settling (Unheated)',
                'Sun-Dried & Modern Rubber-Roll De-husking (Grains)',
                'Wet-Washed & Raised Bed Solar Drying (Coffee)',
                'Blanched & Solar Tunnel Dehydrated (Spices)',
                'Natural Hay Bedding Ethylene Ripening (Fruits)'
              ]}
              required
            />

            <FormInput
              label="Extraction Technique & Temperature Safeguards"
              name="extractionTechnique"
              value={batchData.extractionTechnique}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* STEP 4: Quality Information */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-slate-600">
              NABL accredited laboratory parameters proving pure provenance and zero adulteration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectInput
                label="Quality Grade"
                name="qualityGrade"
                value={batchData.qualityGrade}
                onChange={handleChange}
                options={[
                  'Grade A+ (Premium Pure)',
                  'Grade A (Special Export Grade)',
                  'Grade A (Standard Food Grade)',
                  'GI Certified Table Grade 1'
                ]}
                required
              />

              <FormInput
                label="Certified Testing Laboratory"
                name="testingLab"
                value={batchData.testingLab}
                onChange={handleChange}
                required
              />
            </div>

            {isHoney ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="C4 Sugar Adulteration (Carbon-13 Isotope)"
                  name="c4SugarAdulteration"
                  value={batchData.c4SugarAdulteration}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="HMF Freshness Index (Hydroxymethylfurfural)"
                  name="hpmfIndex"
                  value={batchData.hpmfIndex}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Pollen Signature / Palynology Analysis"
                  name="pollenCount"
                  value={batchData.pollenCount}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Antibiotic / Synthetic Residue"
                  name="antibioticResidue"
                  value={batchData.antibioticResidue}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Chemical Pesticide Residue Analysis"
                  name="antibioticResidue"
                  value="Zero Chemical Residue (<0.01 mg/kg)"
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Moisture Content"
                  name="moistureLevel"
                  value={batchData.moistureLevel}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Packaging Information */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-slate-600">
              Hermetic retail container serialization and warehouse logistics conditions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Packaging Type & Spec"
                name="packagingType"
                value={batchData.packagingType}
                onChange={handleChange}
                placeholder="e.g. 500g Food-Grade Hexagonal Glass Jars"
                required
              />

              <FormInput
                label="Units Packed"
                name="unitCount"
                value={batchData.unitCount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                type="date"
                label="Packaging Date"
                name="packagingDate"
                value={batchData.packagingDate}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Storage & Humidity Conditions"
                name="storageConditions"
                value={batchData.storageConditions}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 6: Blockchain Preview */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-fade-in">
            <div className="p-4 bg-indigo-950 text-white rounded-2xl border border-indigo-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-900">
                <div className="flex items-center gap-2">
                  <Blocks size={20} className="text-indigo-400" />
                  <span className="font-bold text-sm">Blockchain Ledger Anchor Preview</span>
                </div>
                <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                  Prototype Mode
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Product Batch:</span>
                  <span className="font-bold text-amber-300">{batchData.product} ({batchData.quantity})</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Producer:</span>
                  <span className="text-slate-200">{batchData.producer}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Origin:</span>
                  <span className="text-slate-200">{batchData.origin}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Quality Grade:</span>
                  <span className="text-emerald-400 font-bold">{batchData.qualityGrade}</span>
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl font-mono text-[11px] text-indigo-300 space-y-1">
                <div>// Cryptographic SHA-256 Digest will be generated for:</div>
                <div className="text-slate-400 truncate">
                  SHA256({batchData.product} + {batchData.producer} + {batchData.harvestDate} + {batchData.moistureLevel})
                </div>
                <div className="text-emerald-400 pt-1">
                  ✓ Ready to anchor on {batchData.simulatedNetwork}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Demonstration Note:</strong> Submitting will commit this batch with simulated transaction hash, block height, and generate the consumer QR verification code.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
              currentStep === 1
                ? 'opacity-0 pointer-events-none'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            Previous
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerateBatch}
              className="px-8 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Generate Product Batch</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBatchPage;
