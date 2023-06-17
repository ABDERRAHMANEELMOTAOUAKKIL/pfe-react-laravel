<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id', 'property_id', 'check_in_date', 'check_out_date', 'guests', 'status'
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the Property model
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    // Define the relationship with the Payment model
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
