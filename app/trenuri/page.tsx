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

export default function TrenuriPage() {
  const [trenuri, setTrenuri] = useState<Tren[]>([]);
  const [filteredTrenuri, setFilteredTrenuri] = useState<Tren[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [plecare, setPlecare] = useState('');
  const [destinatie, setDestinatie] = useState('');
  const [data, setData] = useState('');
  const [tipTren, setTipTren] = useState('');

  const filterTrenuri = useCallback(() => {
    let filtered = [...trenuri];

    if (plecare) {
      filtered = filtered.filter(tren => 
        tren.plecare.toLowerCase().includes(plecare.toLowerCase())
      );
    }

    if (destinatie) {
      filtered = filtered.filter(tren => 
        tren.destinatie.toLowerCase().includes(destinatie.toLowerCase())
      );
    }

    if (tipTren) {
      filtered = filtered.filter(tren => tren.tip === tipTren);
    }

    setFilteredTrenuri(filtered);
  }, [trenuri, plecare, destinatie, tipTren]);

  const fetchTrenuri = async () => {
    try {
      const response = await fetch('/api/trenuri');
      const data = await response.json();
      setTrenuri(data);
    } catch (error) {
      console.error('Error fetching trenuri:', error);
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

  const statii = ['București Nord', 'Cluj Napoca', 'Timișoara Nord', 'Constanța', 'Brașov', 'Sibiu', 'Craiova'];
  const tipuriTren = ['InterRegio', 'Rapid', 'InterCity', 'Personal'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Se încarcă trenurile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Căutare Trenuri</h1>
          <p className="text-gray-400">Găsește trenul perfect pentru călătoria ta</p>
        </div>

        {/* Search Form */}
        <div className="glass-card mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plecare</label>
              <select 
                value={plecare} 
                onChange={(e) => setPlecare(e.target.value)}
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
                value={destinatie} 
                onChange={(e) => setDestinatie(e.target.value)}
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
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tip Tren</label>
              <select 
                value={tipTren} 
                onChange={(e) => setTipTren(e.target.value)}
                className="input-field w-full"
              >
                <option value="">Toate tipurile</option>
                {tipuriTren.map(tip => (
                  <option key={tip} value={tip}>{tip}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => {
                  setPlecare('');
                  setDestinatie('');
                  setData('');
                  setTipTren('');
                }}
                className="btn-secondary w-full"
              >
                Resetează
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Rezultate ({filteredTrenuri.length})
            </h2>
          </div>

          {filteredTrenuri.length === 0 ? (
            <div className="glass-card text-center py-12">
              <div className="text-6xl mb-4">🚂</div>
              <h3 className="text-xl font-bold mb-2">Nu s-au găsit trenuri</h3>
              <p className="text-gray-400">Încearcă să modifici criteriile de căutare</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTrenuri.map((tren) => (
                <div key={tren.id} className="glass-card hover:scale-[1.02] transition-transform duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl font-bold text-blue-400">{tren.numar}</span>
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                            {tren.tip}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{tren.pret} RON</div>
                          <div className="text-sm text-gray-400">{tren.locuriDisponibile} locuri disponibile</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Plecare</div>
                          <div className="font-medium">{tren.plecare}</div>
                          <div className="text-sm text-blue-400">{tren.oraPlecare}</div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="flex-1 h-px bg-gray-600"></div>
                          <div className="mx-4 text-gray-400">{tren.durata}</div>
                          <div className="flex-1 h-px bg-gray-600"></div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Sosire</div>
                          <div className="font-medium">{tren.destinatie}</div>
                          <div className="text-sm text-red-400">{tren.oraSosire}</div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-400">
                        Operator: {tren.operator}
                      </div>
                    </div>

                    <div className="lg:ml-8 mt-4 lg:mt-0">
                      <Link 
                        href={`/rezervari?tren=${tren.id}`}
                        className="btn-primary block text-center"
                      >
                        Rezervă
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 