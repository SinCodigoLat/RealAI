import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren suscripción premium
const PREMIUM_ROUTES = ['/analytics', '/calendar']

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Verificar si la ruta actual es una ruta premium
  if (PREMIUM_ROUTES.includes(path)) {
    // Aquí deberías verificar si el usuario tiene una suscripción premium
    // Por ahora, simplemente redirigiremos a la página principal
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/analytics', '/calendar'],
} 