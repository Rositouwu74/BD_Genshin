'use client';

import React, { useEffect, useState } from 'react';
import { Globe, RefreshCw, Users } from 'lucide-react';

interface Usuario {
  UIDs: number;
  NOMBRE: string;
  Correo: string;
  AR: number;
  Nivel_Mundo: number | null;
}

const Reporte2Page: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('todos');

  const fetchUsuarios = async (url: string, filter: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al cargar los usuarios');
      const data = await response.json();
      setUsuarios(data || []);
      setActiveFilter(filter);
    } catch (err) {
      console.error('Error:', err);
      setError('Hubo un error al cargar los datos. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios('http://localhost:3000/usuarios-ar-minimo', 'todos');
  }, []);

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'america': return 'from-blue-400 to-blue-600';
      case 'europa': return 'from-blue-400 to-blue-600';
      case 'asia': return 'from-blue-400 to-blue-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Header con título */}
          <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">
              Reporte 2 - Usuarios mayores a AR 25
            </h1>
            <Users size={24} className="text-blue-400" />
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => fetchUsuarios('http://localhost:3000/usuarios-ar-minimo', 'todos')}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 shadow-lg ${
                activeFilter === 'todos'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 border-2 border-gray-500'
                : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <RefreshCw size={18} />
              <span>Mostrar Todos</span>
            </button>
            
            {[
              { name: 'América', value: 'america', endpoint: 'filtrar-america' },
              { name: 'Europa', value: 'europa', endpoint: 'filtrar-europa' },
              { name: 'Asia', value: 'asia', endpoint: 'filtrar-asia' }
            ].map((region) => (
              <button
                key={region.value}
                onClick={() => fetchUsuarios(`http://localhost:3000/${region.endpoint}`, region.value)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 shadow-lg ${
                  activeFilter === region.value
                    ? `bg-gradient-to-r ${getRegionColor(region.value)} border-2 border-${region.value === 'america' ? 'blue' : region.value === 'europa' ? 'green' : 'purple'}-500`
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Globe size={18} />
                <span>{region.name}</span>
              </button>
            ))}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg shadow-lg">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}

          {/* Users Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {usuarios.map((usuario) => (
                <div
                  key={usuario.UIDs}
                  className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {usuario.NOMBRE}
                      </h3>
                      <p className="text-sm text-gray-400">UID: {usuario.UIDs}</p>
                    </div>
                    <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">
                      AR {usuario.AR}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="text-gray-400">Correo: </span>
                      <span className="text-gray-200">{usuario.Correo}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Nivel Mundo: </span>
                      <span className="text-gray-200">{usuario.Nivel_Mundo ?? 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && usuarios.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-400">No se encontraron usuarios para los filtros seleccionados.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reporte2Page;