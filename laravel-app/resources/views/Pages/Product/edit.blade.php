@extends('admin.dashboard.adminDash')
@section('title','Edit Listing')
@section('content')
<h3>Edit Listing</h3>
<div class="card shadow-sm mt-4">
    <div class="card-body ">
        
        <small>Would you please fill the champ with <span class="text-danger">*</span></small>

        <form action="{{ route('Product.update', $product->id ) }}" class="mt-3" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="form-group mb-3">
                <label for="name">Edit the name of the product <span class="text-danger">*</span></label>
                <input type="text" class="form-control " value="{{ old('name') ?? $product->name}}" id="name" name="name" placeholder="Entrer le nom du produit">
              
            </div>

        <div class="form-group mb-3">
                <label for="image">Edit the  Image  of the product<span class="text-danger">*</span></label>
                <input type="file" class="form-control "  value="{{ old('image') ?? $product->image}}" id="image" name="image" >
             
            </div>

            <div class="form-group mb-3">
                <label for="category_id">Edit the Product's catrgory</label>
                <select name="category_id" id="category_id" class="form-select">
                     @foreach ($categories as $category)
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                    @endforeach 
                 </select>
              
            </div>

            <div class="form-group mb-3">
                <label for="price">Edit the product's price DH</label>  
                <input type="number" class="form-control" id="price" value="{{ old('price') ?? $product->price}}"name="price" placeholder="Prix du produit" step="0.01">
               
            </div>

            <div class="form-group mb-3">
                <label for="description">Edit the product's Description</label>
                <textarea name="description" id="description" cols="30" rows="5" class="form-control"value="{{ old('description') ?? $product->description }}"></textarea>
                
            </div>  

            

            <div class="form-group">
                <button class="btn btn-primary w-100 shadow-sm">Validate </button>
            </div>
        </form>
    </div>
</div>
</div>
@endsection