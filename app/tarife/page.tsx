'use client';

import { useState, useEffect } from 'react';

interface Reducere {
  tip: string;
  procent: number;
  pret: number;
  conditii: string;
}

interface Tarif {
  id: string;
  tipTren: string;
  pretBase: number;
  reduceri: Reducere[];
}

export default function TarifePage() {
  const [tarife, setTarife] = useState<Tarif[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTip, setSelectedTip] = useState('');

  useEffect(() => {
    fetchTarife();
  }, []);

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

  const filteredTarife = selectedTip 
    ? tarife.filter(tarif => tarif.tipTren === selectedTip)
    : tarife;

  const tipuriTren = ['InterRegio', 'Rapid', 'InterCity', 'Personal'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Se încarcă tarifele...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Tarife și Reduceri</h1>
          <p className="text-gray-400">Vezi toate tarifele și reducerile disponibile pentru călătoriile cu CFR</p>
        </div>

        {/* Filter */}
        <div className="glass-card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <select
                value={selectedTip}
                onChange={(e) => setSelectedTip(e.target.value)}
                className="input-field w-full"
              >
                <option value="">Toate tipurile de tren</option>
                {tipuriTren.map(tip => (
                  <option key={tip} value={tip}>{tip}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setSelectedTip('')}
              className="btn-secondary px-6"
            >
              Resetează
            </button>
          </div>
        </div>

        {/* Tarife Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredTarife.map((tarif) => (
            <div key={tarif.id} className="glass-card">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">{tarif.tipTren}</h2>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {tarif.pretBase} RON
                </div>
                <div className="text-gray-400">Preț de bază</div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-4">Reduceri Disponibile</h3>
                
                {tarif.reduceri.map((reducere, index) => (
                  <div key={index} className="neumorphism p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {reducere.procent}%
                          </span>
                        </div>
                        <span className="font-medium">{reducere.tip}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-400">
                          {reducere.pret} RON
                        </div>
                        <div className="text-sm text-gray-400">
                          Reducere {reducere.procent}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      {reducere.conditii}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-600">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Preț minim</div>
                    <div className="font-bold text-green-400">
                      {Math.min(...tarif.reduceri.map(r => r.pret))} RON
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Reducere maximă</div>
                    <div className="font-bold text-blue-400">
                      {Math.max(...tarif.reduceri.map(r => r.procent))}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12">
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-6">Informații Importante</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Condiții pentru Reduceri</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Elevii și studenții trebuie să prezinte carnetul de elev/student valid</li>
                  <li>• Pensionarii trebuie să prezinte carnetul de pensionar valid</li>
                  <li>• Reducerea pentru copii se aplică pentru copii între 5-14 ani</li>
                  <li>• Copiii sub 5 ani călătoresc gratuit (fără loc rezervat)</li>
                  <li>• Reducerile nu se pot combina</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Tipuri de Trenuri</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• <strong>InterRegio:</strong> Trenuri rapide între orașe mari</li>
                  <li>• <strong>Rapid:</strong> Trenuri cu oprire în stații intermediare</li>
                  <li>• <strong>InterCity:</strong> Trenuri de lux cu servicii premium</li>
                  <li>• <strong>Personal:</strong> Trenuri locale cu oprire în toate stațiile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8">
          <div className="glass-card text-center">
            <h3 className="text-lg font-bold mb-2">Ai întrebări despre tarife?</h3>
            <p className="text-gray-400 mb-4">
              Contactează-ne pentru informații suplimentare despre tarife și reduceri
            </p>
            <a href="/contact" className="btn-primary">
              Contactează-ne
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 