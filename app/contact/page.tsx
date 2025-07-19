'use client';

import { useState } from 'react';

interface ContactForm {
  nume: string;
  email: string;
  subiect: string;
  mesaj: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    nume: '',
    email: '',
    subiect: '',
    mesaj: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulează trimiterea mesajului
    setTimeout(() => {
      setSuccess(true);
      setForm({ nume: '', email: '', subiect: '', mesaj: '' });
      setLoading(false);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold mb-4">Mesaj Trimis!</h1>
            <p className="text-gray-400 mb-6">
              Mulțumim pentru mesajul tău! Vei fi contactat în cel mai scurt timp.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="btn-primary"
            >
              Trimite alt mesaj
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-gray-400">Suntem aici să te ajutăm cu orice întrebări ai avea</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card">
              <h2 className="text-2xl font-bold mb-6">Informații de Contact</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Telefon</h3>
                    <p className="text-gray-400">021 319 95 95</p>
                    <p className="text-gray-400">021 319 95 96</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-400">info@cfr.ro</p>
                    <p className="text-gray-400">rezervari@cfr.ro</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Adresă</h3>
                    <p className="text-gray-400">București, Sector 1</p>
                    <p className="text-gray-400">Strada Gării de Nord, nr. 1</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Program</h3>
                    <p className="text-gray-400">Luni - Vineri: 08:00 - 20:00</p>
                    <p className="text-gray-400">Sâmbătă: 09:00 - 17:00</p>
                    <p className="text-gray-400">Duminică: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h2 className="text-2xl font-bold mb-6">Servicii Suport</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 neumorphism rounded-lg">
                  <div>
                    <h3 className="font-bold">Suport Tehnic</h3>
                    <p className="text-sm text-gray-400">Pentru probleme cu platforma</p>
                  </div>
                  <span className="text-blue-400 font-bold">021 319 95 97</span>
                </div>

                <div className="flex items-center justify-between p-4 neumorphism rounded-lg">
                  <div>
                    <h3 className="font-bold">Rezervări</h3>
                    <p className="text-sm text-gray-400">Pentru asistență la rezervări</p>
                  </div>
                  <span className="text-green-400 font-bold">021 319 95 98</span>
                </div>

                <div className="flex items-center justify-between p-4 neumorphism rounded-lg">
                  <div>
                    <h3 className="font-bold">Reclamatii</h3>
                    <p className="text-sm text-gray-400">Pentru reclamații și sugestii</p>
                  </div>
                  <span className="text-red-400 font-bold">021 319 95 99</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-6">Trimite-ne un Mesaj</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subiect</label>
                <select
                  value={form.subiect}
                  onChange={(e) => setForm({...form, subiect: e.target.value})}
                  className="input-field w-full"
                  required
                >
                  <option value="">Alege un subiect</option>
                  <option value="rezervari">Rezervări</option>
                  <option value="tarife">Tarife și Reduceri</option>
                  <option value="tehnic">Suport Tehnic</option>
                  <option value="reclamatii">Reclamații</option>
                  <option value="sugestii">Sugestii</option>
                  <option value="alte">Alte</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mesaj</label>
                <textarea
                  value={form.mesaj}
                  onChange={(e) => setForm({...form, mesaj: e.target.value})}
                  className="input-field w-full h-32 resize-none"
                  placeholder="Scrie mesajul tău aici..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-lg"
              >
                {loading ? 'Se trimite...' : 'Trimite Mesajul'}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-8 text-center">Întrebări Frecvente</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Cum pot face o rezervare?</h3>
                  <p className="text-gray-400 text-sm">
                    Poți face o rezervare prin platforma noastră online, prin telefon sau direct la ghișeu.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Care sunt reducerile disponibile?</h3>
                  <p className="text-gray-400 text-sm">
                    Oferim reduceri pentru elevi/studenți (50%), pensionari (25%) și copii (50%).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Pot anula o rezervare?</h3>
                  <p className="text-gray-400 text-sm">
                    Da, poți anula o rezervare cu cel puțin 24 de ore înainte de plecare.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Cum verific starea trenului?</h3>
                  <p className="text-gray-400 text-sm">
                    Poți verifica starea trenului în timp real pe pagina "Stare Trenuri".
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Sunt animalele de companie permise?</h3>
                  <p className="text-gray-400 text-sm">
                    Da, animalele de companie sunt permise cu condiția să fie în transportoare.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Există WiFi în trenuri?</h3>
                  <p className="text-gray-400 text-sm">
                    WiFi-ul este disponibil în trenurile InterCity și pe unele rute InterRegio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 