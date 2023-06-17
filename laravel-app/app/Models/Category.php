<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Category extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'quantity',
        'image',
    ];
    
    public function products(){
         return $this->hasMany(Product::class);
    }

    //properties frontend
    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}
