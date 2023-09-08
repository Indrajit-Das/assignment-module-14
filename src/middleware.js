import { NextResponse } from 'next/server';
import { decodeToken } from './lib/token';


export async function middleware(req,res,next){
    if(req.nextUrl.pathname.startsWith('/dashboard')){
        console.log("inside");
        try{
            // token verification
            // const reqHeaders = new Headers(req.headers);
            // const encodedToken = reqHeaders.get('token');
            // const token =await decodeToken(encodedToken);
            console.log("inside try middleware");
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
            return NextResponse.redirect(new URL('/login',req.url))
        }
        
    }
    
}