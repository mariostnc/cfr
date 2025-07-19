'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Rezervare } from '@/lib/db';

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

type RezervareForm = Omit<Rezervare, 'id' | 'dataCreare' | 'trenInfo' | 'pretTotal'>;

function RezervariContent() {
  const searchParams = useSearchParams();
  const trenIdFromUrl = searchParams.get('tren');
  
  const [trenuri, setTrenuri] = useState<Tren[]>([]);
  const [selectedTren, setSelectedTren] = useState<Tren | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trenuriLoading, setTrenuriLoading] = useState(true);
  
  const [form, setForm] = useState<RezervareForm>({
    trenId: trenIdFromUrl || '',
    nume: '',
    prenume: '',
    email: '',
    telefon: '',
    dataCalatorie: '',
    numarLocuri: 1,
    tipBilet: 'adult',
    observatii: ''
  });

  useEffect(() => {
    fetchTrenuri();
  }, []);

  useEffect(() => {
    if (form.trenId && trenuri.length > 0) {
      const tren = trenuri.find(t => t.id === form.trenId);
      setSelectedTren(tren || null);
    }
  }, [form.trenId, trenuri]);

  const fetchTrenuri = async () => {
    try {
      setTrenuriLoading(true);
      const response = await fetch('/api/trenuri');
      if (!response.ok) {
        throw new Error('Failed to fetch trenuri');
      }
      const data = await response.json();
      setTrenuri(data || []);
    } catch (error) {
      console.error('Error fetching trenuri:', error);
      setTrenuri([]);
    } finally {
      setTrenuriLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/rezervari', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          trenInfo: selectedTren,
          pretTotal: selectedTren ? selectedTren.pret * form.numarLocuri : 0
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setForm({
          trenId: '',
          nume: '',
          prenume: '',
          email: '',
          telefon: '',
          dataCalatorie: '',
          numarLocuri: 1,
          tipBilet: 'adult',
          observatii: ''
        });
        setSelectedTren(null);
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert('Eroare la salvarea rezervării');
      }
    } catch (error) {
      console.error('Error saving rezervare:', error);
      alert('Eroare la salvarea rezervării');
    } finally {
      setLoading(false);
    }
  };

  const calculatePret = () => {
    if (!selectedTren) return 0;
    
    let pret = selectedTren.pret;
    
    // Aplică reduceri
    if (form.tipBilet === 'elev') {
      pret *= 0.5; // 50% reducere
    } else if (form.tipBilet === 'pensionar') {
      pret *= 0.75; // 25% reducere
    } else if (form.tipBilet === 'copil') {
      pret *= 0.5; // 50% reducere
    }
    
    return pret * form.numarLocuri;
  };

  if (success) {
    return (
      <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card text-center">
            <div className="text-4xl sm:text-6xl mb-4">✅</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Rezervare Confirmată!</h1>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Rezervarea ta a fost salvată cu succes. Vei primi un email de confirmare în curând.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            >
              Fă o altă rezervare
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Rezervare Tren</h1>
          <p className="text-gray-400 text-sm sm:text-base">Completează formularul pentru a-ți rezerva locul</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Form */}
          <div className="glass-card">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Detalii Rezervare</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Selectează Trenul</label>
                <select
                  value={form.trenId}
                  onChange={(e) => setForm({...form, trenId: e.target.value})}
                  className="input-field w-full text-sm sm:text-base"
                  required
                  disabled={trenuriLoading}
                >
                  <option value="">
                    {trenuriLoading ? 'Se încarcă trenurile...' : 'Alege un tren'}
                  </option>
                  {trenuri && trenuri.length > 0 ? (
                    trenuri.map(tren => (
                      <option key={tren.id} value={tren.id}>
                        {tren.numar} - {tren.plecare} → {tren.destinatie} ({tren.oraPlecare})
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {trenuriLoading ? 'Se încarcă...' : 'Nu sunt trenuri disponibile'}
                    </option>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nume</label>
                  <input
                    type="text"
                    value={form.nume}
                    onChange={(e) => setForm({...form, nume: e.target.value})}
                    className="input-field w-full text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Prenume</label>
                  <input
                    type="text"
                    value={form.prenume}
                    onChange={(e) => setForm({...form, prenume: e.target.value})}
                    className="input-field w-full text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="input-field w-full text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={form.telefon}
                    onChange={(e) => setForm({...form, telefon: e.target.value})}
                    className="input-field w-full text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Data Călătoriei</label>
                  <input
                    type="date"
                    value={form.dataCalatorie}
                    onChange={(e) => setForm({...form, dataCalatorie: e.target.value})}
                    className="input-field w-full text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Număr Locuri</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={form.numarLocuri}
                    onChange={(e) => setForm({...form, numarLocuri: parseInt(e.target.value)})}
                    className="input-field w-full text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tip Bilet</label>
                <select
                  value={form.tipBilet}
                  onChange={(e) => setForm({...form, tipBilet: e.target.value})}
                  className="input-field w-full text-sm sm:text-base"
                  required
                >
                  <option value="adult">Adult</option>
                  <option value="elev">Elev/Student</option>
                  <option value="pensionar">Pensionar</option>
                  <option value="copil">Copil (5-14 ani)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Observații</label>
                <textarea
                  value={form.observatii}
                  onChange={(e) => setForm({...form, observatii: e.target.value})}
                  className="input-field w-full h-20 sm:h-24 resize-none text-sm sm:text-base"
                  placeholder="Observații speciale (opțional)"
                />
              </div>

              <button
                type="submit"
                disabled={loading || trenuriLoading}
                className="btn-primary w-full py-2 sm:py-3 text-sm sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Se salvează...' : 'Confirmă Rezervarea'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="space-y-4 sm:space-y-6">
            {selectedTren && (
              <div className="glass-card">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Detalii Tren</h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Număr:</span>
                    <span className="font-bold text-sm sm:text-base">{selectedTren.numar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Tip:</span>
                    <span className="font-bold text-sm sm:text-base">{selectedTren.tip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Rută:</span>
                    <span className="font-bold text-sm sm:text-base">{selectedTren.plecare} → {selectedTren.destinatie}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Ora plecare:</span>
                    <span className="font-bold text-blue-400 text-sm sm:text-base">{selectedTren.oraPlecare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Ora sosire:</span>
                    <span className="font-bold text-red-400 text-sm sm:text-base">{selectedTren.oraSosire}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Durată:</span>
                    <span className="font-bold text-sm sm:text-base">{selectedTren.durata}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Locuri disponibile:</span>
                    <span className="font-bold text-sm sm:text-base">{selectedTren.locuriDisponibile}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedTren && (
              <div className="glass-card">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Cost Total</h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Preț per bilet:</span>
                    <span className="font-bold text-sm sm:text-base">{selectedTren.pret} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Număr bilete:</span>
                    <span className="font-bold text-sm sm:text-base">{form.numarLocuri}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Tip bilet:</span>
                    <span className="font-bold capitalize text-sm sm:text-base">{form.tipBilet}</span>
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-green-400">{calculatePret().toFixed(2)} RON</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Rezervare Tren</h1>
          <p className="text-gray-400 text-sm sm:text-base">Se încarcă...</p>
        </div>
        <div className="glass-card text-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base">Se încarcă formularul de rezervare...</p>
        </div>
      </div>
    </div>
  );
}

export default function RezervariPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RezervariContent />
    </Suspense>
  );
} 