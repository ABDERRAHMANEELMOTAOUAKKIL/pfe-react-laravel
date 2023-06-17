<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
   

    public function search($key)
    {
        $products = Product::where(function ($query) use ($key) {
            $query->where('name', 'like', '%' . $key . '%')
                  ->orWhere('location', 'like', '%' . $key . '%')
                  ->orWhere('description', 'like', '%' . $key . '%');
        })->get();
    
        return response()->json($products);

    }
    public function getProductDetails($id)
    {
        $property = Property::find($id);
    
        if (!$property) {
            return response()->json(['message' => 'property not found'], 404);
        }
        $property->image_url = asset('storage/'.$property->image);
        // $property->gallery = json_decode($property->gallery);
// Add the full URL to each image in the gallery
$gallery = json_decode($property->gallery);
$property->gallery = array_map(function($image) {
    return asset('storage/'.$image);
}, $gallery);

        return response()->json($property);
    }
    
    
    public function getListingByCategory($id)
    {
      
        $category = Category::where('id', $id)->first();
    
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        $properties = Property::where('category_id', $category->id)->get();
         // Append the image URL to each property object
        foreach ($properties as $property) {
            $property->image_url = asset('storage/'.$property->image);
        }

        return response()->json($properties);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products= Product::all();
        return view('Pages.Product.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories= Category::orderBy('created_at', 'desc')->get();
        return view('Pages.Product.create',compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { 
       
        $request->validate([
            'name'=>'required',
            'price'=>'required',
            'category_id'=>'required',
            'description'=>'required',
            'location'=>'required',
            'image'=>'required',
            'gallery'=>'required',
        ]);

        $product= new Product();
        $product->name=$request->name;
        $product->price=$request->price;
        $product->description=$request->description;
        $product->location=$request->location;
        $product->category_id=$request->category_id;
        $product->slug= Str::slug($request->name).time();
        $product->image=$request->file('image')->store('images/products');


        $images = [];
        foreach ($request->gallery as $key => $photo) {
            $path = $photo->store('images/products');
            array_push($images, $path);
        }
        $product->gallery = json_encode($images);
        $product->save();
        return response()->json(['message' => 'Product added successfully'], 201)
        ->redirect()->route('Product.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product, $id)
    {
        $categories= Category::all();
        $product = Product::find($id);
        return view('Pages.Product.edit',compact('product','categories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name'=>'required',
        ]);
        $product = Product::find($product);
        $product->name=$request->name;
        $product->price=$request->price;
        $product->description=$request->description;
        $product->slug=$request->slug;
        $product->category_id=$request->category_id;
        if ($request->hasFile('image')) {
            $product->image=$request->file('image')->store('backend/images/');
        }
        $product->save();
        // Flashy::message('Your product has been added succesfuly');

        return redirect()->route('Product.index');
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->delete();
            return back()->with('success', 'Category deleted successfully!');
        } else {
            return back()->with('error', 'Category not found!');
        }
    }

  
}
