import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limit configuration (disabled)
const RATE_LIMIT = {
  MAX_REQUESTS: 10,
  WINDOW_SECONDS: 10,
}

// Dummy rate limit checker (always allows)
async function checkRateLimit() {
    return {
      success: true,
      limit: RATE_LIMIT.MAX_REQUESTS,
      remaining: RATE_LIMIT.MAX_REQUESTS,
      reset: Math.floor(Date.now() / 1000) + RATE_LIMIT.WINDOW_SECONDS,
  }
}

export async function middleware(request: NextRequest) {
  // Rate limiting check only for specific paths
  const { success, limit, reset, remaining } = await checkRateLimit()
  
  // If rate limit exceeded, return 429 Too Many Requests
  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': reset.toString(),
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    })
  }

  // Get response
  const response = NextResponse.next()

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development'

  // Add security headers
  const cspHeader = isDevelopment 
    ? `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https:;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://*.stripe.com https://*.supabase.co ws://localhost:* http://localhost:*;
      frame-src 'self' https://*.stripe.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
    : `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https:;
      font-src 'self' data: https://fonts.gstatic.com;
      connect-src 'self' https://*.stripe.com https://*.supabase.co https://*.vercel.app wss://*.vercel.app;
      frame-src 'self' https://*.stripe.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()

  // Set security headers
  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  
  // Add rate limit headers only for rate-limited paths
  if (request.nextUrl.pathname.startsWith('/api/') || request.nextUrl.pathname.match(/\/(login|signup|reset-password)$/)) {
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toString())
  }

  return response
}

// Update matcher to only include paths that need security headers
export const config = {
  matcher: [
    '/api/:path*',
    '/login',
    '/signup',
    '/reset-password',
    '/dashboard/:path*'
  ]
} 