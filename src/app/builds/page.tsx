'use client';

import React, { useEffect, useState } from 'react';
import { Sword, BookOpen, Shield } from 'lucide-react';

interface Build {
  UIDs: number;
  ID_Build: number;
  ID_Personaje: number;
  NOMBRE_PERSONAJE: string;
  Artefacto_Flor: number;
  Artefacto_Pluma: number;
  Artefacto_Reloj: number;
  Artefacto_Caliz: number;
  Artefacto_Corona: number;
  Arma_Recomendada: string;
  Talentos: string;
  Descripcion: string;
}

const BuildsPage = () => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBuilds();
  }, []);

  const fetchBuilds = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/builds');
      if (!response.ok) {
        throw new Error('Error al cargar las builds');
      }
      const data = await response.json();
      setBuilds(data || []);
    } catch (err) {
      setError('Error al cargar las builds. Por favor, intenta de nuevo más tarde.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg shadow-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-white">
          Builds de Genshin Impact
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {builds.map((build) => (
            <div 
              key={build.ID_Build}
              className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {build.NOMBRE_PERSONAJE}
                  </h3>
                  <span className="text-sm text-gray-400">Build #{build.ID_Build}</span>
                </div>
              </div>

              {/* Sección de Arma */}
              <div className="mb-4 bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2 text-blue-400">
                  <Sword size={18} />
                  <h4 className="font-medium">Arma Recomendada</h4>
                </div>
                <p className="text-gray-300">{build.Arma_Recomendada}</p>
              </div>

              {/* Sección de Talentos */}
              <div className="mb-4 bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  <BookOpen size={18} />
                  <h4 className="font-medium">Talentos</h4>
                </div>
                <p className="text-gray-300">{build.Talentos}</p>
              </div>

              {/* Sección de Artefactos */}
              <div className="mb-4 bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 text-green-400">
                  <Shield size={18} />
                  <h4 className="font-medium">Artefactos</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-750 p-2 rounded">
                    <span className="text-gray-400">Flor:</span> {build.Artefacto_Flor}
                  </div>
                  <div className="bg-gray-750 p-2 rounded">
                    <span className="text-gray-400">Pluma:</span> {build.Artefacto_Pluma}
                  </div>
                  <div className="bg-gray-750 p-2 rounded">
                    <span className="text-gray-400">Reloj:</span> {build.Artefacto_Reloj}
                  </div>
                  <div className="bg-gray-750 p-2 rounded">
                    <span className="text-gray-400">Cáliz:</span> {build.Artefacto_Caliz}
                  </div>
                  <div className="bg-gray-750 p-2 rounded col-span-2">
                    <span className="text-gray-400">Corona:</span> {build.Artefacto_Corona}
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-gray-300">Descripción</h4>
                <p className="text-gray-400 text-sm">{build.Descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        {builds.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-gray-400">No se encontraron builds.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildsPage;