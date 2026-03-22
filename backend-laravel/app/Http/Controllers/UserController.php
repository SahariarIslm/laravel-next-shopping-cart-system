<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * Sync Firebase user with database
     */
    public function syncUser(): JsonResponse
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id'     => $user->id,
                'uid'    => $user->firebase_uid,
                'name'   => $user->name,
                'email'  => $user->email,
                'avatar' => $user->avatar,
            ],
            'message' => 'User synced successfully',
        ]);
    }

    /**
     * Get current authenticated user
     */
    public function show(): JsonResponse
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id'     => $user->id,
                'uid'    => $user->firebase_uid,
                'name'   => $user->name,
                'email'  => $user->email,
                'avatar' => $user->avatar,
            ],
        ]);
    }
}
