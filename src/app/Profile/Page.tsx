'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  email: string;
  // Agrega más campos según necesites
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');

    if (!isLoggedIn) {
      router.push('/login');
    } else if (userEmail) {
      setUser({ email: userEmail });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 shadow rounded-lg">
          {/* Encabezado del perfil */}
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-white">
              Perfil de Usuario
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-400">
              Información personal y configuración
            </p>
          </div>

          {/* Información del perfil */}
          <div className="border-t border-gray-700">
            <dl>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">
                  Correo electrónico
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              {/* Agrega más campos según necesites */}
            </dl>
          </div>

          {/* Botones de acción */}
          <div className="px-4 py-5 sm:px-6 border-t border-gray-700">
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => router.push('/profile/edit')}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm 
                         font-medium text-white bg-blue-600 hover:bg-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-blue-500 transition-colors duration-200"
              >
                Editar perfil
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm 
                         font-medium text-white bg-red-600 hover:bg-red-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-red-500 transition-colors duration-200"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}