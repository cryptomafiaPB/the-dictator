import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { analytics } from './utils/analytics';

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api(.*)',
    '/',
    '/articles/(.*)',
    '/search(.*)',
]);

export interface PublicMetadata {
    role?: 'admin' | 'editor' | 'user';
}

export interface SessionClaims {
    publicMetadata: PublicMetadata;
}

export default clerkMiddleware(async (auth, req) => {
    const authResult = await auth();
    const sessionClaims = authResult.sessionClaims as SessionClaims | null;
    const { pathname } = req.nextUrl;

    // Analytics tracking for pageview
    if (pathname === '/') {
        try {
            await analytics.track('pageview', {
                page: '/',
                country: req.geo?.country,
            });
        } catch (err) {
            console.error('Analytics error:', err);
        }
    }

    // Handle public routes
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // Protect non-public routes
    await auth.protect();

    // Role-based access control
    if (pathname.startsWith('/admin') && sessionClaims?.publicMetadata?.role !== 'admin') {
        return Response.redirect(new URL('/', req.url));
    }

    if (pathname.startsWith('/editor') && sessionClaims?.publicMetadata?.role !== 'editor') {
        return Response.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
});

// Middleware matcher configuration
export const config = {
    matcher: [
        // Skip Next.js internals and all static files unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes and analytics tracking
        '/(api|trpc)(.*)',
        '/',
    ],
};