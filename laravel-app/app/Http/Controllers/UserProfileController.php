<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserProfileController extends Controller
{

    public function uploadImage(Request $request)
    {
       
    $user = $request->user();

    if ($request->hasFile('profile_image')) {
        $image = $request->file('profile_image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->storeAs('public/profile-images', $imageName);

        // Update the user's image column in the database
        $user->image = $imageName;
        $user->save();

        $imageUrl = asset('storage/profile-images/' . $imageName);

        return response()->json(['message' => 'Profile image uploaded successfully', 'imageUrl' => $imageUrl]);
    }

    return response()->json(['error' => 'No image file received'], 400);
}
}


