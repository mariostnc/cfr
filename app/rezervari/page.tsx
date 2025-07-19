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

interface ValidationErrors {
  [key: string]: string;
}

function RezervariContent() {
  const searchParams = useSearchParams();
  const trenIdFromUrl = searchParams.get('tren');
  
  const [trenuri, setTrenuri] = useState<Tren[]>([]);
  const [selectedTren, setSelectedTren] = useState<Tren | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trenuriLoading, setTrenuriLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
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

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!form.trenId) errors.trenId = 'Selectează un tren';
    if (!form.nume.trim()) errors.nume = 'Numele este obligatoriu';
    if (!form.prenume.trim()) errors.prenume = 'Prenumele este obligatoriu';
    if (!form.email.trim()) {
      errors.email = 'Email-ul este obligatoriu';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Email-ul nu este valid';
    }
    if (!form.telefon.trim()) errors.telefon = 'Telefonul este obligatoriu';
    if (!form.dataCalatorie) errors.dataCalatorie = 'Data călătoriei este obligatorie';
    if (form.numarLocuri < 1 || form.numarLocuri > 10) {
      errors.numarLocuri = 'Numărul de locuri trebuie să fie între 1 și 10';
    }

    // Validate future date
    const selectedDate = new Date(form.dataCalatorie);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.dataCalatorie = 'Data călătoriei trebuie să fie în viitor';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
        setCurrentStep(1);
        setValidationErrors({});
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

  const nextStep = () => {
    if (currentStep === 1 && !form.trenId) {
      setValidationErrors({ trenId: 'Selectează un tren' });
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
    setValidationErrors({});
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setValidationErrors({});
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'pending';
  };

  if (success) {
    return (
      <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card text-center animate-scale-in">
            <div className="text-6xl mb-6 animate-bounce">✅</div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">Rezervare Confirmată!</h1>
            <p className="text-white/70 mb-6 text-lg">
              Rezervarea ta a fost salvată cu succes. Vei primi un email de confirmare în curând.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => setSuccess(false)}
                className="btn-primary text-lg px-8 py-4"
              >
                Fă o altă rezervare
              </button>
              <div className="text-sm text-white/50">
                Numărul de rezervare: {Date.now().toString().slice(-8)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gradient animate-fade-in-up">
            Rezervare Tren
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Completează formularul pentru a-ți rezerva locul cu confort și siguranță
          </p>
        </div>

        {/* Progress Steps */}
        <div className="glass-card mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: 'Selectează Trenul', icon: '🚂' },
              { step: 2, title: 'Detalii Personale', icon: '👤' },
              { step: 3, title: 'Confirmare', icon: '✅' }
            ].map(({ step, title, icon }) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold transition-all duration-300 ${
                  getStepStatus(step) === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : getStepStatus(step) === 'active'
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-white/10 text-white/50'
                }`}>
                  {getStepStatus(step) === 'completed' ? '✓' : icon}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-white/70">Pasul {step}</div>
                  <div className="text-sm font-bold">{title}</div>
                </div>
                {step < 3 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    getStepStatus(step) === 'completed' ? 'bg-green-500' : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Select Train */}
                {currentStep === 1 && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <span className="mr-3">🚂</span>
                      Selectează Trenul
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Selectează Trenul</label>
                        <select
                          value={form.trenId}
                          onChange={(e) => setForm({...form, trenId: e.target.value})}
                          className={`input-field w-full ${validationErrors.trenId ? 'border-red-400' : ''}`}
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
                        {validationErrors.trenId && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.trenId}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Data Călătoriei</label>
                        <input
                          type="date"
                          value={form.dataCalatorie}
                          onChange={(e) => setForm({...form, dataCalatorie: e.target.value})}
                          className={`input-field w-full ${validationErrors.dataCalatorie ? 'border-red-400' : ''}`}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {validationErrors.dataCalatorie && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.dataCalatorie}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Details */}
                {currentStep === 2 && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <span className="mr-3">👤</span>
                      Detalii Personale
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nume</label>
                        <input
                          type="text"
                          value={form.nume}
                          onChange={(e) => setForm({...form, nume: e.target.value})}
                          className={`input-field w-full ${validationErrors.nume ? 'border-red-400' : ''}`}
                        />
                        {validationErrors.nume && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.nume}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Prenume</label>
                        <input
                          type="text"
                          value={form.prenume}
                          onChange={(e) => setForm({...form, prenume: e.target.value})}
                          className={`input-field w-full ${validationErrors.prenume ? 'border-red-400' : ''}`}
                        />
                        {validationErrors.prenume && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.prenume}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({...form, email: e.target.value})}
                          className={`input-field w-full ${validationErrors.email ? 'border-red-400' : ''}`}
                        />
                        {validationErrors.email && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Telefon</label>
                        <input
                          type="tel"
                          value={form.telefon}
                          onChange={(e) => setForm({...form, telefon: e.target.value})}
                          className={`input-field w-full ${validationErrors.telefon ? 'border-red-400' : ''}`}
                        />
                        {validationErrors.telefon && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.telefon}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Număr Locuri</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={form.numarLocuri}
                          onChange={(e) => setForm({...form, numarLocuri: parseInt(e.target.value)})}
                          className={`input-field w-full ${validationErrors.numarLocuri ? 'border-red-400' : ''}`}
                        />
                        {validationErrors.numarLocuri && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.numarLocuri}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tip Bilet</label>
                        <select
                          value={form.tipBilet}
                          onChange={(e) => setForm({...form, tipBilet: e.target.value})}
                          className="input-field w-full"
                        >
                          <option value="adult">Adult</option>
                          <option value="elev">Elev/Student</option>
                          <option value="pensionar">Pensionar</option>
                          <option value="copil">Copil (5-14 ani)</option>
                        </select>
                      </div>
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
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <span className="mr-3">✅</span>
                      Confirmă Rezervarea
                    </h2>
                    
                    <div className="glass-card p-6 mb-6">
                      <h3 className="text-lg font-bold mb-4">Rezumat Rezervare</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Tren:</span>
                          <span className="font-semibold">{selectedTren?.numar}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Rută:</span>
                          <span className="font-semibold">{selectedTren?.plecare} → {selectedTren?.destinatie}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Data:</span>
                          <span className="font-semibold">{form.dataCalatorie}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Pasager:</span>
                          <span className="font-semibold">{form.nume} {form.prenume}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Email:</span>
                          <span className="font-semibold">{form.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Telefon:</span>
                          <span className="font-semibold">{form.telefon}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Locuri:</span>
                          <span className="font-semibold">{form.numarLocuri} x {form.tipBilet}</span>
                        </div>
                        <hr className="border-white/20" />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-green-400">{calculatePret().toFixed(2)} RON</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-white/70 mb-4">
                        Confirmă că toate informațiile sunt corecte înainte de finalizarea rezervării.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      ← Înapoi
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary ml-auto"
                    >
                      Continuă →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-success ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Se salvează...' : 'Confirmă Rezervarea'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            {selectedTren && (
              <div className="glass-card animate-fade-in-left">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">🚂</span>
                  Detalii Tren
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Număr:</span>
                    <span className="font-bold text-blue-400">{selectedTren.numar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Tip:</span>
                    <span className="font-bold">{selectedTren.tip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Rută:</span>
                    <span className="font-bold text-right">{selectedTren.plecare} → {selectedTren.destinatie}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Ora plecare:</span>
                    <span className="font-bold text-blue-400">{selectedTren.oraPlecare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Ora sosire:</span>
                    <span className="font-bold text-red-400">{selectedTren.oraSosire}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Durată:</span>
                    <span className="font-bold">{selectedTren.durata}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Locuri disponibile:</span>
                    <span className="font-bold">{selectedTren.locuriDisponibile}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedTren && (
              <div className="glass-card animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  Cost Total
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Preț per bilet:</span>
                    <span className="font-bold">{selectedTren.pret} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Număr bilete:</span>
                    <span className="font-bold">{form.numarLocuri}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Tip bilet:</span>
                    <span className="font-bold capitalize">{form.tipBilet}</span>
                  </div>
                  <hr className="border-white/20" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-400">{calculatePret().toFixed(2)} RON</span>
                  </div>
                </div>
              </div>
            )}

            {/* Help Card */}
            <div className="glass-card animate-fade-in-left" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="mr-2">❓</span>
                Ai nevoie de ajutor?
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Contactează serviciul clienți pentru asistență în rezervări.
              </p>
              <button className="btn-secondary w-full text-sm">
                Contactează suportul
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gradient">Rezervare Tren</h1>
          <p className="text-xl text-white/70">Se încarcă...</p>
        </div>
        <div className="glass-card text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-white/70">Se încarcă formularul de rezervare...</p>
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