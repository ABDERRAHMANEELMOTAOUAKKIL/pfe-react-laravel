<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Host;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class LodgeController extends Controller
{
    public function storeImg(Request $request)
{
    $category = new Category();
    $category->name = $request->name;
    
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $path = Storage::putFile('categories', $image);
        $category->image = $path;
    }
    
    $category->save();
    
    return redirect()->route('categories.index');
}
//display listing by category
public function getCategory()
{
    // Retrieve the category from your Laravel backend
    $category = Category::find(1); // Replace with your own logic to fetch the category
    
    // Prepare the image URL
    $imageUrl = asset('storage/' . $category->image);
    
    // Return the category data along with the image URL
    return response()->json([
        'category' => $category,
        'imageUrl' => $imageUrl,
    ]);
}

//display the categorylodge on the home page
public function LodgeFrontend()

{
    $categories= Category::all();
        // Append the image URL to each category
        $categories->each(function ($category) {
            $category->image_url = asset('storage/' . $category->image);
            $category->category_name = $category->name;

        });
    
    
    return response()->json($categories);

 
}

    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories= Category::all();
        return view('Pages.Lodge.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories= Category::all();
        return view('Pages.Lodge.create',compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3',
            'image' => 'required',
           ]);
        $category = new Category;

        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->quantity = $request->quantity;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = Storage::putFile('categories', $image);
            $category->image = $path;
        }
        $category->save();
        return redirect()->route('Lodges.index');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $Category
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $Category
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::find(decrypt($id));
        return view('Pages.Lodge.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $Category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|min:3',
            'image' => 'required',

        ]);

        $category = Category::findOrFail($id);
        $category->name = $request->input('name');
        $category->quantity = $request->quantity;
        
        if ($request->hasFile('image')) {
            // delete old image if exists
            if (Storage::exists($category->image)) {
                Storage::delete($category->image);
            }
            
            // store new image
            $image = $request->file('image');
            $path = Storage::putFile('categories', $image);
            $category->image = $path;
        }
        
        $category->save();
        
        return redirect()->route('Lodges.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\cr  $cr
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
