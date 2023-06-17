<?php

namespace App\Http\Controllers;

use App\Models\Host;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    public function index(){
        return view('admin.dashboard.adminDash');
    }
    public function usersbackend(){
        $users= User::all();
        return view('Pages.Users.usersbackend', compact('users'));
    }
    public function hostbackend()
    {
        $hosts= Host::all();
        return view('hosts.hostbackend', compact('hosts'));
    }

    // public function uploadImage(Request $request)
    // {
    //     $user = $request->user(); // Assuming you have authenticated the user
    //     $file = $request->file('profile_image');
    
    //     // Validate the uploaded file
    //     $validatedData = $request->validate([
    //         'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     ]);
    
    //     // Store the uploaded image and get the URL
    //     $path = $file->store('profile_images', 'public');
    //     $imageUrl = Storage::disk('public')->url($path);
    
    //     // Update the user's profile image URL
    //     $user->profile_image = $imageUrl;
    //     $user->save();
    
    //     return response()->json(['message' => 'Profile image uploaded successfully']);
    // }
}

