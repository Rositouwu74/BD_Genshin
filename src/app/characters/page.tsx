'use client';

import React, { useEffect, useState } from 'react';
import { Filter, Search, X } from 'lucide-react';

interface Character {
  ID_Personaje: number;
  NOMBRE: string;
  Elemento: string;
  Rareza: string;
  Arma: string;
  Rol: string;
}

interface Filters {
  elemento: string;
  arma: string;
  rareza: string;
  rol: string;
}

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    elemento: '',
    arma: '',
    rareza: '',
    rol: '',
  });

  const elementos = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
  const armas = ['Espada', 'Mandoble', 'Lanza', 'Arco', 'Catalizador'];
  const rarezas = ['4 estrellas', '5 estrellas'];
  const roles = ['DPS', 'SubDPS', 'Support', 'Healer'];

  useEffect(() => {
    fetchCharacters();
  }, [filters]);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.rareza) queryParams.append('rareza', filters.rareza);
      if (filters.arma) queryParams.append('arma', filters.arma);
      if (filters.elemento) queryParams.append('elemento', filters.elemento);
      if (filters.rol) queryParams.append('rol', filters.rol);

      const response = await fetch(`http://localhost:3000/?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Error al cargar los personajes');
      const data = await response.json();
      setCharacters(data || []);
    } catch (err) {
      setError('Error al cargar los personajes. Por favor, intenta de nuevo más tarde.');
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
      elemento: '',
      arma: '',
      rareza: '',
      rol: '',
    });
    setSearchTerm('');
  };

  const filteredCharacters = characters.filter(char => {
    const matchesSearch = char.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters =
      (!filters.elemento || char.Elemento === filters.elemento) &&
      (!filters.arma || char.Arma === filters.arma) &&
      (!filters.rareza || char.Rareza === filters.rareza) &&
      (!filters.rol || char.Rol === filters.rol);

    return matchesSearch && matchesFilters;
  });

  const getElementColor = (elemento: string) => {
    const colors: { [key: string]: string } = {
      Pyro: 'bg-red-500',
      Hydro: 'bg-blue-500',
      Anemo: 'bg-teal-500',
      Electro: 'bg-purple-500',
      Dendro: 'bg-green-500',
      Cryo: 'bg-cyan-400',
      Geo: 'bg-yellow-600'
    };
    return colors[elemento] || 'bg-gray-500';
  };

  const getRarityColor = (rareza: string) => {
    return rareza === '5 estrellas' ? 'text-yellow-400' : 'text-purple-400';
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
        {/* Header Section */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-white">
              Personajes
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
              >
                <Filter size={18} />
                <span className="hidden sm:inline">{showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}</span>
              </button>
              {(showFilters || searchTerm || Object.values(filters).some(f => f !== '')) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors shadow-lg"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar personaje..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Rareza</label>
                <select
                  value={filters.rareza}
                  onChange={(e) => handleFilterChange('rareza', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Todas las rarezas</option>
                  {rarezas.map(rareza => (
                    <option key={rareza} value={rareza}>{rareza}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Arma</label>
                <select
                  value={filters.arma}
                  onChange={(e) => handleFilterChange('arma', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Todas las armas</option>
                  {armas.map(arma => (
                    <option key={arma} value={arma}>{arma}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Elemento</label>
                <select
                  value={filters.elemento}
                  onChange={(e) => handleFilterChange('elemento', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Todos los elementos</option>
                  {elementos.map(elemento => (
                    <option key={elemento} value={elemento}>{elemento}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Rol</label>
                <select
                  value={filters.rol}
                  onChange={(e) => handleFilterChange('rol', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Todos los roles</option>
                  {roles.map(rol => (
                    <option key={rol} value={rol}>{rol}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <div 
              key={character.ID_Personaje} 
              className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {character.NOMBRE}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getElementColor(character.Elemento)}`}>
                      {character.Elemento}
                    </span>
                    <span className={`text-sm ${getRarityColor(character.Rareza)}`}>
                      {character.Rareza}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">#{character.ID_Personaje}</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Arma</span>
                  <span className="text-gray-200">{character.Arma}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rol</span>
                  <span className="text-gray-200">{character.Rol}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-gray-400">No se encontraron personajes con los criterios de búsqueda actuales.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharactersPage;