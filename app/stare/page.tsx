'use client';

import { useState, useEffect } from 'react';

interface StatusTren {
  id: string;
  numar: string;
  status: string;
  progres: number;
  intarziere: number;
  ultimaActualizare: string;
  statieCurenta: string;
  urmatoareaStatie: string;
  oraEstimataSosire: string;
}

export default function StarePage() {
  const [statusTrenuri, setStatusTrenuri] = useState<StatusTren[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Actualizează la 30 secunde
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setStatusTrenuri(data);
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'În mișcare':
        return 'text-green-400';
      case 'La stație':
        return 'text-blue-400';
      case 'Programat':
        return 'text-yellow-400';
      case 'Întârziat':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'În mișcare':
        return '🚂';
      case 'La stație':
        return '🛤️';
      case 'Programat':
        return '⏰';
      case 'Întârziat':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const filteredTrenuri = statusTrenuri.filter(tren =>
    tren.numar.toLowerCase().includes(filter.toLowerCase()) ||
    tren.statieCurenta.toLowerCase().includes(filter.toLowerCase())
  );

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString('ro-RO');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Se încarcă starea trenurilor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Starea Trenurilor în Timp Real</h1>
          <p className="text-gray-400">Monitorizează progresul trenurilor în timp real</p>
        </div>

        {/* Filter */}
        <div className="glass-card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Caută după numărul trenului sau stație..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <button
              onClick={fetchStatus}
              className="btn-primary px-6"
            >
              Actualizează
            </button>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid gap-6">
          {filteredTrenuri.length === 0 ? (
            <div className="glass-card text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Nu s-au găsit trenuri</h3>
              <p className="text-gray-400">Încearcă să modifici criteriile de căutare</p>
            </div>
          ) : (
            filteredTrenuri.map((tren) => (
              <div key={tren.id} className="glass-card">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{getStatusIcon(tren.status)}</span>
                        <div>
                          <span className="text-2xl font-bold text-blue-400">{tren.numar}</span>
                          <div className={`text-sm font-medium ${getStatusColor(tren.status)}`}>
                            {tren.status}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Progres</div>
                        <div className="text-lg font-bold">{tren.progres}%</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${tren.progres}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Stația curentă</div>
                        <div className="font-medium">{tren.statieCurenta}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Următoarea stație</div>
                        <div className="font-medium">{tren.urmatoareaStatie}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Ora estimată sosire</div>
                        <div className="font-medium text-green-400">{tren.oraEstimataSosire}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div>
                        <span className="font-medium">Ultima actualizare:</span> {formatTime(tren.ultimaActualizare)}
                      </div>
                      {tren.intarziere > 0 && (
                        <div className="text-red-400">
                          <span className="font-medium">Întârziere:</span> +{tren.intarziere} min
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Legend */}
        <div className="mt-8">
          <div className="glass-card">
            <h3 className="text-lg font-bold mb-4">Legendă Status</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🚂</span>
                <span>În mișcare</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">🛤️</span>
                <span>La stație</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">⏰</span>
                <span>Programat</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-400">⚠️</span>
                <span>Întârziat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 