<?php

namespace App\Http\Controllers;

use App\Models\Host;
use App\Models\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


class PropertyController extends Controller
{
    //DISPLAY THE PROPERTY LISTED ON THE HOST PROFILE
    public function getHostAccommodations($host_id)
{
    $properties = Property::where('host_id', $host_id)->get();

    return response()->json($properties);
}

    //display the host_id to the front
     public function getHostId(Request $request)
     {
    $hostName = $request->input('name');

    $host = Host::where('name', $hostName)->first();

    if (!$host) {
        return response()->json(['message' => 'Host not found'], 404);
    }

    return response()->json(['host_id' => $host->id]);
}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
          // Check if the user is authenticated
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
           // Retrieve the authenticated host
           $host = auth()->user();

           // Retrieve all properties associated with the host
           $properties = Property::where('host_id', $host->id)->get();
           foreach ($properties as $property) {
            $property->image_url = asset('storage/'.$property->image);  // Assuming 'image' is the column name for the image URL in your properties table
        }
   
           return response()->json($properties);
    }
    public function indexBackend()
    {
        $properties = Property::all();
        return view('Pages.properties.indexBackend', compact('properties'));
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
     * @param  \App\Http\Requests\²Request  $request
     * @return \Illuminate\Http\Response
     */
  
    public function store(Request $request): JsonResponse
{
     // Check if the user is authenticated
     if (!Auth::check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Get the authenticated user
    $host = Auth::user();

    // Check if the user has the necessary permissions to add a property
  

    $request->validate([
        'name' => 'required',
        'price' => 'required',
        'category_id' => 'required',
        'host_id' => 'required',
        'location' => 'required',
        'image' => 'required',
        'gallery.*' => 'required|image',
        'description' => 'required',
        'nights' => 'required|numeric', // Add a validation rule for the number of nights

    ]);

    // Create a new property
    $property= new property();
    $property->name=$request->name;
    $property->price=$request->price;
    $property->description=$request->description;
    $property->location=$request->location;
    $property->category_id=$request->category_id;
    $property->host_id=$request->host_id;
    $property->nights = $request->nights; // Store the number of nights


      // Calculate the total price based on the number of nights
      $pricePerNight = $request->price;
      $nights = $request->nights;
      $totalPrice = $pricePerNight * $nights;
      $property->price = $totalPrice;

    // Handle image upload
    $property->image=$request->file('image')->store('images/products');


    $images = [];
    foreach ($request->gallery as $key => $photo) {
        $path = $photo->store('images/products');
        array_push($images, $path);
    }
    $property->gallery = json_encode($images);
    $property->host_id = $host->id;



    // Save the property
    $property->save();

// Associate the property with the host

    // Return a JSON response
    return response()->json(['message' => 'Property stored successfully'], 201);
}

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $property = Property::find($id);
    
        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }
    
        return response()->json($property);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function edit(Property $property, $id)
    {
        $property = Property::find($id);
    
        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }
    
        return response()->json($property);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePropertyRequest  $request
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function update( $request, Property $property)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function destroy(Property $property)
    {
        //
    }
    public function updateProperty(Request $request, Property $property)
{
    // Check if the user is authenticated
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Retrieve the authenticated host
    $host = auth()->user();

    // Find the property by its ID and ensure it belongs to the authenticated host
    $property = Property::where('property_id', $property->id)->where('host_id', $host->id)->first();

    if (!$property) {
        return response()->json(['message' => 'Property not found'], 404);
    }

    // Validate the request data
     $request->validate([
        'name' => 'required',
        'description' => 'required',
        'price' => 'required|numeric',
        'location' => 'required',
        'image' => 'required',
        'gallery.*' => 'required|image',
    ]);

    // Update the property with the validated data
    $property= Property::find($property);
    $property->name=$request->name;
    $property->price=$request->price;
    $property->location=$request->location;
    $property->description=$request->description;
    $property->category_id=$request->category_id;
    $property->host_id=$request->host_id;
    $property->image=$request->file('image')->store('images/products');


    $images = [];
    foreach ($request->gallery as $key => $photo) {
        $path = $photo->store('images/products');
        array_push($images, $path);
    }
    $property->gallery = json_encode($images);
    $property->save();


    return response()->json(['message' => 'Property updated successfully']);
}

//Delete for the frontend
    public function deleteProperty($propertyId)
{
    // Check if the user is authenticated
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Retrieve the authenticated host
    $host = auth()->user();

    // Find the property by its ID and ensure it belongs to the authenticated host
    $property = Property::where('id', $propertyId)->where('host_id', $host->id)->first();

    if (!$property) {
        return response()->json(['message' => 'Property not found'], 404);
    }

    // Delete the property
    $property->delete();

    return response()->json(['message' => 'Property deleted successfully']);
}

}











  // public function store(Request $request): JsonResponse
    // {
    //     $validatedData = $request->validate([
        //         'name' => 'required',
        //         'price' => 'required|numeric',
        //         'category_id' => 'required|exists:categories,id',
        //         'host_id' => 'required|exists:hosts,id',
        //         'location' => 'required',
        //         'image' => 'required|image',
        //         'gallery.*' => 'nullable|image',
        //         'description' => 'required',
    //     ]);
    //     $host = Auth::user(); // Get the authenticated host
    
    //     // Create a new property
    //     $property = new Property();
    //     $property->name = $validatedData['name'];
    //     $property->price = $validatedData['price'];
    //     $property->category_id = $validatedData['category_id'];
    //     $property->host_id = $validatedData['host_id'];
    //     $property->slug = Str::slug($request->name) . time();
    //     $property->location = $validatedData['location'];
    
    //     // Handle image upload
    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $imageName = time() . '_' . $image->getClientOriginalName();
    //         $image->move(public_path('images'), $imageName);
    //         $property->image = $imageName;
    //     }
    
    //     // Handle gallery images upload
    //     if ($request->hasFile('gallery')) {
    //         $galleryImages = $request->file('gallery');
    //         $gallery = [];
    
    //         foreach ($galleryImages as $index => $galleryImage) {
    //             $galleryImageName = time() . '_' . $galleryImage->getClientOriginalName();
    //             $galleryImage->move(public_path('images'), $galleryImageName);
    //             $gallery[$index] = $galleryImageName;
    //         }
    
    //         $property->gallery = $gallery;
    //     }
    
    //     $property->description = $validatedData['description'];
    //     $property->host_id = $host->id;
    
    //     // Save the property
    //     $property->save();
    
    //     // Return a JSON response
    //     return response()->json(['message' => 'Property stored successfully'], 201);
    // }