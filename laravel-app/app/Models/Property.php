<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'price',
        'category_id',
        'host_id',
        'location',
        'image',
        'gallery',
        'description',
      
    ];
    public function category(){
        return $this->belongsTo(Category::class);
    }
    
    public function host()
    {
        return $this->belongsTo(Host::class);
    }
}
