'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

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

interface RezervareForm {
  trenId: string;
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  dataCalatorie: string;
  numarLocuri: number;
  tipBilet: string;
  observatii: string;
}

export default function RezervariPage() {
  const searchParams = useSearchParams();
  const trenIdFromUrl = searchParams.get('tren');
  
  const [trenuri, setTrenuri] = useState<Tren[]>([]);
  const [selectedTren, setSelectedTren] = useState<Tren | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
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
      const response = await fetch('/api/trenuri');
      const data = await response.json();
      setTrenuri(data);
    } catch (error) {
      console.error('Error fetching trenuri:', error);
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
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold mb-4">Rezervare Confirmată!</h1>
            <p className="text-gray-400 mb-6">
              Rezervarea ta a fost salvată cu succes. Vei primi un email de confirmare în curând.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="btn-primary"
            >
              Fă o altă rezervare
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Rezervare Tren</h1>
          <p className="text-gray-400">Completează formularul pentru a-ți rezerva locul</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-6">Detalii Rezervare</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Selectează Trenul</label>
                <select
                  value={form.trenId}
                  onChange={(e) => setForm({...form, trenId: e.target.value})}
                  className="input-field w-full"
                  required
                >
                  <option value="">Alege un tren</option>
                  {trenuri.map(tren => (
                    <option key={tren.id} value={tren.id}>
                      {tren.numar} - {tren.plecare} → {tren.destinatie} ({tren.oraPlecare})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nume</label>
                  <input
                    type="text"
                    value={form.nume}
                    onChange={(e) => setForm({...form, nume: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Prenume</label>
                  <input
                    type="text"
                    value={form.prenume}
                    onChange={(e) => setForm({...form, prenume: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={form.telefon}
                    onChange={(e) => setForm({...form, telefon: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Data Călătoriei</label>
                  <input
                    type="date"
                    value={form.dataCalatorie}
                    onChange={(e) => setForm({...form, dataCalatorie: e.target.value})}
                    className="input-field w-full"
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
                    className="input-field w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tip Bilet</label>
                <select
                  value={form.tipBilet}
                  onChange={(e) => setForm({...form, tipBilet: e.target.value})}
                  className="input-field w-full"
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
                  className="input-field w-full h-24 resize-none"
                  placeholder="Observații speciale (opțional)"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-lg"
              >
                {loading ? 'Se salvează...' : 'Confirmă Rezervarea'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            {selectedTren && (
              <div className="glass-card">
                <h2 className="text-2xl font-bold mb-4">Detalii Tren</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Număr:</span>
                    <span className="font-bold">{selectedTren.numar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tip:</span>
                    <span className="font-bold">{selectedTren.tip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rută:</span>
                    <span className="font-bold">{selectedTren.plecare} → {selectedTren.destinatie}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ora plecare:</span>
                    <span className="font-bold text-blue-400">{selectedTren.oraPlecare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ora sosire:</span>
                    <span className="font-bold text-red-400">{selectedTren.oraSosire}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Durată:</span>
                    <span className="font-bold">{selectedTren.durata}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Locuri disponibile:</span>
                    <span className="font-bold">{selectedTren.locuriDisponibile}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedTren && (
              <div className="glass-card">
                <h2 className="text-2xl font-bold mb-4">Cost Total</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Preț per bilet:</span>
                    <span className="font-bold">{selectedTren.pret} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Număr bilete:</span>
                    <span className="font-bold">{form.numarLocuri}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tip bilet:</span>
                    <span className="font-bold capitalize">{form.tipBilet}</span>
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between text-lg">
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