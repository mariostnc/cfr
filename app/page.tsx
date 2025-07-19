import Link from 'next/link';
import { getTrenuri } from '@/lib/db';

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

export default async function Home() {
  const trenuri = await getTrenuri() as Tren[];
  const trenuriPopulare = trenuri.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            CFR România
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Călătorii confortabile și sigure prin România. Găsește trenul perfect pentru călătoria ta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trenuri" className="btn-primary text-lg px-8 py-3">
              Caută Trenuri
            </Link>
            <Link href="/rezervari" className="btn-secondary text-lg px-8 py-3">
              Rezervări
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card">
            <h2 className="text-3xl font-bold text-center mb-8">Căutare Rapidă</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium">Plecare</label>
                <select className="input-field w-full">
                  <option value="">Selectează stația</option>
                  <option value="București Nord">București Nord</option>
                  <option value="Cluj Napoca">Cluj Napoca</option>
                  <option value="Timișoara Nord">Timișoara Nord</option>
                  <option value="Constanța">Constanța</option>
                  <option value="Brașov">Brașov</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium">Destinație</label>
                <select className="input-field w-full">
                  <option value="">Selectează stația</option>
                  <option value="București Nord">București Nord</option>
                  <option value="Cluj Napoca">Cluj Napoca</option>
                  <option value="Timișoara Nord">Timișoara Nord</option>
                  <option value="Constanța">Constanța</option>
                  <option value="Brașov">Brașov</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium">Data</label>
                <input 
                  type="date" 
                  className="input-field w-full"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Link href="/trenuri" className="btn-primary text-lg px-8 py-3">
                Caută Trenuri
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Rute Populare</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trenuriPopulare.map((tren) => (
              <div key={tren.id} className="glass-card hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-400">{tren.numar}</span>
                  <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded">
                    {tren.tip}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">{tren.plecare}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-sm">{tren.destinatie}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{tren.pret} RON</span>
                  <span className="text-sm text-gray-400">{tren.durata}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">De ce să călătorești cu CFR?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Rapid și Sigur</h3>
              <p className="text-gray-400">Călătorii rapide și sigure prin întreaga Românie</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Prețuri Competitive</h3>
              <p className="text-gray-400">Tarife accesibile și reduceri pentru toate categoriile</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Rezervări Ușoare</h3>
              <p className="text-gray-400">Rezervări rapide și simple prin platforma noastră</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
