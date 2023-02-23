import { NextResponse } from "next/server";

export function middleware(request) {
    const jwt = request.cookies.get('token')
    console.log(request.nextUrl.pathname)

    if(request.nextUrl.pathname.includes('/register')){
        console.log('validating register')
        if(jwt === undefined){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else if(request.nextUrl.pathname === '/'){
        if(jwt === undefined){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    return NextResponse.next()
}