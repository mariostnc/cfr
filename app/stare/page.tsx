'use client';

import { useState, useEffect, useCallback } from 'react';

interface StareTren {
  id: string;
  numar: string;
  plecare: string;
  destinatie: string;
  oraPlecare: string;
  oraSosire: string;
  status: 'la_timp' | 'intarziat' | 'anulat';
  intarziere: number;
  progres: number;
  ultimaActualizare: string;
  observatii: string;
}

export default function StarePage() {
  const [stareTrenuri, setStareTrenuri] = useState<StareTren[]>([]);
  const [filteredTrenuri, setFilteredTrenuri] = useState<StareTren[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'toate' | 'la_timp' | 'intarziat' | 'anulat'>('toate');

  useEffect(() => {
    fetchStareTrenuri();
  }, []);

  const filterTrenuri = useCallback(() => {
    let filtered = [...stareTrenuri];
    
    if (filter === 'intarziat') {
      filtered = filtered.filter(tren => tren.status === 'intarziat');
    } else if (filter === 'la_timp') {
      filtered = filtered.filter(tren => tren.status === 'la_timp');
    } else if (filter === 'anulat') {
      filtered = filtered.filter(tren => tren.status === 'anulat');
    }
    
    setFilteredTrenuri(filtered);
  }, [stareTrenuri, filter]);

  useEffect(() => {
    filterTrenuri();
  }, [filterTrenuri]);

  const fetchStareTrenuri = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setStareTrenuri(data);
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'la_timp':
        return 'text-green-400';
      case 'intarziat':
        return 'text-yellow-400';
      case 'anulat':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'la_timp':
        return 'La timp';
      case 'intarziat':
        return 'Întârziat';
      case 'anulat':
        return 'Anulat';
      default:
        return 'Necunoscut';
    }
  };

  const getProgressColor = (progres: number) => {
    if (progres >= 80) return 'bg-green-500';
    if (progres >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base">Se încarcă informațiile despre trenuri...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Stare Trenuri în Timp Real</h1>
          <p className="text-gray-400 text-sm sm:text-base">Monitorizează statusul trenurilor în timp real</p>
        </div>

        {/* Filter Controls */}
        <div className="glass-card mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            <button
              onClick={() => setFilter('toate')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                filter === 'toate'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Toate ({stareTrenuri.length})
            </button>
            <button
              onClick={() => setFilter('la_timp')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                filter === 'la_timp'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              La timp ({stareTrenuri.filter(t => t.status === 'la_timp').length})
            </button>
            <button
              onClick={() => setFilter('intarziat')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                filter === 'intarziat'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Întârziat ({stareTrenuri.filter(t => t.status === 'intarziat').length})
            </button>
            <button
              onClick={() => setFilter('anulat')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                filter === 'anulat'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Anulat ({stareTrenuri.filter(t => t.status === 'anulat').length})
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredTrenuri.length === 0 ? (
            <div className="glass-card text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-4">🚂</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Nu s-au găsit trenuri</h3>
              <p className="text-gray-400 text-sm sm:text-base">Încearcă să modifici filtrele</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTrenuri.map((tren) => (
                <div key={tren.id} className="glass-card hover:scale-[1.02] transition-transform duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <span className="text-xl sm:text-2xl font-bold text-blue-400">{tren.numar}</span>
                          <span className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded font-medium ${getStatusColor(tren.status)}`}>
                            {getStatusText(tren.status)}
                          </span>
                          {tren.status === 'intarziat' && (
                            <span className="text-xs sm:text-sm text-yellow-400">
                              +{tren.intarziere} min
                            </span>
                          )}
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xs sm:text-sm text-gray-400">
                            Ultima actualizare: {tren.ultimaActualizare}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                        <div>
                          <div className="text-xs sm:text-sm text-gray-400 mb-1">Plecare</div>
                          <div className="font-medium text-sm sm:text-base">{tren.plecare}</div>
                          <div className="text-xs sm:text-sm text-blue-400">{tren.oraPlecare}</div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="flex-1 h-px bg-gray-600"></div>
                          <div className="mx-2 sm:mx-4 text-xs sm:text-sm text-gray-400">Progres</div>
                          <div className="flex-1 h-px bg-gray-600"></div>
                        </div>
                        
                        <div>
                          <div className="text-xs sm:text-sm text-gray-400 mb-1">Sosire</div>
                          <div className="font-medium text-sm sm:text-base">{tren.destinatie}</div>
                          <div className="text-xs sm:text-sm text-red-400">{tren.oraSosire}</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3 sm:mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs sm:text-sm text-gray-400">Progres călătorie</span>
                          <span className="text-xs sm:text-sm font-medium">{tren.progres}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(tren.progres)}`}
                            style={{ width: `${tren.progres}%` }}
                          ></div>
                        </div>
                      </div>

                      {tren.observatii && (
                        <div className="text-xs sm:text-sm text-gray-400 bg-gray-800/50 p-2 sm:p-3 rounded">
                          <strong>Observații:</strong> {tren.observatii}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto-refresh info */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-400">
            Informațiile se actualizează automat la fiecare 30 de secunde
          </p>
        </div>
      </div>
    </div>
  );
} 