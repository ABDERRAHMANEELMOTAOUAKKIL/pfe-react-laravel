<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\Category\LodgeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HostController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//auth- user
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/{name}', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/upload-profile-image', [UserProfileController::class,'uploadImage']);
   //reservation and payment
    Route::get('/reservations', [ReservationController::class, 'store']);
    Route::post('/reservations/{reservationId}/payments', [PaymentController::class, 'store']);


    Route::get('properties/{id}', [PropertyController::class, 'show']);

    // Route::get('reservations-index', [ReservationController::class, 'index']);
    //property name on the form

 // Route::resource('reservation',ReservationController::class);

});

//auth-host
Route::post('/host-register', [HostController::class, 'register']);
Route::post('/host-login', [HostController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/host-profile/{name}', [HostController::class, 'hostProfile']);
    Route::post('/logout', [HostController::class, 'logout']);
    //HOST ADD PROPERTIES
    // Route::post('/products', [HostController::class, 'ProductStore']);
    Route::post('/properties', [PropertyController::class, 'store']);
    Route::get('/properties-index', [PropertyController::class, 'index']);
    Route::put('/properties-update/{property}', [PropertyController::class, 'updateProperty']);
    Route::delete('/properties-delete', [PropertyController::class, 'deleteProperty']);


});


//AdminDash
Route::get('/dashboard',[DashboardController::class,'index'])->name('admin-dash');
Route::get('/list-users-backend',[DashboardController::class,'usersbackend'])->name('users-dash');
Route::get('/list-hosts-backend',[DashboardController::class,'hostbackend'])->name('hosts-dash');

//Categorybackend
Route::resource('Lodges',LodgeController::class);
//CATEGORY FRONTENDLINK
Route::get('/category',[LodgeController::class, 'LodgeFrontend']);
Route::get('/getCategory',[LodgeController::class, 'getCategory']);
//

//Product where the accomodations listed backend
Route::resource('Product',ProductController::class);
 
//PROPERTY BACKEND LIST

Route::get('/indexBackend',[PropertyController::class, 'indexBackend'])->name('properties-host');


//Product Frontendlinks
Route::get('/categories/{id}/products', [ProductController::class, 'getListingByCategory']);
Route::get('/lodge/{id}', [ProductController::class, 'getProductDetails']);
//search product
Route::get('/search/{key}', [ProductController::class, 'search']);
//reservation user
Route::post('/reservations', [ReservationController::class, 'store'])->middleware('auth');

//cart

Route::post('/cart', [CartItemController::class, 'index']);
Route::post('/cart/store', [CartItemController::class, 'store']);
Route::post('/cart/update', [CartItemController::class, 'update']);
Route::post('/cart/destroy', [CartItemController::class, 'destroy']);

















// Route::get('/property', [PropertyController::class, 'index']);

    //display the host_id to the front
// Route::get('/getHostId', [PropertyController::class, 'getHostId']);

    //DISPLAY THE PROPERTY LISTED ON THE HOST PROFILE
// Route::get('/host-accommodations/{hostId}', [PropertyController::class, 'getHostAccommodations']);