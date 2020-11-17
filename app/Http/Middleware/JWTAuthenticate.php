<?php

namespace App\Http\Middleware;

use Closure;
//use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Facades\JWTAuth as JWTAuth;


class JWTAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try{
            //check jwt httponly cookie
            JWTAuth::parseToken()->authenticate();
            
            //check csrf token
            if ($request->cookie('XSRF-TOKEN') !== $request->header('x-xsrf-token')){
                throw new \Exception();
            }
            
            return $next($request);
        }
        catch (\Exception $e){
            return response()->json(['error' => 'You are not Authorized.'], 401);
        }
    }
}
