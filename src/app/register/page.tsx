'use client';

import React, { useState } from 'react';
import { UserPlus, Mail, Hash, Star, Globe } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    UID: '',
    NOMBRE: '',
    Correo: '',
    AR: '',
    Nivel_Mundo: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage('Usuario registrado exitosamente.');
        setFormData({
          UID: '',
          NOMBRE: '',
          Correo: '',
          AR: '',
          Nivel_Mundo: '',
        });
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || 'Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setErrorMessage('Hubo un error al procesar el registro.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
            ¡Únete a la Aventura!
          </h1>
          <p className="mt-2 text-gray-400">Registra tu cuenta de Genshin Impact</p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-6 py-4 rounded-lg flex items-center justify-between">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg flex items-center justify-between">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Hash size={16} />
                UID
              </label>
              <input
                type="number"
                name="UID"
                value={formData.UID}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <UserPlus size={16} />
                Nombre
              </label>
              <input
                type="text"
                name="NOMBRE"
                value={formData.NOMBRE}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Mail size={16} />
                Correo
              </label>
              <input
                type="email"
                name="Correo"
                value={formData.Correo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Star size={16} />
                AR (opcional)
              </label>
              <input
                type="number"
                name="AR"
                value={formData.AR}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Globe size={16} />
                Nivel del Mundo (opcional)
              </label>
              <input
                type="number"
                name="Nivel_Mundo"
                value={formData.Nivel_Mundo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 font-medium"
              >
                Registrar cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;