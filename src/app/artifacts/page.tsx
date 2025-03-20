'use client';

import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface Artifact {
  ID_Artefacto: number;
  NOMBRE: string;
  Efecto: string;
}

const ArtifactsPage = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/Artefactos');
      if (!response.ok) {
        throw new Error('Error al cargar los artefactos');
      }
      const data = await response.json();
      setArtifacts(data || []);
    } catch (err) {
      setError('Error al cargar los artefactos. Por favor, intenta de nuevo más tarde.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtifacts = artifacts.filter(artifact => 
    artifact.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artifact.Efecto.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Artefactos
            </h1>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors shadow-lg"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o efecto..."
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

        {/* Artifacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtifacts.map((artifact) => (
            <div 
              key={artifact.ID_Artefacto} 
              className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {artifact.NOMBRE}
                </h3>
                <span className="text-xs text-gray-500">#{artifact.ID_Artefacto}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {artifact.Efecto}
              </p>
            </div>
          ))}
        </div>

        {filteredArtifacts.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-gray-400">No se encontraron artefactos con los criterios de búsqueda actuales.</p>
            </div>
          </div>
        )}

        {/* Results Counter */}
        {artifacts.length > 0 && (
          <div className="mt-6 text-gray-400 text-sm bg-gray-800/50 rounded-lg border border-gray-700 px-4 py-3">
            Mostrando {filteredArtifacts.length} de {artifacts.length} artefactos
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtifactsPage;