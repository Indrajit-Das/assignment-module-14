import { NextResponse } from 'next/server';
import { decodeToken } from './lib/token';


export async function middleware(req,res,next){
    if(req.nextUrl.pathname.startsWith('/dashboard')){
        try{
            // token verification
            const encodedToken = req.cookies.get('token');
            const reqHeaders = new Headers(req.headers);
            
            const token =await decodeToken(encodedToken['value']);
            // console.log(token);
            reqHeaders.set('email',token['email']);
            reqHeaders.set('name',token['name']);
            reqHeaders.set('id',token['id']);
            console.log("inside try middleware end");
            return NextResponse.next({
                request:{ headers:reqHeaders}
            });    
        }catch(error){
            return NextResponse.redirect(new URL('/login'));
        }
        
    }
    // checking if authenticated
    if(req.nextUrl.pathname.startsWith('/login'||'/register'||'/')){
       
        const encodedToken = req?.cookies?.get('token');
        if(encodedToken){
            return NextResponse.redirect(new URL('/dashboard'));
        }else{
            return NextResponse.next();
        }
    }
    
}