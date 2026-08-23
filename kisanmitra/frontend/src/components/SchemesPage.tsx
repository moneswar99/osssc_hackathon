import { useEffect, useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, FileText, Tag } from 'lucide-react';
import { api } from '../services/api';
import type { GovernmentScheme } from '../types';

const categoryColors: Record<string, string> = {
  'Income Support': 'bg-green-100 text-green-700',
  Insurance:        'bg-blue-100 text-blue-700',
  Credit:           'bg-purple-100 text-purple-700',
  'State Scheme':   'bg-orange-100 text-orange-700',
  Advisory:         'bg-teal-100 text-teal-700',
};

function SchemeCard({ scheme }: { scheme: GovernmentScheme }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[scheme.category] ?? 'bg-gray-100 text-gray-600'}`}>
                {scheme.category}
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">
                {scheme.benefit}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm leading-snug">{scheme.name}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{scheme.purpose}</p>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 space-y-4 pt-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Eligibility</h4>
            <p className="text-sm text-gray-700">{scheme.eligibility}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Required Documents</h4>
            <ul className="space-y-1">
              {scheme.documents.map((doc, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <FileText className="w-3 h-3 text-green-500 flex-shrink-0" />{doc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">How to Apply</h4>
            <p className="text-sm text-gray-700">{scheme.application}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Tag className="w-3 h-3" />
            <span>{scheme.ministry}</span>
          </div>

          <a
            href={scheme.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
          >
            Visit Official Website <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.getSchemes().then((d) => setSchemes(d.schemes)).catch(() => null).finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(schemes.map((s) => s.category)))];
  const filtered = filter === 'All' ? schemes : schemes.filter((s) => s.category === filter);

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Schemes list */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading schemes…</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((scheme) => (
            <SchemeCard key={scheme.name} scheme={scheme} />
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 text-center pb-2">
        Information is for reference only. Verify eligibility with official sources before applying.
      </p>
    </div>
  );
}
