<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Models\Product;
use GuzzleHttp\Psr7\Request;

class CartItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cartItems = CartItem::with('product')->get();

        return response()->json($cartItems);
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
     * @param  \App\Http\Requests\StoreCartItemRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $productId = $request->input('product_id');
     

        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Check if the product already exists in the cart
        $existingCartItem = CartItem::where('product_id', $productId)->first();

        if ($existingCartItem) {
            // Update the quantity of the existing cart item
            $existingCartItem->save();
        } else {
            // Create a new cart item
            $cartItem = new CartItem();
            $cartItem->product_id = $productId;
            $cartItem->save();
        }

        return response()->json(['message' => 'Product added to cart'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CartItem  $cartItem
     * @return \Illuminate\Http\Response
     */
    public function show(CartItem $cartItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CartItem  $cartItem
     * @return \Illuminate\Http\Response
     */
    public function edit(CartItem $cartItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCartItemRequest  $request
     * @param  \App\Models\CartItem  $cartItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
        ]);

        $cartItemId = $request->input('cart_item_id');

        $cartItem = CartItem::find($cartItemId);

        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cartItem->save();

        return response()->json(['message' => 'Cart item updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CartItem  $cartItem
     * @return \Illuminate\Http\Response
     */
    public function destroy($id )
    {
    //       $request->validate([
    //         'cart_item_id' => 'required|exists:cart_items,id',
    //     ]);

    //     $cartItemId = $request->input('cart_item_id');

    //     $cartItem = CartItem::find($cartItemId);

    //     if (!$cartItem) {
    //         return response()->json(['message' => 'Cart item not found'], 404);
    //     }

    //     $cartItem->delete();

    //     return response()->json(['message' => 'Cart item removed'], 200);
    // }
    $cartItem = cartItem::find($id);
    if ($cartItem) {
        $cartItem->decartItemlete();
        return back()->with('success', 'cartItem deleted successfully!');
    } else {
        return back()->with('error', 'cartItem not found!');
    }
}
}
