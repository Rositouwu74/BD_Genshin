'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-navy-900 font-sans">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-navy-900 to-blue-900">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-[-10%] w-[120%] h-2/3 bg-blue-400 transform -skew-y-6 origin-bottom-right"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 py-16 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-white space-y-6">
              <h1 className="text-7xl font-bold tracking-wider whitespace-nowrap">
                Genshin Guides
              </h1>
              <p className="text-2xl font-medium">
                La mejor herramienta para poder aprender un poco más sobre tu juego favorito.
              </p>
              <br />
              <br />
              <br />
              
              
              {/* Botón para la página oficial */}
              <div className="mt-8">
                <a
                  href="https://genshin.hoyoverse.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                  Página Oficial de Genshin Impact
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <br />
              <br />
              <br />
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold">Ponte en contacto con nosotros:</h3>
                <div className="space-y-2">
                  {/* Teléfono */}
                  <p className="flex items-center gap-4">
                    <img
                      src="/waza.png"
                      alt="Logo Teléfono"
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-medium">686 366-2576</span>
                  </p>

                  {/* Correo */}
                  <p className="flex items-center gap-4">
                    <img
                      src="/gmail.png"
                      alt="Logo Correo"
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-medium">genshinguidessql@gmail.com</span>
                  </p>

                  {/* Patreon */}
                  <p className="flex items-center gap-4">
                    <img
                      src="/patreon.png"
                      alt="Logo Patreon"
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-medium">Patreon/GenshinGuides</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="hidden md:flex justify-center items-center">
              <img
                src="/paimon.png"
                alt="Genshin Character"
                className="w-full max-w-lg h-auto object-contain"  // Aumenté el max-width
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="bg-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-white text-center">
          <h2 className="text-3xl font-bold mb-8">✨ Herramientas Útiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {/* Mapa Interactivo */}
            <div
              className="flex flex-col items-center text-center space-y-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={() =>
                window.open(
                  'https://act.hoyolab.com/ys/app/interactive-map/index.html?bbs_presentation_style=no_header&utm_source=tool&utm_medium=button&utm_campaign=battlechronicle&utm_id=2&lang=ja-jp#/map/2?center=1870.00,-5764.00&zoom=-3.00&shown_types=35',
                  '_blank'
                )
              }
            >
              <img
                src="/mapa.png"
                alt="Mapa Interactivo"
                className="w-20 h-20 object-cover rounded-full"
              />
              <p className="text-lg font-semibold">Mapa Interactivo</p>
            </div>
            {/* Battle Chronicle */}
            <div
              className="flex flex-col items-center text-center space-y-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={() =>
                window.open(
                  'https://act.hoyolab.com/app/community-game-records-sea/index.html',
                  '_blank'
                )
              }
            >
              <img
                src="/espadas.png"
                alt="Battle Chronicle"
                className="w-20 h-20 object-cover rounded-full"
              />
              <p className="text-lg font-semibold">Battle Chronicle</p>
            </div>

            {/* Página Oficial en Hoyolab */}
            <div
              className="flex flex-col items-center text-center space-y-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={() =>
                window.open(
                  'https://www.hoyolab.com/accountCenter/postList?id=439367660',
                  '_blank'
                )
              }
            >
              <img
                src="/Hoyo.png"
                alt="Página Oficial en Hoyolab"
                className="w-20 h-20 object-cover rounded-full"
              />
              <p className="text-lg font-semibold">Página Oficial en Hoyolab</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;