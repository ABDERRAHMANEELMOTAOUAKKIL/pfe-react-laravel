<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use Illuminate\Http\Request;
use Stripe\Charge;
use Stripe\Exception\ApiErrorException;


class PaymentController extends Controller
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
     * @param  \App\Http\Requests\StorePaymentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $reservationId)
    {
        
        // Retrieve reservation details based on $reservationId

        // Validate payment details
        $request->validate([
            'card_number' => 'required',
            'expiry_date' => 'required',
            'cvv' => 'required',
        ]);

        // Process payment with Stripe
        try {
            \Stripe\Stripe::setApiKey(config('pk_test_51MEfsFCac3BtBOrXfTgy2N9Mr5pdiqAfS8M4NC4uyzxs5JTQN9OrXQ9s28uMDbB7FEfhQdfnmL4KasiQjLJJS2Mz00zxu10o8f'));

            $charge = Charge::create([
                'amount' => 1000, // Replace with the actual amount to charge
                'currency' => 'MAD', // Replace with the appropriate currency code
                'source' => $request->card_number,
                'description' => 'Payment for reservation ID: ' . $reservationId,
            ]);

            // Handle successful payment and update reservation status
            // Return success response
        } catch (ApiErrorException $e) {
            // Handle Stripe API error
            // Return error response
        }

        // Handle other errors or exceptions
        // Return error response
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePaymentRequest  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
