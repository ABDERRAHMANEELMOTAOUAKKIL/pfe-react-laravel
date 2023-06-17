<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'reservation_id',
        'amount',
        'status',
        'card_number',
        'expiry_date',
        'cvv',
        // Additional payment fields if needed
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
