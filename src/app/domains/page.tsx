'use client';

import React, { useEffect, useState } from 'react';
import { Search, X, Filter, MapPin, Gift, Shield } from 'lucide-react';

interface Domain {
  ID_Dominio: number;
  Nombre: string;
  Recompensas: string;
  Requerimientos: string;
  Ubicacion: string;
}

interface Filters {
  ubicacion: string;
  recompensa: string;
}

const DomainsPage = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    ubicacion: '',
    recompensa: '',
  });

  const regions = ['Mondstadt', 'Liyue', 'Inazuma', 'Sumeru', 'Fontaine'];
  const rewards = ['Materiales', 'Artefactos'];

  useEffect(() => {
    fetchDomains();
  }, [filters]);

  const fetchDomains = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.ubicacion) queryParams.append('region', filters.ubicacion);
      if (filters.recompensa) queryParams.append('reward', filters.recompensa);

      const response = await fetch(`http://localhost:3000/domains?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Error al cargar los dominios');
      const data = await response.json();
      setDomains(data || []);
    } catch (err) {
      setError('Error al cargar los dominios. Por favor, intenta de nuevo más tarde.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      ubicacion: '',
      recompensa: '',
    });
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
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-white">
              Dominios
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
              >
                <Filter size={18} />
                <span className="hidden sm:inline">{showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}</span>
              </button>
              {showFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors shadow-lg"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Región</label>
                  <select
                    value={filters.ubicacion}
                    onChange={(e) => handleFilterChange('ubicacion', e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Todas las regiones</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Recompensa</label>
                  <select
                    value={filters.recompensa}
                    onChange={(e) => handleFilterChange('recompensa', e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Todas las recompensas</option>
                    {rewards.map(reward => (
                      <option key={reward} value={reward}>{reward}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {domains.map((domain) => (
            <div 
              key={domain.ID_Dominio}
              className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {domain.Nombre}
                  </h3>
                  <span className="text-sm text-gray-400">Dominio #{domain.ID_Dominio}</span>
                </div>
              </div>

              {/* Ubicación */}
              <div className="flex items-center gap-2 mb-3 text-gray-300">
                <MapPin size={18} className="text-blue-400" />
                <span>{domain.Ubicacion}</span>
              </div>

              {/* Recompensas */}
              <div className="bg-gray-800 rounded-lg p-4 mb-3">
                <div className="flex items-center gap-2 mb-2 text-green-400">
                  <Gift size={18} />
                  <h4 className="font-medium">Recompensas</h4>
                </div>
                <p className="text-gray-300 text-sm">{domain.Recompensas}</p>
              </div>

              {/* Requerimientos */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2 text-yellow-400">
                  <Shield size={18} />
                  <h4 className="font-medium">Requerimientos</h4>
                </div>
                <p className="text-gray-300 text-sm">{domain.Requerimientos || 'Ninguno'}</p>
              </div>
            </div>
          ))}
        </div>

        {domains.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-gray-400">No se encontraron dominios con los filtros seleccionados.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainsPage;