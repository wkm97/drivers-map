import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if(!process.env.ALLOWED_HOST){
        return NextResponse.next()
    }

    const referer = request.headers.get('referer')
    const host = referer ? new URL(referer).host : undefined
    if(host && process.env.ALLOWED_HOST.split(',').includes(host)){
        return NextResponse.next()
    }
    return NextResponse.json({message: "Not allowed."}, {status: 403})
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}