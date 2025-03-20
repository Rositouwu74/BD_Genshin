import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar si el usuario está autenticado desde localStorage
  const isAuthenticated = request.cookies.get('isLoggedIn');
  
  // Lista de rutas protegidas que requieren autenticación
  const protectedRoutes = ['/profile'];
  
  // Verificar si la ruta actual está protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // Si es una ruta protegida y el usuario no está autenticado
  if (isProtectedRoute && !isAuthenticated) {
    // Redirigir al login
    const redirectUrl = new URL('/login', request.url);
    // Guardar la URL original para redirigir después del login
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Si el usuario está autenticado y trata de acceder a login/register
  if (isAuthenticated && 
    (request.nextUrl.pathname.startsWith('/login') || 
     request.nextUrl.pathname.startsWith('/register'))
  ) {
    // Redirigir al perfil
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    '/profile/:path*',
    '/login',
    '/register'
  ]
};