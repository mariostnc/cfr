'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
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

    // Simulează trimiterea formularului
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setForm({ nume: '', email: '', subiect: '', mesaj: '' });
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card text-center">
            <div className="text-4xl sm:text-6xl mb-4">✅</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Mesaj Trimis!</h1>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Mulțumim pentru mesajul tău. Vei primi un răspuns în cel mai scurt timp.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            >
              Trimite alt mesaj
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Contact</h1>
          <p className="text-gray-400 text-sm sm:text-base">Suntem aici să te ajutăm cu orice întrebare ai avea</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="glass-card">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Trimite-ne un mesaj</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="input-field w-full text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subiect</label>
                <select
                  value={form.subiect}
                  onChange={(e) => setForm({...form, subiect: e.target.value})}
                  className="input-field w-full text-sm sm:text-base"
                  required
                >
                  <option value="">Alege un subiect</option>
                  <option value="rezervari">Rezervări</option>
                  <option value="tarife">Tarife și reduceri</option>
                  <option value="intarzieri">Întârzieri și anulări</option>
                  <option value="reclamatii">Reclamații</option>
                  <option value="sugestii">Sugestii</option>
                  <option value="alte">Alte întrebări</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mesaj</label>
                <textarea
                  value={form.mesaj}
                  onChange={(e) => setForm({...form, mesaj: e.target.value})}
                  className="input-field w-full h-32 sm:h-40 resize-none text-sm sm:text-base"
                  placeholder="Scrie mesajul tău aici..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-2 sm:py-3 text-sm sm:text-lg"
              >
                {loading ? 'Se trimite...' : 'Trimite Mesaj'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="glass-card">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Informații de Contact</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Telefon</h3>
                    <p className="text-gray-400 text-sm sm:text-base">021 319 99 99</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Luni - Duminică, 24/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Email</h3>
                    <p className="text-gray-400 text-sm sm:text-base">info@cfr.ro</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Răspuns în 24 de ore</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Adresă</h3>
                    <p className="text-gray-400 text-sm sm:text-base">București Nord</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Strada Gara de Nord 1-3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Program de Funcționare</h2>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Ghișee</span>
                  <span className="text-gray-400 text-sm sm:text-base">06:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Informații telefonice</span>
                  <span className="text-gray-400 text-sm sm:text-base">24/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Rezervări online</span>
                  <span className="text-gray-400 text-sm sm:text-base">24/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Asistență tehnică</span>
                  <span className="text-gray-400 text-sm sm:text-base">08:00 - 20:00</span>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">FAQ Rapid</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">Cum pot anula o rezervare?</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Poți anula online sau prin telefon cu 2 ore înainte de plecare.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">Ce documente sunt necesare?</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Buletin de identitate și card de reducere (dacă este cazul).</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">Cum pot obține o reducere?</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Elevii, studenții și pensionarii beneficiază de reduceri cu documentele corespunzătoare.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 