<?php

namespace App\Http\Controllers;

use App\Models\Host;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;


class HostController extends Controller
{
   
    // public function ProductStore(Request $request)
    // {
 
    //     $validatedData= $request->validate([
    //         'name'=>'required',
    //         'price'=>'required',
    //         'category_id' => 'required|exists:categories,id',
    //         'description'=>'required',
    //         'location'=>'required',
    //         'image'=>'required',
    //         'gallery.*' => 'image',
    //     ]);
    //     $host = Auth::user(); // Get the authenticated host
        
    //     $imagePath = $request->file('image')->store('products');
    //     $galleryPaths = [];
    //     if ($request->hasFile('gallery')) {
    //         foreach ($request->file('gallery') as $galleryFile) {
    //             $galleryPaths[] = $galleryFile->store('products');
    //         }
    //     }

    //     $product = new Product();
    //     $product->name = $validatedData['name'];
    //     $product->price = $validatedData['price'];
    //     $product->description = $validatedData['description'];
    //     $product->location = $validatedData['location'];
    //     $product->category_id = $validatedData['category_id'];
    //     $product->image = $imagePath;
    //     $product->gallery = $galleryPaths;
    //     $product->save();

    //     $product->host_id = $host->id;
    //     // $product->host_name = $host->name;

    //     $product->save();
    //     return response()->json(['message' => 'Product added successfully'], 201);
     
    //  }
    //register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:hosts,email',
            'phone' => 'required|string|unique:hosts,phone',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $host = Host::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
        ]);

        $token = $host->createToken('auth_token')->plainTextToken;

        return response()->json(['host' => $host, 'token' => $token], 201);
    }

    //login
    public function login(Request $request)
    {
    
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication successful
            $user = auth()->user();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json(['token' => $token, 'user' => $user], 200);
        } else if (Auth::guard('host')->attempt($credentials)) {
            // Host authentication successful
            $host = auth()->guard('host')->user();
            $token = $host->createToken('auth_token')->plainTextToken;
            return response()->json(['token' => $token, 'host' => $host], 200);
        } else {
            // Authentication failed
            return response()->json(['message' => 'Invalid email or password.'], 401);
       
    }
    }
     
    //hostprofile
    public function hostProfile($name)
    {
        $host = Host::where('name', $name)->first();


        if (!$host) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        return response()->json($host);  
    }
    //logout
    public function logout(Request $request)
    {
        $request->host()->tokens()->delete();

        return response()->json(['message' => 'Logged out'], 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Host  $host
     * @return \Illuminate\Http\Response
     */
    public function show(Host $host)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Host  $host
     * @return \Illuminate\Http\Response
     */
    public function edit(Host $host)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @param  \App\Models\Host  $host
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Host $host)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Host  $host
     * @return \Illuminate\Http\Response
     */
    public function destroy(Host $host)
    {
        //
    }
}
