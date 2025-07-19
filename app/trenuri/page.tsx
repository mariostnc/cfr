'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Tren {
  id: string;
  numar: string;
  tip: string;
  plecare: string;
  destinatie: string;
  oraPlecare: string;
  oraSosire: string;
  durata: string;
  pret: number;
  locuriDisponibile: number;
  operator: string;
}

interface FilterState {
  plecare: string;
  destinatie: string;
  data: string;
  tipTren: string;
  pretMin: string;
  pretMax: string;
  oraPlecare: string;
  oraSosire: string;
}

export default function TrenuriPage() {
  const [trenuri, setTrenuri] = useState<Tren[]>([]);
  const [filteredTrenuri, setFilteredTrenuri] = useState<Tren[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'pret' | 'durata' | 'oraPlecare'>('oraPlecare');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedTren, setSelectedTren] = useState<Tren | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    plecare: '',
    destinatie: '',
    data: '',
    tipTren: '',
    pretMin: '',
    pretMax: '',
    oraPlecare: '',
    oraSosire: ''
  });

  const statii = ['București Nord', 'Cluj Napoca', 'Timișoara Nord', 'Constanța', 'Brașov', 'Sibiu', 'Craiova', 'Galați', 'Ploiești', 'Bacău'];
  const tipuriTren = ['InterRegio', 'Rapid', 'InterCity', 'Personal', 'Accelerat'];
  const ore = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  const filterTrenuri = useCallback(() => {
    if (!trenuri || trenuri.length === 0) {
      setFilteredTrenuri([]);
      return;
    }

    let filtered = [...trenuri];

    // Apply filters
    if (filters.plecare) {
      filtered = filtered.filter(tren => 
        tren.plecare.toLowerCase().includes(filters.plecare.toLowerCase())
      );
    }

    if (filters.destinatie) {
      filtered = filtered.filter(tren => 
        tren.destinatie.toLowerCase().includes(filters.destinatie.toLowerCase())
      );
    }

    if (filters.tipTren) {
      filtered = filtered.filter(tren => tren.tip === filters.tipTren);
    }

    if (filters.pretMin) {
      filtered = filtered.filter(tren => tren.pret >= parseInt(filters.pretMin));
    }

    if (filters.pretMax) {
      filtered = filtered.filter(tren => tren.pret <= parseInt(filters.pretMax));
    }

    if (filters.oraPlecare) {
      filtered = filtered.filter(tren => tren.oraPlecare >= filters.oraPlecare);
    }

    if (filters.oraSosire) {
      filtered = filtered.filter(tren => tren.oraSosire <= filters.oraSosire);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'pret':
          aValue = a.pret;
          bValue = b.pret;
          break;
        case 'durata':
          aValue = parseInt(a.durata.split('h')[0]);
          bValue = parseInt(b.durata.split('h')[0]);
          break;
        case 'oraPlecare':
          aValue = a.oraPlecare;
          bValue = b.oraPlecare;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTrenuri(filtered);
  }, [trenuri, filters, sortBy, sortOrder]);

  const fetchTrenuri = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/trenuri');
      
      if (!response.ok) {
        throw new Error('Failed to fetch trenuri');
      }
      
      const data = await response.json();
      setTrenuri(data || []);
    } catch (error) {
      console.error('Error fetching trenuri:', error);
      setError('Eroare la încărcarea trenurilor');
      setTrenuri([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrenuri();
  }, []);

  useEffect(() => {
    filterTrenuri();
  }, [filterTrenuri]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      plecare: '',
      destinatie: '',
      data: '',
      tipTren: '',
      pretMin: '',
      pretMax: '',
      oraPlecare: '',
      oraSosire: ''
    });
  };

  const getStatusColor = (locuriDisponibile: number) => {
    if (locuriDisponibile > 50) return 'text-green-400';
    if (locuriDisponibile > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusText = (locuriDisponibile: number) => {
    if (locuriDisponibile > 50) return 'Multe locuri';
    if (locuriDisponibile > 20) return 'Locuri limitate';
    return 'Aproape complet';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Se încarcă trenurile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Căutare Trenuri</h1>
            <p className="text-gray-400 text-sm sm:text-base">Găsește trenul perfect pentru călătoria ta</p>
          </div>
          
          <div className="glass-card text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Eroare la încărcare</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">{error}</p>
            <button 
              onClick={fetchTrenuri}
              className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gradient animate-fade-in-up">
            Căutare Trenuri
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Găsește trenul perfect pentru călătoria ta cu filtre avansate și recomandări inteligente
          </p>
        </div>

        {/* Quick Search */}
        <div className="glass-card mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plecare</label>
              <select 
                value={filters.plecare} 
                onChange={(e) => handleFilterChange('plecare', e.target.value)}
                className="input-field w-full"
              >
                <option value="">Toate stațiile</option>
                {statii.map(statia => (
                  <option key={statia} value={statia}>{statia}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Destinație</label>
              <select 
                value={filters.destinatie} 
                onChange={(e) => handleFilterChange('destinatie', e.target.value)}
                className="input-field w-full"
              >
                <option value="">Toate stațiile</option>
                {statii.map(statia => (
                  <option key={statia} value={statia}>{statia}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Data</label>
              <input 
                type="date" 
                value={filters.data}
                onChange={(e) => handleFilterChange('data', e.target.value)}
                className="input-field w-full"
              />
            </div>

            <div className="flex items-end space-x-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex-1"
              >
                {showFilters ? 'Ascunde' : 'Filtre'} Avansate
              </button>
              <button 
                onClick={clearFilters}
                className="btn-danger px-4"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="glass-card mb-8 animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4">Filtre Avansate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tip Tren</label>
                <select 
                  value={filters.tipTren} 
                  onChange={(e) => handleFilterChange('tipTren', e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">Toate tipurile</option>
                  {tipuriTren.map(tip => (
                    <option key={tip} value={tip}>{tip}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preț Min (RON)</label>
                <input 
                  type="number"
                  value={filters.pretMin}
                  onChange={(e) => handleFilterChange('pretMin', e.target.value)}
                  className="input-field w-full"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preț Max (RON)</label>
                <input 
                  type="number"
                  value={filters.pretMax}
                  onChange={(e) => handleFilterChange('pretMax', e.target.value)}
                  className="input-field w-full"
                  placeholder="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ora Plecare</label>
                <select 
                  value={filters.oraPlecare} 
                  onChange={(e) => handleFilterChange('oraPlecare', e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">Orice oră</option>
                  {ore.map(ora => (
                    <option key={ora} value={ora}>{ora}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Sort and Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold">
              Rezultate ({filteredTrenuri.length})
            </h2>
            <div className="flex items-center space-x-2">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input-field text-sm"
              >
                <option value="oraPlecare">Ora plecării</option>
                <option value="pret">Preț</option>
                <option value="durata">Durată</option>
              </select>
              <button 
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="btn-secondary px-3 py-2"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredTrenuri.length === 0 ? (
          <div className="glass-card text-center py-12 animate-fade-in-up">
            <div className="text-6xl mb-4">🚂</div>
            <h3 className="text-2xl font-bold mb-2">Nu s-au găsit trenuri</h3>
            <p className="text-white/70 mb-4">Încearcă să modifici criteriile de căutare</p>
            <button 
              onClick={clearFilters}
              className="btn-primary"
            >
              Resetează filtrele
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredTrenuri.map((tren, index) => (
              <div 
                key={tren.id} 
                className="glass-card hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <span className="text-2xl sm:text-3xl font-bold text-blue-400">{tren.numar}</span>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full font-medium">
                          {tren.tip}
                        </span>
                        <span className={`text-xs sm:text-sm px-2 py-1 rounded-full ${getStatusColor(tren.locuriDisponibile)} bg-white/10`}>
                          {getStatusText(tren.locuriDisponibile)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl sm:text-3xl font-bold text-green-400">{tren.pret} RON</div>
                        <div className="text-xs sm:text-sm text-white/50">{tren.locuriDisponibile} locuri disponibile</div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="text-center sm:text-left">
                        <div className="text-xs sm:text-sm text-white/50 mb-1">Plecare</div>
                        <div className="font-semibold text-sm sm:text-base">{tren.plecare}</div>
                        <div className="text-lg sm:text-xl font-bold text-blue-400">{tren.oraPlecare}</div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        <div className="mx-4 text-xs sm:text-sm text-white/50 bg-white/10 px-3 py-1 rounded-full">
                          {tren.durata}
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      </div>
                      
                      <div className="text-center sm:text-right">
                        <div className="text-xs sm:text-sm text-white/50 mb-1">Sosire</div>
                        <div className="font-semibold text-sm sm:text-base">{tren.destinatie}</div>
                        <div className="text-lg sm:text-xl font-bold text-red-400">{tren.oraSosire}</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-white/50">
                      <span>Operator: {tren.operator}</span>
                      <span>Tren ID: {tren.id}</span>
                    </div>
                  </div>

                  <div className="lg:ml-8 mt-4 lg:mt-0">
                    <Link 
                      href={`/rezervari?tren=${tren.id}`}
                      className="btn-primary block text-center group"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>🎫</span>
                        <span>Rezervă</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 