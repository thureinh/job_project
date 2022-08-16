<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    /**
     * @return \App\Http\Resources\User\UserResource|\Illuminate\Http\JsonResponse
     */
    public function login(Request $request): UserResource|JsonResponse
    {
        Log::info(json_encode($request->input('username')));
        if (
            Auth::attempt([
                'name' => $request->input('username'),
                'password' => $request->input('password'),
            ])
        ) {
            $request->session()->regenerate();
            return new UserResource(Auth::user());
        }
        return new JsonResponse(['message' => 'Login Failed'], 401);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['message' => 'You have logged out']);
    }

    public function me(): UserResource
    {
        return new UserResource(Auth::user());
    }
}
