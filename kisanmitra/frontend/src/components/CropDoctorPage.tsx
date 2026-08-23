import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader2, AlertTriangle, CheckCircle, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../services/api';
import type { CropDisease } from '../types';

export default function CropDoctorPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CropDisease | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPrevention, setShowPrevention] = useState(false);
  const [showTreatment, setShowTreatment] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.analyzeCropDisease(file);
      setResult(res.analysis);
    } catch {
      setError('Analysis failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const severityColor: Record<string, string> = {
    Low:      'text-green-600 bg-green-100',
    Moderate: 'text-yellow-700 bg-yellow-100',
    High:     'text-red-700 bg-red-100',
    Severe:   'text-red-900 bg-red-200',
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
      >
        {preview ? (
          <img src={preview} alt="Crop preview" className="mx-auto max-h-56 rounded-xl object-contain" />
        ) : (
          <>
            <Camera className="w-12 h-12 mx-auto text-green-400 mb-3" />
            <p className="font-semibold text-gray-700">Upload or take a photo of your crop</p>
            <p className="text-sm text-gray-500 mt-1">Click here or drag & drop a JPG / PNG image</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => { setPreview(null); setFile(null); setResult(null); setError(''); }}
          className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing…</> : <><Upload className="w-4 h-4" />Analyze Crop</>}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Summary card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{result.disease}</h3>
                <p className="text-sm text-gray-500">{result.crop}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColor[result.severity] ?? 'bg-gray-100 text-gray-700'}`}>
                {result.severity}
              </span>
            </div>

            {/* Confidence */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>AI Confidence</span>
                <span className="font-semibold text-gray-700">{result.confidence}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Symptoms */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Symptoms</h4>
              <p className="text-sm text-gray-600">{result.symptoms}</p>
            </div>
          </div>

          {/* Prevention */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowPrevention(!showPrevention)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <CheckCircle className="w-4 h-4 text-green-600" /> Prevention
              </div>
              {showPrevention ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {showPrevention && (
              <ul className="px-5 pb-5 space-y-2">
                {result.prevention.map((p, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-green-500 font-bold mt-0.5">•</span>{p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Treatment */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowTreatment(!showTreatment)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <ShieldAlert className="w-4 h-4 text-blue-600" /> Treatment
              </div>
              {showTreatment ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {showTreatment && (
              <ul className="px-5 pb-5 space-y-2">
                {result.treatment.map((t, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-blue-500 font-bold mt-0.5">{i + 1}.</span>{t}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">{result.warning}</p>
          </div>
        </div>
      )}
    </div>
  );
}
