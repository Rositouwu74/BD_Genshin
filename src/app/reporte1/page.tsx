'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Sword, Shield, BookOpen } from 'lucide-react';

interface BuildPersonaje {
  ID_Build: number;
  Nombre_Personaje: string;
  Set_Artefactos: string;
  Flor_Stat_Principal: string;
  Flor_Stats_Secundarios: string;
  Pluma_Stat_Principal: string;
  Pluma_Stats_Secundarios: string;
  Reloj_Stat_Principal: string;
  Reloj_Stats_Secundarios: string;
  Caliz_Stat_Principal: string;
  Caliz_Stats_Secundarios: string;
  Corona_Stat_Principal: string;
  Corona_Stats_Secundarios: string;
  Arma_Recomendada: string;
  Talentos: string;
  Descripcion: string;
}

const Reporte1Page = () => {
  const [buildPersonaje, setBuildPersonaje] = useState<BuildPersonaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBuildPersonaje();
  }, []);

  const fetchBuildPersonaje = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/build_personaje');
      if (!response.ok) throw new Error('Error al cargar los detalles de Build Personaje');
      const data = await response.json();
      setBuildPersonaje(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los datos. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLastBuild = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar la última build?');
    if (!confirmDelete) return;
    try {
      const response = await fetch('http://localhost:3000/builds/delete-last', {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar la última build');
      alert('Última build eliminada correctamente.');
      fetchBuildPersonaje();
    } catch (err) {
      console.error('Error al eliminar la última build:', err);
      alert('Hubo un error al eliminar la última build.');
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
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
            Reporte 1 - Build detallada de personajes 
          </h1>
          <button
            onClick={handleDeleteLastBuild}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 shadow-lg"
          >
            <Trash2 size={18} />
            <span>Eliminar Última Build</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {buildPersonaje.map((build) => (
            <div 
              key={build.ID_Build}
              className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {build.Nombre_Personaje}
                  </h2>
                  <p className="text-sm text-gray-400">Build #{build.ID_Build}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Columna izquierda */}
                <div className="space-y-6">
                  {/* Arma y Talentos */}
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <Sword size={18} />
                        <h3 className="font-medium">Arma Recomendada</h3>
                      </div>
                      <p className="text-gray-300">{build.Arma_Recomendada}</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2 text-purple-400">
                        <BookOpen size={18} />
                        <h3 className="font-medium">Talentos</h3>
                      </div>
                      <p className="text-gray-300">{build.Talentos}</p>
                    </div>
                  </div>

                  {/* Set de Artefactos */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2 text-yellow-400">
                      <Shield size={18} />
                      <h3 className="font-medium">Set de Artefactos</h3>
                    </div>
                    <p className="text-gray-300">{build.Set_Artefactos}</p>
                  </div>

                  {/* Descripción */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-gray-300">Descripción</h3>
                    <p className="text-gray-400">{build.Descripcion}</p>
                  </div>
                </div>

                {/* Columna derecha - Estadísticas de Artefactos */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-4 text-gray-300">Estadísticas de Artefactos</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Flor', principal: build.Flor_Stat_Principal, secundarios: build.Flor_Stats_Secundarios },
                      { name: 'Pluma', principal: build.Pluma_Stat_Principal, secundarios: build.Pluma_Stats_Secundarios },
                      { name: 'Reloj', principal: build.Reloj_Stat_Principal, secundarios: build.Reloj_Stats_Secundarios },
                      { name: 'Cáliz', principal: build.Caliz_Stat_Principal, secundarios: build.Caliz_Stats_Secundarios },
                      { name: 'Corona', principal: build.Corona_Stat_Principal, secundarios: build.Corona_Stats_Secundarios }
                    ].map((item) => (
                      <div key={item.name} className="bg-gray-750 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-300 mb-2">{item.name}</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div>
                            <span className="text-gray-400">Principal: </span>
                            <span className="text-gray-200">{item.principal}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Secundarios: </span>
                            <span className="text-gray-200">{item.secundarios}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reporte1Page;