// import { NextResponse, NextRequest } from 'next/server'

// import { getToken } from "next-auth/jwt"


// export { default } from "next-auth/middleware"


// // Define the middleware function
// export async function middleware(request: NextRequest) {

//     const token = await getToken({ req: request })
//     const url = request.nextUrl
//     if (token &&
//         (
//             url.pathname.startsWith("/sign-in") ||
//             url.pathname.startsWith("/sign-up") ||
//             url.pathname.startsWith("/verify") ||
//             url.pathname.startsWith("/")
//         )
//     ) {
//         return NextResponse.redirect(new URL("/dashboard", request.url))
//     }
//     if (!token && url.pathname.startsWith('/dashboard')) {
//         return NextResponse.redirect(new URL('/sign-in', request.url));
//     }

//     return NextResponse.next();

// }

// // Configure which paths middleware runs on
// export const config = {
//     matcher: [
//         '/sign-in',
//         '/sign-up',
//         '/',
//         '/dashboard/:path*',
//         '/verify/:path*'
//     ]

// }


import { NextResponse, NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl
    
    // Define public paths that should redirect to dashboard if authenticated
    const publicPaths = ['/sign-in', '/sign-up', '/verify', '/']
    
    // Check if current path is a public path (exact match for root, startsWith for others)
    const isPublicPath = publicPaths.some(path => 
        path === '/' ? url.pathname === '/' : url.pathname.startsWith(path)
    )
    
    // Redirect authenticated users away from public paths to dashboard
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // Redirect unauthenticated users from dashboard to sign-in
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
}