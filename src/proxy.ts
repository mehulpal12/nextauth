import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(path);
    const token = request.cookies.get('token')?.value || '';
    if(token && isPublicPath){
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }
     if(!token && !isPublicPath){
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
  ],
}