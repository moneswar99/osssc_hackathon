import React, { useState } from 'react';
import {
  User, MapPin, Phone, Layers, Droplets, Sprout,
  Edit2, Save, X, Award, Bot, FileText, Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { FarmerProfile } from '../types';

const DEMO_PROFILE: FarmerProfile = {
  id: 'F001',
  name: 'Ravi Kumar',
  village: 'Pedapudi',
  district: 'Guntur',
  state: 'Andhra Pradesh',
  phone: '+91 98765 43210',
  farm_size: 3.5,
  soil_type: 'Black Cotton Soil',
  current_crops: ['Cotton', 'Paddy'],
  irrigation_type: 'Drip + Flood',
  preferred_language: 'te',
  member_since: '2024-01-15',
  total_recommendations: 47,
  schemes_enrolled: 3,
};

const soilTypes = ['Black Cotton Soil', 'Red Loamy Soil', 'Alluvial Soil', 'Sandy Loam', 'Clay Soil', 'Laterite Soil'];
const irrigationTypes = ['Drip', 'Flood / Surface', 'Drip + Flood', 'Sprinkler', 'Rainfed (No Irrigation)'];
const languageOptions = [{ value: 'en', label: 'English' }, { value: 'te', label: 'Telugu (తెలుగు)' }, { value: 'hi', label: 'Hindi (हिंदी)' }];
const cropOptions = ['Cotton', 'Paddy', 'Groundnut', 'Chilli', 'Maize', 'Turmeric', 'Sugarcane', 'Sunflower', 'Jowar', 'Soybean'];

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-green-600" />
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm font-semibold text-gray-900 mt-0.5">{value}</div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { profile: ctxProfile, setProfile: setCtxProfile, setLanguage } = useApp();
  const profileData = ctxProfile ?? DEMO_PROFILE;

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<FarmerProfile>(profileData);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'farm_size' ? parseFloat(value) || 0 : value }));
  };

  const toggleCrop = (crop: string) => {
    setForm(prev => ({
      ...prev,
      current_crops: prev.current_crops.includes(crop)
        ? prev.current_crops.filter(c => c !== crop)
        : [...prev.current_crops, crop],
    }));
  };

  const handleSave = () => {
    setCtxProfile(form);
    if (form.preferred_language === 'en' || form.preferred_language === 'te' || form.preferred_language === 'hi') {
      setLanguage(form.preferred_language);
    }
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm(profileData);
    setEditing(false);
  };

  const displayProfile = editing ? form : profileData;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Save banner */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2 text-green-800 text-sm">
          <Save className="w-4 h-4" /> Profile saved successfully.
        </div>
      )}

      {/* Profile hero card */}
      <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
            🧑‍🌾
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate">{displayProfile.name}</h2>
            <p className="text-green-200 text-sm">{displayProfile.village}, {displayProfile.district}, {displayProfile.state}</p>
            <p className="text-green-300 text-xs mt-1">Member since {new Date(displayProfile.member_since).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
              aria-label="Edit profile"
            >
              <Edit2 className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-green-500/40">
          <div className="text-center">
            <div className="text-xl font-bold">{displayProfile.farm_size}</div>
            <div className="text-green-200 text-xs">Farm Acres</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{displayProfile.total_recommendations}</div>
            <div className="text-green-200 text-xs">AI Tips Used</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{displayProfile.schemes_enrolled}</div>
            <div className="text-green-200 text-xs">Schemes</div>
          </div>
        </div>
      </div>

      {/* Achievement badges */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow-500" /> Achievements
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Early Adopter', color: 'bg-purple-100 text-purple-700' },
            { label: 'Disease Detective', color: 'bg-red-100 text-red-700' },
            { label: 'Market Watcher', color: 'bg-blue-100 text-blue-700' },
            { label: 'Scheme Explorer', color: 'bg-green-100 text-green-700' },
          ].map(b => (
            <span key={b.label} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${b.color}`}>{b.label}</span>
          ))}
        </div>
      </div>

      {/* Profile details / edit form */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Farm Information</h3>
          {editing && (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-3 h-3" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 text-xs font-medium text-white bg-green-600 px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-3 h-3" /> Save
              </button>
            </div>
          )}
        </div>

        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Village</label>
                <input name="village" value={form.village} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">District</label>
                <input name="district" value={form.district} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
                <input name="state" value={form.state} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Farm Size (acres)</label>
                <input type="number" name="farm_size" value={form.farm_size} min={0.5} step={0.5} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Soil Type</label>
                <select name="soil_type" value={form.soil_type} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  {soilTypes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Irrigation Type</label>
                <select name="irrigation_type" value={form.irrigation_type} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  {irrigationTypes.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Preferred Language</label>
                <select name="preferred_language" value={form.preferred_language} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  {languageOptions.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Current Crops (select all that apply)</label>
              <div className="flex flex-wrap gap-2">
                {cropOptions.map(crop => (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => toggleCrop(crop)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      form.current_crops.includes(crop)
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <InfoRow icon={User} label="Full Name" value={displayProfile.name} />
            <InfoRow icon={Phone} label="Mobile Number" value={displayProfile.phone} />
            <InfoRow icon={MapPin} label="Location" value={`${displayProfile.village}, ${displayProfile.district}, ${displayProfile.state}`} />
            <InfoRow icon={Layers} label="Farm Size" value={`${displayProfile.farm_size} acres`} />
            <InfoRow icon={Layers} label="Soil Type" value={displayProfile.soil_type} />
            <InfoRow icon={Droplets} label="Irrigation" value={displayProfile.irrigation_type} />
            <InfoRow
              icon={Sprout}
              label="Current Crops"
              value={displayProfile.current_crops.join(', ')}
            />
            <InfoRow
              icon={Bot}
              label="Preferred Language"
              value={languageOptions.find(l => l.value === displayProfile.preferred_language)?.label ?? displayProfile.preferred_language}
            />
            <InfoRow
              icon={Calendar}
              label="Member Since"
              value={new Date(displayProfile.member_since).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            />
            <InfoRow icon={FileText} label="Schemes Enrolled" value={`${displayProfile.schemes_enrolled} active schemes`} />
          </div>
        )}
      </div>
    </div>
  );
}
