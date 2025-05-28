<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
        public function index()
    {
        $user = User::paginate(200);
        return response()->json($user);
    }


    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        return User::create($request->only([
        'name',
        'email',
        'password',
        ]));
    }

    public function update(Request $request, User $user)
{
    $user->update($request->only([
       'name',
        'email',
        'password',
    ]));

    return $user;
}

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
}
