'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Statistic {
  icon: string;
  value: string;
  label: string;
  color: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statistics: Statistic[] = [
    { icon: '🚂', value: '500+', label: 'Trenuri Zilnic', color: 'from-blue-500 to-cyan-500' },
    { icon: '👥', value: '50K+', label: 'Pasageri Zilnic', color: 'from-purple-500 to-pink-500' },
    { icon: '📍', value: '200+', label: 'Stații', color: 'from-green-500 to-emerald-500' },
    { icon: '⭐', value: '98%', label: 'Satisfacție', color: 'from-yellow-500 to-orange-500' }
  ];

  const features: Feature[] = [
    {
      icon: '🔍',
      title: 'Căutare Avansată',
      description: 'Găsește rapid trenul perfect cu filtre inteligente și recomandări personalizate.',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      icon: '🎫',
      title: 'Rezervări Instant',
      description: 'Rezervă-ți locul în câteva clicuri cu confirmare imediată și notificări în timp real.',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      icon: '📊',
      title: 'Status în Timp Real',
      description: 'Urmărește trenul tău în timp real cu actualizări live și notificări de întârziere.',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: '💰',
      title: 'Tarife Transparente',
      description: 'Vezi toate costurile clar, cu reduceri și promoții speciale pentru diferite categorii.',
      gradient: 'from-yellow-600 to-orange-600'
    }
  ];

  const heroSlides = [
    {
      title: 'Călătorii Moderne',
      subtitle: 'Descoperă România cu CFR Digital',
      description: 'Rezervări rapide, status în timp real și experiență de călătorie fără precedent.',
      image: '🚂',
      gradient: 'from-blue-600 via-purple-600 to-pink-600'
    },
    {
      title: 'Conectivitate Totală',
      subtitle: 'Reteaua CFR la un click distanță',
      description: 'Acces la toate informațiile despre trenuri, stații și servicii CFR.',
      image: '🌐',
      gradient: 'from-green-600 via-emerald-600 to-cyan-600'
    },
    {
      title: 'Experiență Premium',
      subtitle: 'Servicii de calitate superioară',
      description: 'Comoditate, siguranță și eficiență în fiecare călătorie cu CFR.',
      image: '⭐',
      gradient: 'from-purple-600 via-pink-600 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Slider */}
            <div className="relative h-96 flex items-center justify-center mb-12">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                    currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <div className={`text-8xl sm:text-9xl mb-6 animate-bounce`}>
                    {slide.image}
                  </div>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 text-gradient">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-white/90">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/trenuri" className="btn-primary text-lg px-8 py-4 group">
                <span className="flex items-center space-x-2">
                  <span>🔍</span>
                  <span>Caută Trenuri</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
              <Link href="/rezervari" className="btn-secondary text-lg px-8 py-4 group">
                <span className="flex items-center space-x-2">
                  <span>🎫</span>
                  <span>Fă o Rezervare</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className={`glass-card text-center p-6 hover-lift animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`text-4xl mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                  <div className={`text-2xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
              De ce CFR Digital?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Descoperă avantajele călătoriei moderne cu CFR - tehnologie de ultimă generație pentru o experiență de neuitat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl shadow-glow`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
              Servicii Rapide
            </h2>
            <p className="text-xl text-white/70">
              Accesează rapid serviciile CFR cu doar câteva clicuri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/trenuri" className="group">
              <div className="glass-card p-8 text-center hover-lift animate-fade-in-left">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🔍</div>
                <h3 className="text-2xl font-bold mb-3">Căutare Trenuri</h3>
                <p className="text-white/70 mb-4">Găsește rapid trenul perfect pentru călătoria ta</p>
                <div className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                  Caută acum →
                </div>
              </div>
            </Link>

            <Link href="/rezervari" className="group">
              <div className="glass-card p-8 text-center hover-lift animate-fade-in-up">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🎫</div>
                <h3 className="text-2xl font-bold mb-3">Rezervări</h3>
                <p className="text-white/70 mb-4">Rezervă-ți locul în câteva clicuri</p>
                <div className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                  Rezervă acum →
                </div>
              </div>
            </Link>

            <Link href="/stare" className="group">
              <div className="glass-card p-8 text-center hover-lift animate-fade-in-right">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="text-2xl font-bold mb-3">Status Trenuri</h3>
                <p className="text-white/70 mb-4">Verifică statusul trenului în timp real</p>
                <div className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                  Verifică acum →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 animate-scale-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">
              Rămâi Conectat
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Primește notificări despre promoții, întârzieri și noutăți CFR
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="input-field flex-1"
              />
              <button className="btn-primary whitespace-nowrap">
                Abonează-te
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
