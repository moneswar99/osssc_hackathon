import React, { useState } from 'react';
import { Sprout, Loader2, Droplets, Clock, BarChart2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

interface CropRec {
  crop: string;
  period: string;
  water: string;
  difficulty: string;
  yield: string;
  market_demand: string;
  reason: string;
  icon: string;
}

const difficultyColor: Record<string, string> = {
  Low:    'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High:   'bg-red-100 text-red-700',
};

const demandColor: Record<string, string> = {
  'Very High': 'text-green-600',
  High:        'text-blue-600',
  Medium:      'text-yellow-600',
};

export default function CropAdvisorPage() {
  const [form, setForm] = useState({
    location: 'Guntur, Andhra Pradesh',
    soil_type: 'Black Cotton Soil',
    season: 'Kharif',
    water_availability: 'Medium',
    farm_size: 2,
    previous_crop: '',
  });
  const [results, setResults] = useState<CropRec[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'farm_size' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);
    try {
      const res = await api.getCropRecommendation(form) as { recommendations: CropRec[] };
      setResults(res.recommendations);
      setSubmitted(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const soilTypes = ['Black Cotton Soil', 'Red Loamy Soil', 'Alluvial Soil', 'Sandy Loam', 'Clay Soil', 'Laterite Soil'];
  const seasons = ['Kharif (Jun-Sep)', 'Rabi (Oct-Mar)', 'Zaid (Mar-Jun)'];
  const waterOptions = ['Low (rainfed)', 'Medium', 'High (irrigated)'];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-green-600" />
          Tell us about your farm
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Soil Type</label>
            <select name="soil_type" value={form.soil_type} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              {soilTypes.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Season</label>
            <select name="season" value={form.season} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              {seasons.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Water Availability</label>
            <select name="water_availability" value={form.water_availability} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              {waterOptions.map((w) => <option key={w}>{w}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Farm Size (acres)</label>
            <input type="number" name="farm_size" value={form.farm_size} min={0.5} step={0.5} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Previous Crop (optional)</label>
            <input name="previous_crop" value={form.previous_crop} onChange={handleChange} placeholder="e.g., Paddy" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Getting recommendations…</> : <><ArrowRight className="w-4 h-4" />Get AI Recommendations</>}
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {submitted && results.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Crop Recommendations</h3>
          <div className="space-y-4">
            {results.map((rec, i) => (
              <div key={rec.crop} className={`bg-white rounded-2xl p-5 shadow-sm border-2 ${i === 0 ? 'border-green-400' : 'border-gray-100'}`}>
                {i === 0 && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-2 inline-block">Top Recommendation</span>}
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{rec.icon === 'rice' ? '🌾' : rec.icon === 'plant' ? '🌱' : '🥜'}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-base">{rec.crop}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{rec.reason}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-600">{rec.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-xs text-gray-600">{rec.water}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-600">{rec.yield}</span>
                      </div>
                      <div>
                        <span className={`text-xs font-semibold ${difficultyColor[rec.difficulty] ?? ''} px-2 py-0.5 rounded-full`}>
                          {rec.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-xs text-gray-500">Market demand:</span>
                      <span className={`text-xs font-bold ${demandColor[rec.market_demand] ?? 'text-gray-600'}`}>{rec.market_demand}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
