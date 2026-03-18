<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class FirebaseAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: No token provided',
            ], 401);
        }

        try {
            $auth = app('firebase.auth');
            $verifiedIdToken = $auth->verifyIdToken($token);
            $uid = $verifiedIdToken->claims()->get('sub');
            $firebaseClaims = $verifiedIdToken->claims()->all();

            $user = User::firstOrCreate(
                ['firebase_uid' => $uid],
                [
                    'name'   => $firebaseClaims['name'] ?? 'Unknown',
                    'email'  => $firebaseClaims['email'] ?? '',
                    'avatar' => $firebaseClaims['picture'] ?? null,
                ]
            );

            auth()->login($user);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: Invalid token',
            ], 401);
        }

        return $next($request);
    }
}
