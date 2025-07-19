'use client';

import { useState, useEffect } from 'react';

interface Tarif {
  id: string;
  tip: string;
  descriere: string;
  pret: number;
  reducere: number;
  conditii: string[];
  valabilitate: string;
  categorie: 'adult' | 'elev' | 'pensionar' | 'copil' | 'special';
}

export default function TarifePage() {
  const [tarife, setTarife] = useState<Tarif[]>([]);
  const [filteredTarife, setFilteredTarife] = useState<Tarif[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('toate');

  useEffect(() => {
    fetchTarife();
  }, []);

  useEffect(() => {
    filterTarife();
  }, [tarife, filter]);

  const fetchTarife = async () => {
    try {
      const response = await fetch('/api/tarife');
      const data = await response.json();
      setTarife(data);
    } catch (error) {
      console.error('Error fetching tarife:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTarife = () => {
    let filtered = [...tarife];
    
    if (filter !== 'toate') {
      filtered = filtered.filter(tarif => tarif.categorie === filter);
    }
    
    setFilteredTarife(filtered);
  };

  const getCategoryColor = (categorie: string) => {
    switch (categorie) {
      case 'adult':
        return 'bg-blue-600';
      case 'elev':
        return 'bg-green-600';
      case 'pensionar':
        return 'bg-purple-600';
      case 'copil':
        return 'bg-yellow-600';
      case 'special':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getCategoryText = (categorie: string) => {
    switch (categorie) {
      case 'adult':
        return 'Adult';
      case 'elev':
        return 'Elev/Student';
      case 'pensionar':
        return 'Pensionar';
      case 'copil':
        return 'Copil';
      case 'special':
        return 'Special';
      default:
        return 'Necunoscut';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base">Se încarcă tarifele...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Tarife și Reduceri</h1>
          <p className="text-gray-400 text-sm sm:text-base">Descoperă tarifele și reducerile disponibile</p>
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
              Toate ({tarife.length})
            </button>
            <button
              onClick={() => setFilter('adult')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                filter === 'adult'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Adult ({tarife.filter(t => t.categorie === 'adult').length})
            </button>
            <button
              onClick={() => setFilter('elev')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                filter === 'elev'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Elev ({tarife.filter(t => t.categorie === 'elev').length})
            </button>
            <button
              onClick={() => setFilter('pensionar')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                filter === 'pensionar'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Pensionar ({tarife.filter(t => t.categorie === 'pensionar').length})
            </button>
            <button
              onClick={() => setFilter('copil')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                filter === 'copil'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Copil ({tarife.filter(t => t.categorie === 'copil').length})
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredTarife.length === 0 ? (
            <div className="glass-card text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-4">💰</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Nu s-au găsit tarife</h3>
              <p className="text-gray-400 text-sm sm:text-base">Încearcă să modifici filtrele</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTarife.map((tarif) => (
                <div key={tarif.id} className="glass-card hover:scale-[1.02] transition-transform duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <span className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded text-white font-medium ${getCategoryColor(tarif.categorie)}`}>
                            {getCategoryText(tarif.categorie)}
                          </span>
                          <span className="text-lg sm:text-xl font-bold">{tarif.tip}</span>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-lg sm:text-2xl font-bold text-green-400">{tarif.pret} RON</div>
                          {tarif.reducere > 0 && (
                            <div className="text-xs sm:text-sm text-yellow-400">
                              Reducere {tarif.reducere}%
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-gray-300 mb-4">{tarif.descriere}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm sm:text-base font-medium mb-2">Condiții:</h4>
                          <ul className="space-y-1">
                            {tarif.conditii.map((conditie, index) => (
                              <li key={index} className="text-xs sm:text-sm text-gray-400 flex items-start">
                                <span className="text-blue-400 mr-2 mt-1">•</span>
                                {conditie}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm sm:text-base font-medium mb-2">Valabilitate:</h4>
                          <p className="text-xs sm:text-sm text-gray-400">{tarif.valabilitate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 sm:mt-8">
          <div className="glass-card">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Informații Importante</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm sm:text-base">
              <div className="space-y-2">
                <h4 className="font-medium text-blue-400">Documente Necesare</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Buletin de identitate</li>
                  <li>• Card de student (pentru reduceri)</li>
                  <li>• Certificat medical (dacă este cazul)</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-green-400">Rezervări</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Rezervările se fac cu 24h înainte</li>
                  <li>• Plata se face la bord sau online</li>
                  <li>• Anulări gratuite cu 2h înainte</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-purple-400">Contact</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Tel: 021 319 99 99</li>
                  <li>• Email: info@cfr.ro</li>
                  <li>• Program: 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 