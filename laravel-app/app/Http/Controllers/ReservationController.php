<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class ReservationController extends Controller
{
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
     * @param  \App\Http\Requests\StoreReservationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
               // Check if the user is authenticated
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
          // Retrieve the authenticated host
          $user = auth()->user();

         // Validate the request data
           $request->validate([
            'property_id' => 'required',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date',
            'guests' => 'required|integer|min:1',
        ]);

        // Create the reservation
        $reservation = new Reservation();
         $reservation->property_id =$request-> property_id;
         $reservation->check_in_date =$request->check_in_date;
         $reservation->check_out_date =$request->check_out_date;
         $reservation->guests =$request->guests;
         $reservation->status =$request-> pending;
         $reservation->user_id = $user->id;

         $reservation->save();

      
        // Return the created reservation
  // Return the client secret to complete the payment on the frontend
  return response()->json([
    'message' => 'Reservation stored successfully'], 201);    
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReservationRequest  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
